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

  // BGM auto-play on first user interaction
  let bgmStarted = false;
  const bgm = document.getElementById("bgm");

  function startBGM() {
    if (bgmStarted || !bgm) return;
    bgm.volume = 0.9;
    bgm.play().then(() => {
      bgmStarted = true;
      document.removeEventListener("click", startBGM);
      document.removeEventListener("touchstart", startBGM);
    }).catch(() => {});
  }
  document.addEventListener("click", startBGM);
  document.addEventListener("touchstart", startBGM);

  window.toggleBGM = function () {
    if (!bgm) return;
    const iconOn  = document.getElementById("iconSpeakerOn");
    const iconOff = document.getElementById("iconSpeakerOff");
    if (bgm.paused) {
      bgm.play().catch(() => {});
      iconOn.classList.remove("hidden");
      iconOff.classList.add("hidden");
    } else {
      bgm.pause();
      iconOn.classList.add("hidden");
      iconOff.classList.remove("hidden");
    }
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

  let celebrationTriggered = false;
  let lastCheckTime = 0;

  function drawScratchCard() {
    // Clear previous drawing
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset celebration so it works fresh after a language switch
    celebrationTriggered = false;

    // Golden cover
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(1, "hsl(40, 65%, 55%)");
    gradient.addColorStop(0, "hsl(39, 68%, 68%)");
    gradient.addColorStop(1, "hsl(40, 72%, 46%)");
    ctx.fillStyle = gradient;
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
    throttledCheck();
  });

  canvas.addEventListener("touchstart", () => scratching = true);
  canvas.addEventListener("touchend", () => scratching = false);

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
    throttledCheck();
  });

  // ==============================
  // Scratch Progress & Celebration
  // ==============================

  function getScratchedPercent() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    return (transparent / (pixels.length / 4)) * 100;
  }

  function launchConfetti() {
    const colors = ["#FFD700","#FF6B6B","#4CAF50","#9C27B0","#FF9800","#00BCD4","#E91E63","#ffffff"];
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      const size = 6 + Math.random() * 8;
      p.style.cssText = `
        position:fixed;
        width:${size}px;height:${size}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
        left:${cx}px;top:${cy}px;
        pointer-events:none;z-index:9999;
        transform:rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const speed = 150 + Math.random() * 250;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 220;
      const duration = 1200 + Math.random() * 800;
      const start = performance.now();

      (function animate(now) {
        const t = (now - start) / duration;
        if (t >= 1) { p.remove(); return; }
        p.style.left = (cx + vx * t) + "px";
        p.style.top  = (cy + vy * t + 450 * t * t) + "px";
        p.style.opacity = 1 - t;
        requestAnimationFrame(animate);
      })(performance.now());
    }
  }

  function triggerCelebration() {
    if (celebrationTriggered) return;
    celebrationTriggered = true;

    // Clear the full gold cover
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zoom in/out pulse on the scratch content
    const content = document.querySelector(".scratch-content");
    if (content && typeof gsap !== "undefined") {
      gsap.fromTo(
        content,
        { scale: 1 },
        { scale: 1.18, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 5 }
      );
    }

    // Three waves of confetti
    launchConfetti();
    setTimeout(launchConfetti, 350);
    setTimeout(launchConfetti, 700);
  }

  function throttledCheck() {
    const now = Date.now();
    if (now - lastCheckTime < 120) return;
    lastCheckTime = now;
    if (getScratchedPercent() >= 20) triggerCelebration();
  }

  // Make it accessible globally
  window.redrawScratchCard = drawScratchCard;
}
const inviteTextEn =
`With the divine blessings of the Almighty and the affectionate blessings of our elders,
we cordially invite you and your beloved family to grace the auspicious wedding ceremony
of Priya & Nikilesh.

Your gracious presence and heartfelt blessings will make our celebration truly memorable.`;

const inviteTextTe =
`భగవంతుని దివ్య అనుగ్రహం, పెద్దల ఆశీస్సులతో,

మా ప్రియమైన ప్రియా – నిఖిలేష్‌ల పవిత్ర వివాహ మహోత్సవానికి
తమ కుటుంబ సమేతంగా విచ్చేసి,
నూతన వధూవరులను ఆశీర్వదించి,
ఈ శుభవేళను చిరస్మరణీయంగా చేయవలసిందిగా
సాదరంగా ఆహ్వానిస్తున్నాము.`;

function typeWriter(element, text, speed = 25) {

    element.innerHTML = "";

    let i = 0;

    function type(){

        if(i >= text.length) return;

        const char = text.charAt(i);

        if(char === "\n"){
            element.innerHTML += "<br>";
        }
        else{
            element.innerHTML += char;
        }

        i++;

        setTimeout(type, speed);

    }

    type();

}
const invitationBox = document.querySelector(".invitation-box");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        if(document.body.classList.contains("te")){

            typeWriter(
                document.getElementById("invite-te"),
                inviteTextTe,
                40
            );

        }else{

            typeWriter(
                document.getElementById("invite-en"),
                inviteTextEn,
                22
            );

        }

        observer.disconnect();

    });

},{
    threshold:.5
});

observer.observe(invitationBox);
