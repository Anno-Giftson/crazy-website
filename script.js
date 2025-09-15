let usedTouch = false;
let touchBlocked = false;
let clones = [];

// Touch detection
window.addEventListener('touchstart', () => {
  if (!touchBlocked) {
    usedTouch = true;
    blockTouchScreen();
  }
}, { once: true });

function blockTouchScreen() {
  touchBlocked = true;
  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.textContent = "🚫 Touchscreen use is not allowed. Use a mouse or trackpad.";
  document.body.appendChild(blocker);
}

// Background color change every second
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// Confetti on mouse move
document.addEventListener('mousemove', (e) => {
  if (usedTouch) return;
  spawnConfetti(e.pageX, e.pageY, 3);
});

function spawnConfetti(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;

    document.getElementById('confetti-container').appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Spin button
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

// Runaway button
const runawayBtn = document.getElementById("runaway-button");
runawayBtn.addEventListener("mouseenter", () => {
  if (usedTouch) return;
  moveRandom(runawayBtn);
});

runawayBtn.addEventListener("click", () => {
  if (usedTouch) return;
  showReward("🎉 You caught the button! You win! 🎉");
  spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
});

function moveRandom(el) {
  el.style.position = "fixed";
  el.style.left = Math.random() * (window.innerWidth - 150) + "px";
  el.style.top = Math.random() * (window.innerHeight - 100) + "px";
}

// Clone button
document.getElementById("clone-button").addEventListener("click", () => {
  const clone = document.getElementById("clone-button").cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = "fixed";
  clone.style.left = Math.random() * (window.innerWidth - 150) + "px";
  clone.style.top = Math.random() * (window.innerHeight - 100) + "px";
  clone.addEventListener("click", () => alert("Cloned button clicked!"));
  document.body.appendChild(clone);
  clones.push(clone);
});

// Clear clones
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert button
document.getElementById("invert-button").addEventListener("click", () => {
  document.body.classList.add('inverted-upside-down');
  setTimeout(() => {
    document.body.classList.remove('inverted-upside-down');
  }, 3000);
});

// Glitch button
document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.style.animation = 'none';
  document.body.offsetHeight; // force reflow
  document.body.style.animation = 'glitch 0.5s steps(2, end) 3';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 1500);
});

// Confetti storm
document.getElementById("confetti-storm-button").addEventListener("click", () => {
  const interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 5);
  }, 100);
  setTimeout(() => clearInterval(interval), 7000);
});

// Reward popup
function showReward(text) {
  const popup = document.getElementById('reward-popup');
  popup.textContent = text;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 5000);
}





