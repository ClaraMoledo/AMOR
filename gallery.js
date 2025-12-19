const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll("figure");
const finalMessage = document.getElementById("finalMessage");
const qrCode = document.getElementById("qrCode");

let index = 0;
let direction = 1;

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

/* 🔗 LINK FIXO DO GITHUB PAGES */
const SITE_URL = "https://claramoledo.github.io/AMOR/";

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
