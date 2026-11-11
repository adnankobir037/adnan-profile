export function hasContent(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasContent);
  if (typeof value === "object") {
    return Object.values(value).some(hasContent);
  }
  return true;
}

export function getAvailableSections(data) {
  const preferredOrder = [
    "hero",
    "about",
    "education",
    "skills",
    "projects",
    "experience",
    "certificates",
    "contact",
  ];
  const available = Object.keys(data || {}).filter(
    (key) => key !== "meta" && hasContent(data[key]),
  );

  return [
    ...preferredOrder.filter((key) => available.includes(key)),
    ...available.filter((key) => !preferredOrder.includes(key)),
  ];
}

export function displayLabel(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatValue(value) {
  if (value === null || value === undefined || value === "") return "";
  if (Array.isArray(value)) {
    return value.map(formatValue).filter(Boolean).join(", ");
  }
  if (typeof value === "object") return "";
  return String(value);
}
