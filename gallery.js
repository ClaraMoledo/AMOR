const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll("figure");
const finalMessage = document.getElementById("finalMessage");
const qrCode = document.getElementById("qrCode");

let index = 0;
let direction = 1;

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");


/* 🔗 LINK FIXO DO GITHUB PAGES */
const SITE_URL = "https://claramoledo.github.io/Feliz-Natal/";

/* 💕 CORES DOS CORAÇÕES */
const heartColors = ["❤️", "💖", "💜", "💙", "💚", "🧡"];

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  spawnHearts();

  /* Vibração suave no celular */
  if (navigator.vibrate) navigator.vibrate(40);

  /* 💌 Mensagem final + QR Code */
  if (index === slides.length - 1) {
    finalMessage.classList.add("show");

    // GERA QR CODE CORRETO
    qrCode.src =
      "https://api.qrserver.com/v1/create-qr-code/?" +
      "size=220x220&data=" +
      encodeURIComponent(SITE_URL);
  } else {
    finalMessage.classList.remove("show");
  }
}

/* 👉 BOTÕES */
nextBtn.onclick = () => {
  index = Math.min(index + 1, slides.length - 1);
  updateCarousel();
};

prevBtn.onclick = () => {
  index = Math.max(index - 1, 0);
  updateCarousel();
};

/* 🔁 AUTO VAI E VOLTA */
setInterval(() => {
  if (index === slides.length - 1) direction = -1;
  if (index === 0) direction = 1;
  index += direction;
  updateCarousel();
}, 3500);

/* 🔍 ZOOM NAS IMAGENS */
const lightbox = document.getElementById("lightbox");
const lightImg = lightbox.querySelector("img");

document.querySelectorAll("figure img").forEach(img => {
  img.addEventListener("click", () => {
    lightImg.src = img.src;
    lightbox.classList.add("show");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

/* 💕 CORAÇÕES COLORIDOS */
function spawnHearts() {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent =
      heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2200);
  }
}

/* Neve */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const flakes = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  s: Math.random() * 0.5 + 0.3
}));

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,.6)";

  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    f.y += f.s;
    if (f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(snow);
}
snow();
