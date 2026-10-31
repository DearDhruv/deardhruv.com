// Accessible Mobile Menu with Keyboard & ARIA Support
const menuTrigger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".menu");
const mobileQuery = "(max-width: 684px)";
const isMobile = () => window.matchMedia(mobileQuery).matches;

const isMobileMenu = () => {
  if (menuTrigger) menuTrigger.classList.toggle("hidden", !isMobile());
  if (menu) {
    if (!isMobile()) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
      if (menuTrigger) menuTrigger.setAttribute("aria-expanded", "false");
    }
  }
};

isMobileMenu();

if (menuTrigger && menu) {
  menuTrigger.addEventListener("click", () => {
    const isHidden = menu.classList.toggle("hidden");
    menuTrigger.setAttribute("aria-expanded", String(!isHidden));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.classList.contains("hidden") && isMobile()) {
      menu.classList.add("hidden");
      menuTrigger.setAttribute("aria-expanded", "false");
      menuTrigger.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (isMobile() && !menu.classList.contains("hidden")) {
      if (!menu.contains(e.target) && !menuTrigger.contains(e.target)) {
        menu.classList.add("hidden");
        menuTrigger.setAttribute("aria-expanded", "false");
      }
    }
  });
}

window.addEventListener("resize", isMobileMenu);

const htmlEl = document.getElementsByTagName("html")[0];
const language = htmlEl ? htmlEl.lang : "en";
const logo = document.querySelector(".logo__pathname");
if (logo) {
  window.addEventListener("load", () => {
    let path = window.location.pathname.substring(1);
    path = path.replace(language + "/", "");
    const firstSlash = path.indexOf("/");
    if (firstSlash !== -1) {
      logo.textContent += path.substring(0, firstSlash);
    }
  });
}
