"use client";

import React, {
  createContext,
  useContext,
  useState,
  useTransition,
  useCallback,
  useMemo,
} from "react";
import { useLocale } from "@/components/common/DirectionProvider";
import { useOptionalToast } from "@/components/ui/Toast";
import { calculateProfileCompletion } from "@/lib/profile-completion";
import type { MemberDto } from "@/types/api";
import type {
  MemberProfileFileDto,
  UpdateProfilePayload,
} from "@/types/member";

import type {
  ProfileMode,
  ProfileFormData,
  ProfileContextValue,
  ProfileProviderProps,
} from "@/types/profile";

export type {
  ProfileMode,
  ProfileFormData,
  ProfileContextValue,
  ProfileProviderProps,
};

export const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

function getInitialFormData(member: MemberDto): ProfileFormData {
  return {
    fullNameEn: member.fullNameEn || "",
    fullNameAr: member.fullNameAr || "",
    phone: member.phone || "",
    country: member.country || "",
    city: member.city || "",
    yearsOfExperience: member.yearsOfExperience || "",
    areasOfExpertise: Array.isArray(member.areasOfExpertise)
      ? [...member.areasOfExpertise]
      : [],
    industriesServed: Array.isArray(member.industriesServed)
      ? [...member.industriesServed]
      : [],
    languages: Array.isArray(member.languages) ? [...member.languages] : [],
    bioEn: member.bioEn || "",
    bioAr: member.bioAr || "",
    linkedinUrl: member.linkedinUrl || "",
    directoryOptIn: Boolean(member.directoryOptIn),
  };
}

