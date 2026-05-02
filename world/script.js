// ===== CURSOR =====
const cursor = document.querySelector(".cursor");

let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  cursor.style.left = mouse.x + "px";
  cursor.style.top = mouse.y + "px";
});

// ===== GALAXY =====
const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 1000; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6,
    speed: Math.random() * 0.3 + 0.1,
    color: Math.random() > 0.5 ? "#ff7ad9" : "#ffffff"
  });
}

function galaxy() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();

    s.y += s.speed;

    let dx = mouse.x - s.x;
    let dy = mouse.y - s.y;
    s.x += dx * 0.0002;
    s.y += dy * 0.0002;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(galaxy);
}

galaxy();

// ===== WORLD =====
const intro = document.getElementById("intro");
const world = document.getElementById("world");

const images = [
  "assets/photo1.jpg",
  "assets/photo2.jpg",
  "assets/photo3.jpg"
];

let photos = [];

// ===== PHOTO CLASS (LOVE HEART PHYSICS) =====
class Photo {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;

    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;

    this.el = document.createElement("div");
    this.el.classList.add("photo");

    const im = document.createElement("img");
    im.src = img;

    this.el.appendChild(im);
    world.appendChild(this.el);

    this.baseScale = 1;
  }

  heart(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return { x, y };
  }

  update(i, time) {

    let beat = 1 + Math.sin(time * 0.002) * 0.08;

    let t = i * 0.25;

    let target = this.heart(t);

    target.x = target.x * 18 * beat + window.innerWidth / 2;
    target.y = -target.y * 18 * beat + window.innerHeight / 2;

    let dx = target.x - this.x;
    let dy = target.y - this.y;

    this.vx += dx * 0.002;
    this.vy += dy * 0.002;

    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;

    let scale = this.baseScale + Math.sin(time * 0.003 + i) * 0.05;

    this.el.style.transform =
      `translate(${this.x}px, ${this.y}px) scale(${scale})`;
  }
}

// ===== SPAWN UNIVERSE =====
function spawnUniverse() {
  for (let i = 0; i < 70; i++) {
    let img = images[Math.floor(Math.random() * images.length)];

    photos.push(
      new Photo(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        img
      )
    );
  }
}

// ===== LOOP =====
function animate(time) {
  photos.forEach((p, i) => {
    p.update(i, time);
  });

  requestAnimationFrame(animate);
}

animate();

// ===== CLICK TO START =====
intro.addEventListener("click", () => {
  intro.style.display = "none";
  spawnUniverse();
});

// resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});