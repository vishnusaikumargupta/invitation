document.addEventListener("DOMContentLoaded", function () {
  // ===== Divine Loader Animation (Temple Cinematic) =====
  window.addEventListener("load", () => {
    const omPath = document.querySelector(".loader-om-svg path");
    const circle = document.querySelector(".ganesh-circle circle");
    const ganesh = document.querySelector(".loader-ganesh");
    const splash = document.querySelector(".loader-splash");
    const text = document.querySelector(".loader-text");
    const loader = document.getElementById("weddingLoader");

    const tl = gsap.timeline();

    // OM stroke draw
    tl.to(omPath, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
    })

      // Circle hand draw
      .to(
        circle,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
        },
        "-=1"
      )

      // Splash appear
      .to(
        splash,
        {
          opacity: 1,
          scale: 1.2,
          duration: 1.2,
        },
        "-=1"
      )

      // Ganesh reveal
      .to(
        ganesh,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      )

      // Text reveal
      .to(text, {
        opacity: 1,
        y: -10,
        duration: 1.2,
      })

      // Fade loader
      .to(loader, {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        onComplete: () => loader.classList.add("hide"),
      });
  });
  // Mobile Menu Toggle
  function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
  }

  // Close menu on window resize
  window.addEventListener("resize", () => {
    const menu = document.getElementById("mobileMenu");
    if (window.innerWidth >= 768) {
      menu.classList.add("hidden");
    }
  });

  // Play bell sound
  function playBell() {
    const bell = document.getElementById("templeBell");
    bell.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Language Toggle
  const toggleBtn = document.getElementById("langToggle");
  let isEnglish = true;

  toggleBtn.addEventListener("click", () => {
    document
      .querySelectorAll(".en")
      .forEach((el) => el.classList.toggle("hidden"));
    document
      .querySelectorAll(".te")
      .forEach((el) => el.classList.toggle("hidden"));
    toggleBtn.textContent = isEnglish ? "English" : "తెలుగు";
    isEnglish = !isEnglish;
  });

  // Countdown
  const countdownEl = document.getElementById("countdown");
  const weddingDate = new Date("March 15, 2026 00:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    countdownEl.innerHTML = `${days} Days ${hours} Hours ${mins} Minutes`;
  }, 1000);

  // Petals Generator (FIXED)
  const petalContainer = document.getElementById("petalContainer");

  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    //  ✅ Add emoji
    petal.innerHTML = "🌺";
    //         const flowers = ["🌺", "🌸", "🌼", "🌹"];
    // petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    // Random horizontal position
    petal.style.left = Math.random() * 100 + "vw";
    // Random duration
    petal.style.animationDuration = 4 + Math.random() * 4 + "s";
    petalContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
  }

  setInterval(createPetal, 300);

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".fade-in", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    stagger: 0.3,
  });

  // Scroll reveal for photos
  const photos = document.querySelectorAll(".photo-card");

  photos.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () => card.classList.add("visible"),
    });
  });

  // Smooth Scroll
  document.querySelectorAll("a.nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Activate Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Real QR Generator
  new QRCode(document.getElementById("qrcode"), {
    text: "https://maps.google.com/?q=SVG+Kalyanamandapam",
    width: 200,
    height: 200,
    colorDark: "#800000",
    colorLight: "#fff8e7",
  });

  // Temple Bell Sound (Play after first click)
  document.body.addEventListener(
    "click",
    () => {
      document.getElementById("templeBell").play();
    },
    { once: true }
  );

  // Flower Shower on Click (FIXED - WORKS EVERYWHERE)
  document.addEventListener("click", function (e) {
    createFlowerBurst(e.clientX, e.clientY);
  });

  function createFlowerBurst(x, y) {
    const petalsCount = 20;

    for (let i = 0; i < petalsCount; i++) {
      const flower = document.createElement("div");
      flower.classList.add("flower");

      document.body.appendChild(flower);

      // Position at click center
      flower.style.left = x + "px";
      flower.style.top = y + "px";

      // Random spread direction
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 200 + 50;

      const moveX = Math.cos(angle) * distance + "px";
      const moveY = Math.sin(angle) * distance + 200 + "px";

      flower.style.setProperty("--x", moveX);
      flower.style.setProperty("--y", moveY);

      flower.style.animation = "flowerFall 1.8s ease-out forwards";

      setTimeout(() => {
        flower.remove();
      }, 1800);
    }
  }

  // Touch support for mobile
  document.addEventListener(
    "touchstart",
    function (e) {
      e.preventDefault();
      const touch = e.touches[0];
      createFlowerBurst(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  // Fix for viewport height on mobile
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", setVH);
  window.addEventListener("orientationchange", setVH);
  setVH();
});
