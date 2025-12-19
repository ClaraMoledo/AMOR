/* Entrada + texto */
window.addEventListener("load", () => {
  const card = document.querySelector(".card");
  const paragraphs = document.querySelectorAll(".text p");

  card.classList.add("show");

  paragraphs.forEach((p, i) => {
    setTimeout(() => p.classList.add("show"), 600 + i * 300);
  });
});

/* Música opcional */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn.addEventListener("click", () => {
  if (!playing) {
    music.play();
    musicBtn.textContent = "🔇 Música";
  } else {
    music.pause();
    musicBtn.textContent = "🔊 Música";
  }
  playing = !playing;
});

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
