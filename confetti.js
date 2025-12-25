const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const colors = ["#ff9eb5", "#f7b6c8", "#ffc0cb", "#ffb6c1"];
const heartCount = 80;
const hearts = [];

function createHeart() {
  return {
    x: Math.random() * w,
    y: Math.random() * -h,
    size: Math.random() * 8 + 10,
    speed: Math.random() * 1.5 + 1,
    sway: Math.random() * 2 - 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2
  };
}

for (let i = 0; i < heartCount; i++) {
  hearts.push(createHeart());
}

function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-10, -6, -20, 6, 0, 20);
  ctx.bezierCurveTo(20, 6, 10, -6, 0, 6);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  hearts.forEach((hObj, i) => {
    drawHeart(hObj.x, hObj.y, hObj.size, hObj.color);

    hObj.y += hObj.speed;
    hObj.x += Math.sin(hObj.angle) * hObj.sway;
    hObj.angle += 0.02;

    if (hObj.y > h + 20) {
      hearts[i] = createHeart();
    }
  });

  requestAnimationFrame(animate);
}

animate();
