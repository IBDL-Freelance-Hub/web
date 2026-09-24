import React, { useRef } from "react";
import Image from "next/image";
import { Camera, Trash2, Loader2 } from "lucide-react";

export interface ProfileAvatarProps {
  photoSrc: string | null;
  isImageFailed: boolean;
  initials: string;
  fullName: string;
  isUploadingPhoto: boolean;
  isDeletingPhoto: boolean;
  hasPhoto: boolean;
  onPhotoSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenDeleteModal: () => void;
  onImageError: () => void;
  isAr: boolean;
}

export function ProfileAvatar({
  photoSrc,
  isImageFailed,
  initials,
  fullName,
  isUploadingPhoto,
  isDeletingPhoto,
  hasPhoto,
  onPhotoSelect,
  onOpenDeleteModal,
  onImageError,
  isAr,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative h-20 w-20 shrink-0">
      <div
        className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#141428] text-xl font-bold text-white shadow-md ring-4 ring-slate-100"
        aria-label={fullName || "User avatar"}
      >
        {photoSrc && !isImageFailed ? (
          <Image
            src={photoSrc}
            alt={fullName || "Profile photo"}
            width={80}
            height={80}
            unoptimized
            onError={onImageError}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
        {isUploadingPhoto && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
            <Loader2 className="h-6 w-6 animate-spin text-white motion-reduce:animate-none" />
          </div>
        )}
      </div>

      {/* Hidden photo file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={onPhotoSelect}
      />

      {/* Photo change indicator & trigger button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploadingPhoto || isDeletingPhoto}
        className="absolute -end-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-slate-800 text-white shadow-xs transition hover:bg-slate-700 focus:ring-2 focus:ring-slate-900 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        title={isAr ? "تغيير الصورة الشخصية" : "Change photo"}
        aria-label={
          isAr ? "تحميل صورة شخصية جديدة" : "Upload new profile photo"
        }
      >
        {isUploadingPhoto ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
        ) : (
          <Camera className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Photo remove / delete trigger button */}
      {hasPhoto && (
        <button
          type="button"
          onClick={onOpenDeleteModal}
          disabled={isUploadingPhoto || isDeletingPhoto}
          className="absolute -start-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-xs transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
          title={isAr ? "حذف الصورة الشخصية" : "Delete photo"}
          aria-label={isAr ? "حذف الصورة الشخصية" : "Delete profile photo"}
        >
          {isDeletingPhoto ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
