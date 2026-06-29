document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // SAFE ELEMENT GETTER
  // ==============================
  const safeGet = (selector) => document.querySelector(selector);

  // ==============================
  // Divine Loader Animation
  // ==============================
  window.addEventListener("load", () => {
    if (typeof gsap === "undefined") return;

    const omPath = safeGet(".loader-om-svg path");
    const circle = safeGet(".ganesh-circle circle");
    const ganesh = safeGet(".loader-ganesh");
    const splash = safeGet(".loader-splash");
    const text = safeGet(".loader-text");
    const loader = document.getElementById("weddingLoader");

    if (!omPath || !circle || !loader) return;

    const tl = gsap.timeline();

    tl.to(omPath, { strokeDashoffset: 0, duration: 2, ease: "power2.out" })
      .to(
        circle,
        { strokeDashoffset: 0, duration: 2, ease: "power2.out" },
        "-=1"
      )
      .to(splash, { opacity: 1, scale: 1.2, duration: 1.2 }, "-=1")
      .to(
        ganesh,
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      )
      .to(text, { opacity: 1, y: -10, duration: 1.2 })
      .to(loader, {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        onComplete: () => loader.classList.add("hide"),
      });
  });

  // ==============================
  // GLOBAL FUNCTIONS (IMPORTANT)
  // ==============================
  window.toggleMenu = function () {
    const menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  window.playBell = function () {
    const bell = document.getElementById("templeBell");
    if (bell) bell.play().catch(() => {});
  };

  // ==============================
  // Resize Fix
  // ==============================
  window.addEventListener("resize", () => {
    const menu = document.getElementById("mobileMenu");
    if (menu && window.innerWidth >= 768) {
      menu.classList.add("hidden");
    }
  });

  // ==============================
  // Language Toggle
  // const toggleBtn = document.getElementById("langToggle");
  // let isEnglish = true;

  // if (toggleBtn) {
  //   toggleBtn.addEventListener("click", () => {
  //     document
  //       .querySelectorAll(".en")
  //       .forEach((el) => el.classList.toggle("hidden"));
  //     document
  //       .querySelectorAll(".te")
  //       .forEach((el) => el.classList.toggle("hidden"));
  //     toggleBtn.textContent = isEnglish ? "English" : "తెలుగు";
  //     isEnglish = !isEnglish;
  //   });
  // }
  // ==============================
  const toggleBtn = document.getElementById("langToggle");
  let isEnglish = false; // Telugu is default

  // Hide English on load
  document.querySelectorAll(".en").forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(".te")
    .forEach((el) => el.classList.remove("hidden"));

  if (window.redrawScratchCard) window.redrawScratchCard();

  if (toggleBtn) {
    toggleBtn.textContent = "English";

    toggleBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".en")
        .forEach((el) => el.classList.toggle("hidden"));

      document
        .querySelectorAll(".te")
        .forEach((el) => el.classList.toggle("hidden"));

      toggleBtn.textContent = isEnglish ? "English" : "తెలుగు";
      isEnglish = !isEnglish;
      if (window.redrawScratchCard) window.redrawScratchCard();
    });
  }

  // ==============================
  // Countdown
  // ==============================
const weddingDate = new Date("August 26, 2026 09:25:00").getTime();

setInterval(() => {

    const diff = weddingDate - Date.now();

    if(diff <= 0){

        document.getElementById("days").textContent="00";
        document.getElementById("hours").textContent="00";
        document.getElementById("minutes").textContent="00";
        document.getElementById("seconds").textContent="00";

        return;
    }

    const days=Math.floor(diff/(1000*60*60*24));

    const hours=Math.floor((diff/(1000*60*60))%24);

    const minutes=Math.floor((diff/(1000*60))%60);

    const seconds=Math.floor((diff/1000)%60);

    document.getElementById("days").textContent=String(days).padStart(2,"0");

    document.getElementById("hours").textContent=String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");

},1000);

  // ==============================
  // Petal Generator 🌺
  // ==============================
  const petalContainer = document.getElementById("petalContainer");

  function createPetal() {
    if (!petalContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = "🌺";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 4 + Math.random() * 4 + "s";

    petalContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
  }

  if (petalContainer) {
    setInterval(createPetal, 300);
  }

  // ==============================
  // GSAP Scroll Animations
  // ==============================
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".fade-in", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.3,
    });

    document.querySelectorAll(".photo-card").forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => card.classList.add("visible"),
      });
    });
  }

  // ==============================
  // Smooth Scroll
  // ==============================
  document.querySelectorAll("a.nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ==============================
  // Lucide Icons
  // ==============================
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ==============================
  // QR Code
  // ==============================
  if (typeof QRCode !== "undefined") {
    new QRCode(document.getElementById("qrcode"), {
      text: "https://maps.google.com/?q=SVG+Kalyanamandapam",
      width: 200,
      height: 200,
      colorDark: "#800000",
      colorLight: "#fff8e7",
    });
  }

  // ==============================
  // Flower Burst 🌸
  // ==============================
  function createFlowerBurst(x, y) {
    const petalsCount = 20;

    for (let i = 0; i < petalsCount; i++) {
      const flower = document.createElement("div");
      flower.classList.add("flower");
      document.body.appendChild(flower);

      flower.style.left = x + "px";
      flower.style.top = y + "px";

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 200 + 50;

      flower.style.setProperty("--x", Math.cos(angle) * distance + "px");
      flower.style.setProperty("--y", Math.sin(angle) * distance + 200 + "px");

      flower.style.animation = "flowerFall 1.8s ease-out forwards";

      setTimeout(() => flower.remove(), 1800);
    }
  }

  document.addEventListener("click", (e) => {
    createFlowerBurst(e.clientX, e.clientY);
  });

  document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    createFlowerBurst(touch.clientX, touch.clientY);
  });

  // ==============================
  // Mobile VH Fix
  // ==============================
  function setVH() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }

  window.addEventListener("resize", setVH);
  window.addEventListener("orientationchange", setVH);
  setVH();
});

const canvas = document.getElementById("scratchCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  function drawScratchCard() {
    // Clear previous drawing
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Golden cover
    ctx.fillStyle = "#dbb024";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    const isTelugu = !document.querySelector(".te").classList.contains("hidden");

    if (isTelugu) {
      ctx.font = "bold 22px PottiSriramulu Sans Telugu";

      ctx.fillText(
        "ఇక్కడ స్క్రాచ్ చేయండి",
        canvas.width / 2,
        canvas.height / 2 - 10
      );

      ctx.font = "18px PottiSriramulu Sans Telugu";

      ctx.fillText(
        "🎉 మా వివాహ తేదీని చూడండి 🎉",
        canvas.width / 2,
        canvas.height / 2 + 30
      );

    } else {

      ctx.font = "bold 26px Poppins";

      ctx.fillText(
        "Scratch Here",
        canvas.width / 2,
        canvas.height / 2 - 10
      );

      ctx.font = "18px Poppins";

      ctx.fillText(
        "🎉 Reveal Wedding Date 🎉",
        canvas.width / 2,
        canvas.height / 2 + 30
      );
    }
  }

  drawScratchCard();

  let scratching = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  canvas.addEventListener("mousedown", () => scratching = true);
  canvas.addEventListener("mouseup", () => scratching = false);
  canvas.addEventListener("mouseleave", () => scratching = false);

  canvas.addEventListener("mousemove", (e) => {
    if (!scratching) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  canvas.addEventListener("touchstart", () => scratching = true);
  canvas.addEventListener("touchend", () => scratching = false);

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  // Make it accessible globally
  window.redrawScratchCard = drawScratchCard;
}
