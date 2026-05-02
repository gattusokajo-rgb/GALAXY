const starsContainer = document.querySelector('.stars');

for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.classList.add('dot');

  // random posisi
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";

  // beberapa jadi merah
  if (Math.random() < 0.05) {
    star.classList.add('red');
  }

  starsContainer.appendChild(star);
}