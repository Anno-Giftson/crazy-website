// Change background every second
setInterval(() => {
  document.body.style.backgroundColor = getRandomColor();
}, 1000);

// Confetti on mouse move
document.addEventListener('mousemove', (e) => {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = e.pageX + 'px';
  confetti.style.top = e.pageY + 'px';
  confetti.style.backgroundColor = getRandomColor();
  confetti.style.width = confetti.style.height = Math.random() * 10 + 'px';

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 3000);
});

// Random color generator
function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// Button madness
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});
