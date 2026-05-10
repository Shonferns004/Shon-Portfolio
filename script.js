// === CUSTOM CURSOR ===
const cursor = document.querySelector(".cursor");
const cursorFollow = document.querySelector(".cursor-follow");
let mouseX = 0,
  mouseY = 0,
  followX = 0,
  followY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followX += (mouseX - followX) * 0.15;
  followY += (mouseY - followY) * 0.15;
  cursorFollow.style.left = followX + "px";
  cursorFollow.style.top = followY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

document
  .querySelectorAll("a, .skill-card, .project-visual, .nav-cta")
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursorFollow.classList.add("hover"),
    );
    el.addEventListener("mouseleave", () =>
      cursorFollow.classList.remove("hover"),
    );
  });

// === SPLIT WORDS for reveal-words ===
document.querySelectorAll("[data-reveal-words]").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map((w) => `<span class="word"><span>${w}</span></span>`)
    .join(" ");
});

// === HERO TITLE: wrap each line content in span for slide-up ===
document
  .querySelectorAll(".hero-title .line, .contact-title .line")
  .forEach((line) => {
    line.innerHTML = `<span>${line.innerHTML}</span>`;
  });

// === SCROLL REVEAL with IntersectionObserver ===
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children slightly based on order
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("in"), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
);

document
  .querySelectorAll(
    "[data-reveal], [data-reveal-words], .hero-title .line, .contact-title .line",
  )
  .forEach((el, i) => {
    // Stagger lines within the same parent
    if (el.classList.contains("line")) {
      el.dataset.delay = i * 90;
    }
    revealObserver.observe(el);
  });

// === PARALLAX on scroll (rAF throttled) ===
const parallaxEls = document.querySelectorAll("[data-parallax]");
let scrollY = window.scrollY;
let ticking = false;

function updateParallax() {
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax);
    const rect = el.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distance = elementCenter - viewportCenter;
    const offset = -distance * speed;
    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  },
  { passive: true },
);

updateParallax();

// === MAGNETIC HOVER on project visuals ===
document.querySelectorAll(".project-visual").forEach((visual) => {
  visual.addEventListener("mousemove", (e) => {
    const rect = visual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const img = visual.querySelector(".project-img");
    img.style.transform = `scale(1.04) translate(${x * 0.04}px, ${y * 0.04}px)`;
  });
  visual.addEventListener("mouseleave", () => {
    const img = visual.querySelector(".project-img");
    img.style.transform = "";
  });
});

// === SMOOTH NAV LINKS already via CSS scroll-behavior ===

// === Initial animate hero on load ===
window.addEventListener("load", () => {
  setTimeout(() => {
    document
      .querySelectorAll(".hero [data-reveal], .hero-title .line")
      .forEach((el, i) => {
        setTimeout(() => el.classList.add("in"), i * 100);
      });
  }, 200);
});
