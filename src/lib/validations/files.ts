export const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB client bound
export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export function validateProfilePhotoFile(file: File | null | undefined): {
  valid: boolean;
  error?: string;
} {
  if (!file || typeof file === "string" || file.size === 0) {
    return { valid: false, error: "Please select an image file to upload." };
  }

  if (file.size > MAX_PHOTO_SIZE) {
    return {
      valid: false,
      error: "Photo size exceeds the maximum limit of 5MB.",
    };
  }

  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid image format. Supported formats: JPEG, PNG, WebP.",
    };
  }

  return { valid: true };
}

export function validateCvFile(file: File | null | undefined): {
  valid: boolean;
  error?: string;
} {
  if (!file || typeof file === "string" || file.size === 0) {
    return { valid: false, error: "Please select a CV document to upload." };
  }

  if (file.size > MAX_CV_SIZE) {
    return {
      valid: false,
      error: "CV document size exceeds the maximum limit of 10MB.",
    };
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase();
  const isDocExtension =
    fileExt === "pdf" || fileExt === "docx" || fileExt === "doc";
  const isDocMime = ALLOWED_CV_TYPES.includes(file.type);

  if (!isDocMime && !isDocExtension) {
    return {
      valid: false,
      error: "Invalid document format. Only PDF and DOCX files are supported.",
    };
  }

  return { valid: true };
}
