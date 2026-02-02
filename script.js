const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const card = document.getElementById("card");
const result = document.getElementById("result");

const canvas = document.getElementById("celebration");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Move NO forever
function moveNoButton() {
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// Confetti particles
let particles = [];

function createConfetti() {
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.7) * 10,
      size: Math.random() * 6 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      life: 100
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; // gravity
    p.life--;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);

    if (p.life <= 0) particles.splice(index, 1);
  });

  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}

// YES click = fireworks party
yesBtn.addEventListener("click", () => {
  card.style.display = "none";
  result.style.display = "block";

  // Multiple bursts like party poppers
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createConfetti();
      animateConfetti();
    }, i * 400);
  }
});
