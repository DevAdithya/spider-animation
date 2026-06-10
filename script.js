const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

class Spider {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
  }

  follow(mx, my) {
    this.x += (mx - this.x) * 0.05;
    this.y += (my - this.y) * 0.05;
  }

  tick() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

const spiders = Array.from({ length: 20 }, () => new Spider());

let mouse = { x: w / 2, y: h / 2 };

window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function anim() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "white";

  spiders.forEach(s => {
    s.follow(mouse.x, mouse.y);
    s.tick();
  });

  requestAnimationFrame(anim);
}

anim();

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});
