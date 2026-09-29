export const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "bmp",
  "ico",
  "tiff",
  "avif",
];

export const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB client bound
export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];
export const ALLOWED_CV_EXTENSIONS = ["pdf", "doc", "docx"];

export const ACCEPT_CV_STRING =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

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
  errorAr?: string;
} {
  if (!file || typeof file === "string" || file.size === 0) {
    return {
      valid: false,
      error: "Please select a CV document to upload.",
      errorAr: "يرجى اختيار ملف السيرة الذاتية للرفع.",
    };
  }

  if (file.size > MAX_CV_SIZE) {
    return {
      valid: false,
      error: "CV document size exceeds the maximum limit of 10MB.",
      errorAr: "حجم السيرة الذاتية يتجاوز الحد الأقصى 10 ميجابايت.",
    };
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
  const isDocExtension = ALLOWED_CV_EXTENSIONS.includes(fileExt);
  const isDocMime = !file.type || ALLOWED_CV_TYPES.includes(file.type);
  const prohibitedExts = [
    "exe",
    "txt",
    "bat",
    "cmd",
    "sh",
    "com",
    "msi",
    "vbs",
    "ps1",
    ...IMAGE_EXTENSIONS,
  ];

  if (prohibitedExts.includes(fileExt) || !isDocExtension || !isDocMime) {
    return {
      valid: false,
      error:
        "Invalid document format. Only PDF and DOCX files are supported (DOC also accepted).",
      errorAr:
        "صيغة السيرة الذاتية غير صالحة. نقبل فقط ملفات PDF و DOC و DOCX المؤكدة بالتوقيع الرقمي.",
    };
  }

  return { valid: true };
}
