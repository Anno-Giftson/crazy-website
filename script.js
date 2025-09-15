// Elements
const spinBtn = document.getElementById('spin-button');
const runawayBtn = document.getElementById('runaway-button');
const cloneBtn = document.getElementById('clone-button');
const clearClonesBtn = document.getElementById('clear-clones-button');
const invertBtn = document.getElementById('invert-button');
const glitchBtn = document.getElementById('glitch-button');
const confettiStormBtn = document.getElementById('confetti-storm-button');
const confettiContainer = document.getElementById('confetti-container');

// Sounds
const popSound = document.getElementById('pop-sound');
const danceSound = document.getElementById('dance-sound');
const prankSound = document.getElementById('prank-sound');
const runawaySound = document.getElementById('runaway-sound');

// Variables
let cloneCount = 0;
let confettiStormInterval = null;
let clones = [];
let touchBlocked = false;

// Prevent touch devices and show overlay blocker
function blockTouchScreen() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    if (!touchBlocked) {
      touchBlocked = true;
      const blocker = document.createElement('div');
      blocker.id = 'blocker';
      blocker.innerHTML = `🚫<br>Sorry, touch screen devices are not allowed.<br>Please use a mouse or trackpad.`;
      document.body.appendChild(blocker);
      // Prevent scrolling and interaction
      document.body.style.overflow = 'hidden';
    }
  }
}

// Run at start
blockTouchScreen();

// Background color changing every 1 second
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

// Confetti on mouse move
document.addEventListener('mousemove', (e) => {
  if (touchBlocked) return; // no confetti on touch devices

  spawnConfetti(e.clientX, e.clientY, 1);
});

// Spawn confetti helper
function spawnConfetti(x, y, count = 5) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Random size 7-15px
    const size = Math.floor(Math.random() * 8) + 7;
    confetti.style.setProperty('--size', `${size}px`);

    // Random shape
    const shapes = ['circle', 'square', 'rounded'];
    confetti.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);

    // Random color
    confetti.style.setProperty('--color', getRandomColor());

    // Start X position relative to x with some randomness
    confetti.style.setProperty('--start-x', `${x + (Math.random() * 30 - 15)}px`);

    // X drift for falling (sideways float)
    confetti.style.setProperty('--x-drift', `${Math.random() * 50 - 25}px`);

    // Random animation duration between 3 and 6 seconds
    confetti.style.setProperty('--duration', `${3 + Math.random() * 3}s`);

    // Random border radius for shapes
    confetti.style.setProperty('--shape-radius', confetti.classList.contains('circle') ? '50%' : confetti.classList.contains('square') ? '0' : '20%');

    // Starting position absolute
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;

    confettiContainer.appendChild(confetti);

    // Remove confetti after animation ends
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}

// Random color helper
function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 65%)`;
}

// Spin button prank
spinBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.5;
  prankSound.play();

  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
  showDanceEmoji();
});

function showDanceEmoji() {
  const danceEmoji = document.createElement('div');
  danceEmoji.id = 'dance-emoji';
  danceEmoji.textContent = '💃🕺';
  document.body.appendChild(danceEmoji);

  danceSound.currentTime = 0;
  danceSound.volume = 0.7;
  danceSound.play();

  setTimeout(() => danceEmoji.remove(), 5000);
}

// Runaway button logic
runawayBtn.addEventListener('mouseenter', () => {
  if (touchBlocked) return;

  runawaySound.currentTime = 0;
  runawaySound.volume = 0.5;
  runawaySound.play();

  moveButtonRandomly(runawayBtn);
});

runawayBtn.addEventListener('click', () => {
  if (touchBlocked) return;

  showRewardPopup("😎 You caught me! Here's your reward: 🎉 You're officially CrazyTown's champion! 🎉");
});

function moveButtonRandomly(button) {
  const margin = 20;
  const maxX = window.innerWidth - button.offsetWidth - margin;
  const maxY = window.innerHeight - button.offsetHeight - margin;
  const newX = Math.floor(Math.random() * maxX) + margin;
  const newY = Math.floor(Math.random() * maxY) + margin;

  button.style.position = 'fixed';
  button.style.left = `${newX}px`;
  button.style.top = `${newY}px`;
  button.style.transition = 'left 0.3s ease, top 0.3s ease';
}

// Show reward popup
function showRewardPopup(message) {
  const popup = document.createElement('div');
  popup.id = 'reward-popup';
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => popup.remove(), 500);
  }, 5000);
}

// Clone button clones itself multiple times randomly
cloneBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.4;
  prankSound.play();

  for (let i = 0; i < 7; i++) {
    const clone = cloneBtn.cloneNode(true);
    clone.textContent = 'Clone me!';
    clone.style.position = 'fixed';
    clone.style.left = `${randomRange(0, window.innerWidth - cloneBtn.offsetWidth)}px`;
    clone.style.top = `${randomRange(0, window.innerHeight - cloneBtn.offsetHeight)}px`;
    clone.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.7 + Math.random() * 0.6})`;
    clone.style.zIndex = 10000;
    clone.style.pointerEvents = 'auto';

    clone.addEventListener('click', () => cloneBtn.click());

    document.body.appendChild(clone);
    clones.push(clone);
    cloneCount++;
  }
});

// Clear clones button - removes all clones and resets position/style of cloneBtn
clearClonesBtn.addEventListener('click', () => {
  clones.forEach(c => c.remove());
  clones = [];
  cloneCount = 0;

  cloneBtn.style.position = '';
  cloneBtn.style.left = '';
  cloneBtn.style.top = '';
  cloneBtn.style.transform = '';
});

// Invert button flips and inverts colors for 3 seconds
invertBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.4;
  prankSound.play();

  document.body.classList.add('inverted-upside-down');
  alert("Whoa! The world flipped upside down and got inverted! Try not to get dizzy.");

  setTimeout(() => {
    document.body.classList.remove('inverted-upside-down');
  }, 3000);
});

// Glitch button triggers glitch animation on body for 2.5 seconds
glitchBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.5;
  prankSound.play();

  document.body.id = 'glitch-effect';

  setTimeout(() => {
    document.body.id = '';
  }, 2500);
});

// Confetti Storm button - spawns tons of confetti raining all over for 10 seconds
confettiStormBtn.addEventListener('click', () => {
  alert("Confetti storm unleashed! Brace yourself!");

  confettiStormInterval = setInterval(() => {
    // Spawn ~20 confetti at random X at top of viewport
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * window.innerWidth;
      spawnConfetti(x, -20, 1);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(confettiStormInterval);
    alert("Confetti storm is over! Hope you had fun!");
  }, 10000);
});

// Utility: random number in range
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




