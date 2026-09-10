export function resolveHref(targetAnchor: string, isHome: boolean): string {
  const cleanAnchor = targetAnchor.startsWith("#")
    ? targetAnchor
    : `#${targetAnchor}`;

  if (isHome) {
    return cleanAnchor;
  }

  return `/${cleanAnchor}`;
}