export function ProfileProvider({
  user,
  member: initialMember,
  membership = null,
  completionRate: propCompletionRate,
  initialCvFile = null,
  initialMode = "view",
  onSave,
  children,
}: ProfileProviderProps) {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const toast = useOptionalToast();

  const [currentMember, setCurrentMember] = useState<MemberDto>(initialMember);
  const [cvFile, setCvFile] = useState<MemberProfileFileDto | null>(
    initialCvFile ?? null
  );

  const updatePhotoFileId = useCallback((id: string | null) => {
    setCurrentMember((prev) => ({
      ...prev,
      photoFileId: id,
    }));
  }, []);

  const activeCompletionRate = useMemo(() => {
    const res = calculateProfileCompletion({
      fullName: currentMember.fullNameEn || currentMember.fullNameAr,
      email: user.email,
      phone: currentMember.phone,
      country: currentMember.country,
      city: currentMember.city,
      yearsOfExperience: currentMember.yearsOfExperience,
      areasOfExpertise: currentMember.areasOfExpertise,
      industriesServed: currentMember.industriesServed,
      languages: currentMember.languages,
      bio: currentMember.bioEn || currentMember.bioAr,
      cvUrl: cvFile ? cvFile.originalName : null,
    });

    if (cvFile) {
      return res.rate;
    }
    return propCompletionRate !== undefined ? propCompletionRate : res.rate;
  }, [currentMember, user.email, cvFile, propCompletionRate]);

  const [mode, setMode] = useState<ProfileMode>(initialMode);
  const [formData, setFormData] = useState<ProfileFormData>(() =>
    getInitialFormData(initialMember)
  );
  const [dirtyFields, setDirtyFields] = useState<Set<keyof ProfileFormData>>(
    () => new Set()
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [prevMember, setPrevMember] = useState<MemberDto>(initialMember);
  if (prevMember !== initialMember) {
    setPrevMember(initialMember);
    setCurrentMember(initialMember);
    setFormData(getInitialFormData(initialMember));
    setDirtyFields(new Set());
    setFieldErrors({});
    setServerError(null);
  }

  const updateField = useCallback(
    <K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
      setDirtyFields((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      // Clear field error on change
      setFieldErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setServerError(null);
    },
    []
  );

  const addTag = useCallback(
    (
      field: "areasOfExpertise" | "industriesServed" | "languages",
      tag: string
    ) => {
      const trimmed = tag.trim();
      if (!trimmed) return;
      setFormData((prev) => {
        const currentList = prev[field] || [];
        if (currentList.includes(trimmed)) return prev;
        return {
          ...prev,
          [field]: [...currentList, trimmed],
        };
      });
      setDirtyFields((prev) => {
        const next = new Set(prev);
        next.add(field);
        return next;
      });
      setFieldErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const removeTag = useCallback(
    (
      field: "areasOfExpertise" | "industriesServed" | "languages",
      tag: string
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field] || []).filter((item) => item !== tag),
      }));
      setDirtyFields((prev) => {
        const next = new Set(prev);
        next.add(field);
        return next;
      });
    },
    []
  );

  const cancelEdit = useCallback(() => {
    setFormData(getInitialFormData(currentMember));
    setDirtyFields(new Set());
    setFieldErrors({});
    setServerError(null);
    setMode("view");
  }, [currentMember]);

  const saveChanges = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      startTransition(async () => {
        const payload: UpdateProfilePayload = {
          fullNameEn: formData.fullNameEn,
          fullNameAr: formData.fullNameAr ? formData.fullNameAr : null,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          yearsOfExperience: formData.yearsOfExperience || undefined,
          areasOfExpertise: formData.areasOfExpertise,
          industriesServed: formData.industriesServed,
          languages: formData.languages,
          bioEn: formData.bioEn ? formData.bioEn : null,
          bioAr: formData.bioAr ? formData.bioAr : null,
          linkedinUrl: formData.linkedinUrl ? formData.linkedinUrl : null,
          directoryOptIn: formData.directoryOptIn,
        };

        const res = onSave
          ? await onSave(payload)
          : await (async () => {
              const { updateMemberProfileAction } =
                await import("@/actions/memberActions");
              return updateMemberProfileAction(null, payload);
            })();

        if (res.success) {
          if (res.data) {
            setCurrentMember(res.data);
            setFormData(getInitialFormData(res.data));
          }
          setDirtyFields(new Set());
          setFieldErrors({});
          setServerError(null);
          setMode("view");
          toast?.showToast(
            "success",
            isAr ? "تم حفظ التعديلات بنجاح" : "Profile updated successfully",
            isAr
              ? "تم تحديث بيانات ملفك الشخصي في المنصة."
              : "Your profile information has been successfully updated."
          );
          resolve(true);
        } else {
          // Failure handling
          const isConflict =
            res.status === 409 || Boolean(res.fieldErrors?.phone);
          if (res.fieldErrors) {
            setFieldErrors(res.fieldErrors);
          }
          if (res.error) {
            setServerError(res.error);
          }

          toast?.showToast(
            "error",
            isConflict
              ? isAr
                ? "تعارض في رقم الهاتف"
                : "Phone Number Conflict"
              : isAr
                ? "تعذر حفظ التعديلات"
                : "Unable to save changes",
            res.error ||
              (isAr
                ? "يرجى التحقق من الحقول ومحاولة الحفظ مرة أخرى."
                : "Please review the highlighted errors and try again.")
          );

          // If conflict, retain edit mode and preserve dirty state!
          if (isConflict) {
            setMode("edit");
          }
          resolve(false);
        }
      });
    });
  }, [formData, isAr, toast, onSave]);

  const toggleDirectoryOptIn = useCallback(async (): Promise<boolean> => {
    const nextVal = !Boolean(currentMember.directoryOptIn);
    return new Promise((resolve) => {
      startTransition(async () => {
        const { toggleDirectoryPublicationAction } =
          await import("@/actions/memberActions");
        const res = await toggleDirectoryPublicationAction(nextVal);
        if (res.success && res.data) {
          setCurrentMember(res.data);
          setFormData((prev) => ({
            ...prev,
            directoryOptIn: nextVal,
          }));
          toast?.showToast(
            "success",
            isAr
              ? nextVal
                ? "تم تفعيل نشر الملف الشخصي"
                : "تم إلغاء نشر الملف الشخصي"
              : nextVal
                ? "Profile publication enabled"
                : "Profile publication disabled",
            isAr
              ? nextVal
                ? "تم حفظ رغبتك في النشر في دليل المدربين بنجاح."
                : "تم إلغاء نشر ملفك من دليل المدربين بنجاح."
              : nextVal
                ? "Your profile publication status has been enabled."
                : "Your profile is no longer published in the directory."
          );
          resolve(true);
        } else {
          const errorMessage = !res.success ? res.error : undefined;
          toast?.showToast(
            "error",
            isAr ? "تعذر تغيير حالة النشر" : "Failed to update publication",
            errorMessage ||
              (isAr
                ? "حدث خطأ أثناء تحديث حالة النشر. يرجى المحاولة مرة أخرى."
                : "An error occurred while updating publication status.")
          );
          resolve(false);
        }
      });
    });
  }, [currentMember.directoryOptIn, isAr, toast]);

  const value: ProfileContextValue = {
    mode,
    formData,
    dirtyFields,
    isDirty: dirtyFields.size > 0,
    isPending,
    fieldErrors,
    serverError,
    member: currentMember,
    user,
    membership,
    completionRate: activeCompletionRate,
    cvFile,
    setCvFile,
    updatePhotoFileId,
    setMode,
    updateField,
    addTag,
    removeTag,
    cancelEdit,
    saveChanges,
    toggleDirectoryOptIn,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfileContext(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}

export function useOptionalProfileContext(): ProfileContextValue | undefined {
  return useContext(ProfileContext);
}
