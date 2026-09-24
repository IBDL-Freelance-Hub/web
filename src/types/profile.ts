import type { ActionResponse, MemberDto, MembershipDto } from "@/types/api";
import type {
  MemberProfileData,
  MemberProfileFileDto,
  UpdateProfilePayload,
} from "@/types/member";

export type ProfileMode = "view" | "edit";

export interface ProfileFormData {
  fullNameEn: string;
  fullNameAr: string;
  phone: string;
  country: string;
  city: string;
  yearsOfExperience: string;
  areasOfExpertise: string[];
  industriesServed: string[];
  languages: string[];
  bioEn: string;
  bioAr: string;
  linkedinUrl: string;
  directoryOptIn: boolean;
}

export interface ProfileContextValue {
  mode: ProfileMode;
  formData: ProfileFormData;
  dirtyFields: Set<keyof ProfileFormData>;
  isDirty: boolean;
  isPending: boolean;
  fieldErrors: Record<string, string[]>;
  serverError: string | null;
  member: MemberDto;
  user: {
    id?: string;
    email: string;
    status?: string;
  };
  membership: MembershipDto | null;
  completionRate: number;
  cvFile: MemberProfileFileDto | null;
  setCvFile: (file: MemberProfileFileDto | null) => void;
  updatePhotoFileId: (id: string | null) => void;
  setMode: (mode: ProfileMode) => void;
  updateField: <K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K]
  ) => void;
  addTag: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    tag: string
  ) => void;
  removeTag: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    tag: string
  ) => void;
  cancelEdit: () => void;
  saveChanges: () => Promise<boolean>;
  toggleDirectoryOptIn: () => Promise<boolean>;
}

export interface ProfileProviderProps {
  user: {
    id?: string;
    email: string;
    status?: string;
  };
  member: MemberDto;
  membership?: MembershipDto | null;
  completionRate?: number;
  initialCvFile?: MemberProfileFileDto | null;
  initialMode?: ProfileMode;
  onSave?: (
    payload: UpdateProfilePayload
  ) => Promise<ActionResponse<MemberProfileData>>;
  children: React.ReactNode;
}
