/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    // If we already set a theme (e.g. in the head script), keep it.
    if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", "light");
    }
  }
}

// Switch the theme in-place without page reload.
function switchTheme(e) {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  try {
    localStorage.setItem("theme", nextTheme);
  } catch (_) {}

  // Update all toggles on page
  document.querySelectorAll(".theme-toggle, [data-theme-toggle]").forEach(btn => {
    btn.setAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
    btn.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  });
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);

  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => e.matches && detectOSColorTheme());
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  }

  detectOSColorTheme();
} else {
  // If there's no toggle, we still want to detect the OS theme
  detectOSColorTheme();
}
