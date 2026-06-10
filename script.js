const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

class Spider {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.px = this.x;
    this.py = this.y;
  }

  follow(mx, my) {
    this.px = this.x;
    this.py = this.y;

    this.x += (mx - this.x) * 0.05;
    this.y += (my - this.y) * 0.05;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

const spiders = Array.from({ length: 40 }, () => new Spider());

let mouse = { x: w / 2, y: h / 2 };

window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#00f0ff";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#00f0ff";

  spiders.forEach(spider => {
    spider.follow(mouse.x, mouse.y);
    spider.draw();
  });

  ctx.shadowBlur = 0;

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});
