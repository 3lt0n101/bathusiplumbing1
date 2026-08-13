/* ============================================================================
   BATHUSI PLUMBING - VANILLA JS ENHANCEMENTS
   WHY: No dependencies, maximum performance, full control, client-side only
   =========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* WHY: Wait for DOM to ensure all elements are available */
  
  /* ========== INITIALIZATION ========== */
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const backToTop = document.querySelector(".back-to-top");
  const revealItems = document.querySelectorAll(".reveal");
  const yearSpans = document.querySelectorAll(".year");
  const hoverImages = document.querySelectorAll(".hero-image img, .about-image img, .project-card img");

  /* ========== CURRENT YEAR IN FOOTER ========== */
  /* WHY: Dynamic year shows site is maintained and helps with SEO credibility */
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = currentYear;
  });

  /* ========== NAVIGATION STATE TRACKING ========== */
  const setActiveLink = (id) => {
    /* WHY: Highlight nav link matching current section for UX clarity */
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
    });
  };

  /* ========== REVEAL ANIMATIONS ========== */
  /* WHY: Intersection Observer for efficient scroll-triggered animations (no scroll listener) */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); /* WHY: Stop observing once visible to save memory */
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  /* ========== SECTION INTERSECTION FOR ACTIVE NAV ========== */
  /* WHY: Update nav highlight as user scrolls past sections */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll("main section[id], footer[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  /* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
  /* WHY: Better UX than instant jumps; prevents closing mobile nav issues */
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      /* WHY: Close mobile menu after navigation for better UX */
      if (window.innerWidth <= 760) {
        nav.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ========== MOBILE MENU TOGGLE ========== */
  /* WHY: Hamburger menu for mobile, handled with accessibility attributes */
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* ========== SCROLL EFFECTS ========== */
  /* WHY: Show "back to top" and header shadow on scroll for usability */
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    backToTop.classList.toggle("visible", window.scrollY > 600);
  });

  /* ========== BACK TO TOP BUTTON ========== */
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ========== IMAGE HOVER EFFECTS ========== */
  /* WHY: Scale images on hover for interactive feedback */
  hoverImages.forEach((image) => {
    image.addEventListener("mouseenter", () => image.classList.add("hovered"));
    image.addEventListener("mouseleave", () => image.classList.remove("hovered"));
  });

  /* ========== RESPONSIVE MENU RESET ========== */
  /* WHY: Close mobile menu when window resizes to desktop width */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      nav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});
