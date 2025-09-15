// Elements
const spinBtn = document.getElementById('spin-button');
const runawayBtn = document.getElementById('runaway-button');
const cloneBtn = document.getElementById('clone-button');
const invertBtn = document.getElementById('invert-button');
const glitchBtn = document.getElementById('glitch-button');
const confettiStormBtn = document.getElementById('confetti-storm-button');
const confettiContainer = document.getElementById('confetti-container');

// Sounds
const popSound = document.getElementById('pop-sound');
const danceSound = document.getElementById('dance-sound');
const prankSound = document.getElementById('prank-sound');
const runawaySound = document.getElementById('runaway-sound');

// Check for touch screen usage
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  blockTouchScreen();
}

// Block touch screen usage with big overlay message
function blockTouchScreen() {
  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.innerHTML = `🚫 Sorry! Touch screen usage is not allowed on this crazy website! 🚫<br><br>Please use a mouse or trackpad.`;
  document.body.innerHTML = ''; // Clear page content
  document.body.appendChild(blocker);
  throw new Error('Touch screen detected - blocking interaction');
}

// Background color change every 2s
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 2000);

// Confetti on mousemove - multiple bursts
document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    spawnConfetti(e.pageX + randomRange(-10, 10), e.pageY + randomRange(-10, 10));
  }
});

function spawnConfetti(x, y) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');

  // Random shape
  const shapes = ['circle', 'square', 'rounded'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  confetti.classList.add(shape);

  const size = randomRange(6, 15);
  confetti.style.setProperty('--size', `${size}px`);

  const startX = randomRange(-20, 20);
  confetti.style.setProperty('--start-x', `${startX}px`);

  const xDrift = randomRange(-50, 50);
  confetti.style.setProperty('--x-drift', `${xDrift}px`);

  const duration = randomRange(2500, 4000);
  confetti.style.setProperty('--duration', `${duration}ms`);

  const color = getRandomColor();
  confetti.style.setProperty('--color', color);
  confetti.style.backgroundColor = color;
  confetti.style.setProperty('--shape-radius', '50%');

  confetti.style.left = `${x - size / 2}px`;
  confetti.style.top = `${y - size / 2}px`;

  confettiContainer.appendChild(confetti);

  if (Math.random() < 0.3) {
    popSound.currentTime = 0;
    popSound.volume = 0.2 + Math.random() * 0.3;
    popSound.play();
  }

  setTimeout(() => confetti.remove(), duration);
}

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 65%)`;
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Spin button madness
spinBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.5;
  prankSound.play();
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
  danceEmojiDance();
});

// Dance emoji reward
function danceEmojiDance() {
  const danceEmoji = document.createElement('div');
  danceEmoji.id = 'dance-emoji';
  danceEmoji.textContent = '💃🕺';
  document.body.appendChild(danceEmoji);

  danceSound.currentTime = 0;
  danceSound.volume = 0.7;
  danceSound.play();

  setTimeout(() => danceEmoji.remove(), 5000);
}

// Runaway button: moves randomly when hovered
runawayBtn.addEventListener('mouseenter', () => {
  runawaySound.currentTime = 0;
  runawaySound.volume = 0.5;
  runawaySound.play();

  moveButtonRandomly(runawayBtn);
});

// Reward if clicked
runawayBtn.addEventListener('click', () => {
  alert("😎 You caught me! Here’s your reward: 🎉 You’re officially crazytown’s champion! 🎉");
});

// Move button randomly inside viewport
function moveButtonRandomly(button) {
  const margin = 20; // Avoid edges
  const maxX = window.innerWidth - button.offsetWidth - margin;
  const maxY = window.innerHeight - button.offsetHeight - margin;
  const newX = Math.floor(Math.random() * maxX) + margin;
  const newY = Math.floor(Math.random() * maxY) + margin;

  button.style.position = 'fixed';
  button.style.left = `${newX}px`;
  button.style.top = `${newY}px`;
  button.style.transition = 'left 0.3s ease, top 0.3s ease';
}

// Clone button: clones itself multiple times randomly on page
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

    clone.addEventListener('click', () => cloneBtn.click());

    document.body.appendChild(clone);
  }
});

// Invert button - flips and inverts colors for 3 seconds
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

// Glitch button - triggers glitch animation on body
glitchBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.5;
  prankSound.play();

  document.body.id = 'glitch-effect';
  setTimeout(() => {
    document.body.id = '';
  }, 2500);
});

// Confetti Storm button - rains lots of confetti for 10 seconds
confettiStormBtn.addEventListener('click', () => {
  alert("Confetti storm unleashed! Brace yourself!");

  let stormInterval = setInterval(() => {
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = -20; // above viewport

      spawnConfetti(x, y);
    }
  }, 150);

  setTimeout(() => {
    clearInterval(stormInterval);
    alert("Confetti storm is over! Hope you had fun!");
  }, 10000);
});



