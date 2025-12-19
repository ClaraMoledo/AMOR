const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll("figure");
const finalMessage = document.getElementById("finalMessage");
const qrCode = document.getElementById("qrCode");

let index = 0;
let direction = 1;

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

/* 🔗 LINK DO SITE */
const SITE_URL = window.location.origin + window.location.pathname;

/* 💕 CORES DOS CORAÇÕES */
const heartColors = ["❤️", "💖", "💜", "💙", "💚", "🧡"];

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  spawnHearts();

  /* Vibração suave */
  if (navigator.vibrate) navigator.vibrate(40);

  /* Mensagem final + QR */
  if (index === slides.length - 1) {
    finalMessage.classList.add("show");

    qrCode.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(SITE_URL);
  } else {
    finalMessage.classList.remove("show");
  }
}

nextBtn.onclick = () => {
  index = (index + 1) % slides.length;
  updateCarousel();
};

prevBtn.onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
};

/* 🔁 AUTO VAI E VOLTA */
setInterval(() => {
  if (index === slides.length - 1) direction = -1;
  if (index === 0) direction = 1;
  index += direction;
  updateCarousel();
}, 3500);

/* 🔍 ZOOM */
const lightbox = document.getElementById("lightbox");
const lightImg = lightbox.querySelector("img");

document.querySelectorAll("figure img").forEach(img => {
  img.onclick = () => {
    lightImg.src = img.src;
    lightbox.classList.add("show");
  };
});

lightbox.onclick = () => lightbox.classList.remove("show");

/* 💕 CORAÇÕES COLORIDOS */
function spawnHearts() {
  for (let i = 0; i < 7; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent =
      heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2200);
  }
}
