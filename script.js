// Smooth background color change every 2s
setInterval(() => {
  document.body.style.backgroundColor = getRandomColor();
}, 2000);

// Play sound helpers
const popSound = document.getElementById('pop-sound');
const danceSound = document.getElementById('dance-sound');
const prankSound = document.getElementById('prank-sound');
const runawaySound = document.getElementById('runaway-sound');

// Confetti container
const confettiContainer = document.getElementById('confetti-container');

// Confetti shapes options
const shapes = ['circle', 'square', 'rounded'];

// On mouse move - spawn multiple confetti bursts with random sizes, colors, shapes, and drift
document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    spawnConfetti(e.pageX + randomRange(-10, 10), e.pageY + randomRange(-10, 10));
  }
});

function spawnConfetti(x, y) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');

  // Random shape
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  confetti.classList.add(shape);

  // Random size between 6 and 15 px
  const size = randomRange(6, 15);
  confetti.style.setProperty('--size', `${size}px`);

  // Random start X offset for animation (to sway side to side)
  const startX = randomRange(-20, 20);
  confetti.style.setProperty('--start-x', `${startX}px`);

  // Random horizontal drift during fall (sideways movement)
  const xDrift = randomRange(-50, 50);
  confetti.style.setProperty('--x-drift', `${xDrift}px`);

  // Random fall duration between 2.5 and 4 seconds
  const duration = randomRange(2500, 4000);
  confetti.style.setProperty('--duration', `${duration}ms`);

  // Random color using HSL
  const color = getRandomColor();
  confetti.style.setProperty('--color', color);
  confetti.style.backgroundColor = color;

  // Random shape radius for border-radius CSS variable (overridden by classes)
  confetti.style.setProperty('--shape-radius', '50%');

  // Position at mouse location, adjusted for confetti size
  confetti.style.left = `${x - size / 2}px`;
  confetti.style.top = `${y - size / 2}px`;

  confettiContainer.appendChild(confetti);

  // Play pop sound for fun (small chance each confetti)
  if (Math.random() < 0.3) {
    popSound.currentTime = 0;
    popSound.volume = 0.2 + Math.random() * 0.3;
    popSound.play();
  }

  // Remove confetti after animation completes
  setTimeout(() => {
    confetti.remove();
  }, duration);
}

// Random color generator using HSL for nice bright colors
function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 65%)`;
}

// Random number helper in range [min, max]
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Button madness - main spin button
const spinBtn = document.getElementById('spin-button');
spinBtn.addEventListener('click', () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
  danceSound.currentTime = 0;
  danceSound.volume = 0.5;
  danceSound.play();

  // Add a dancing emoji overlay for 5 seconds
  showDancingEmoji();
});

// Show a dancing emoji in center of screen temporarily
function showDancingEmoji() {
  const emoji = document.createElement('div');
  emoji.id = 'dance-emoji';
  emoji.textContent = '💃🕺';
  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 5000);
}

// Runaway button - moves away when hovered
const runawayBtn = document.getElementById('runaway-button');
runawayBtn.addEventListener('mouseenter', () => {
  runawaySound.currentTime = 0;
  runawaySound.volume = 0.4;
  runawaySound.play();

  const maxX = window.innerWidth - runawayBtn.offsetWidth;
  const maxY = window.innerHeight - runawayBtn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  runawayBtn.style.position = 'fixed';
  runawayBtn.style.left = randomX + 'px';
  runawayBtn.style.top = randomY + 'px';
});

// Clone button - clones itself on click
const cloneBtn = document.getElementById('clone-button');
cloneBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.3;
  prankSound.play();

  const clone = cloneBtn.cloneNode(true);
  clone.style.position = 'fixed';

  // Random position near center-ish
  const maxX = window.innerWidth - clone.offsetWidth;
  const maxY = window.innerHeight - clone.offsetHeight;
  const randomX = Math.floor(maxX / 3 + Math.random() * maxX / 3);
  const randomY = Math.floor(maxY / 3 + Math.random() * maxY / 3);

  clone.style.left = randomX + 'px';
  clone.style.top = randomY + 'px';

  // Random rotation & scale
  clone.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.7 + Math.random() * 0.6})`;
  clone.style.zIndex = 10000;

  // Clones clone themselves too on click
  clone.addEventListener('click', () => cloneBtn.click());

  document.body.appendChild(clone);
});

// Invert button - invert colors temporarily
const invertBtn = document.getElementById('invert-button');
invertBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.4;
  prankSound.play();

  document.body.classList.add('inverted');

  alert("Whoa! The world looks upside down for a bit! (But don't worry, it's just colors inverted!)");

  setTimeout(() => {
    document.body.classList.remove('inverted');
  }, 5000);
});

// Confetti Storm button - rains tons of confetti for 10 seconds
const confettiStormBtn = document.getElementById('confetti-storm-button');
confettiStormBtn.addEventListener('click', () => {
  alert("Confetti storm unleashed! Brace yourself!");

  let stormInterval = setInterval(() => {
    // Spawn 15 confetti bursts at random positions on top edge
    for (let i = 0; i < 15; i++) {
      let x = Math.random() * window.innerWidth;
      let y = -20; // above viewport

      spawnConfetti(x, y);
    }
  }, 150);

  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(stormInterval);
    alert("Confetti storm is over! Hope you had fun!");
  }, 10000);
});


