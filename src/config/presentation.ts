export type PresentationMode = "A" | "B";

export const PRESENTATION_MODE: PresentationMode = "B";

export function getCategoryHref(
  category: "games" | "assess" | "accred"
): string {
  if (PRESENTATION_MODE === "A") {
    switch (category) {
      case "games":
        return "#games";
      case "assess":
        return "#assess";
      case "accred":
        return "#accred";
    }
  }

  // Mode B: Standalone catalog pages
  switch (category) {
    case "games":
      return "/games";
    case "assess":
      return "/assessments";
    case "accred":
      return "/accreditation";
  }
}
