export const getContrast = (color: string) => {
  // If a leading # is provided, remove it
  if (color.slice(0, 1) === "#") {
    color = color.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (color.length === 3) {
    color = color
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "gray.600" : "gray.100";
};
