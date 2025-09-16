let usedTouch = false;
let touchBlocked = false;
let clones = [];
let isFrozen = false;
let hoverTimeout = null;

// Detect mobile devices
function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

// Detect touch, but only block laptops/chromebooks
window.addEventListener('touchstart', () => {
  if (!touchBlocked && !isMobileDevice()) {
    usedTouch = true;
    blockTouchScreen();
  }
}, { once: true });

function blockTouchScreen() {
  touchBlocked = true;
  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.innerHTML = `🚫<br>Sorry, touch screen use is not allowed on this device.<br>Please use a mouse or trackpad.`;
  document.body.appendChild(blocker);
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    blocker.remove();
    document.body.style.overflow = '';
  }, 3000);
}

// Background color changer
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

// DO NOT PRESS button
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

// === Catch Me If You Can Button ===
const runawayBtn = document.getElementById("runaway-button");

// Move when hovered
runawayBtn.addEventListener("mouseenter", () => {
  if (usedTouch || isFrozen) return;
  moveRandom(runawayBtn);
});

// Freeze on hover for 2 seconds
runawayBtn.addEventListener("mouseover", () => {
  if (usedTouch || isFrozen) return;
  hoverTimeout = setTimeout(() => {
    freezeButton();
  }, 2000);
});
runawayBtn.addEventListener("mouseout", () => {
  clearTimeout(hoverTimeout);
});

// Freeze on double-click
runawayBtn.addEventListener("dblclick", () => {
  if (!usedTouch && !isFrozen) {
    freezeButton();
  }
});

// Freeze on Shift key
document.addEventListener("keydown", (e) => {
  if (e.key === "Shift" && !isFrozen && !usedTouch) {
    freezeButton();
  }
});

// Click to claim reward (if frozen)
runawayBtn.addEventListener("click", () => {
  if (usedTouch) return;
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }
});

function moveRandom(el) {
  el.style.position = "fixed";

  // Define safe areas:
  // Puzzle container approx bottom-left 320px wide and ~130px tall (including padding)
  // Main buttons at top center with height ~70px

  const padding = 10;
  const puzzleWidth = 340;  // puzzle container width + margin
  const puzzleHeight = 130;
  const mainButtonsHeight = 70;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Avoid left zone of puzzle container
  // Avoid top zone of main buttons container

  const minX = puzzleWidth + padding;
  const maxX = windowWidth - el.offsetWidth - padding;

  const minY = mainButtonsHeight + padding;
  const maxY = windowHeight - puzzleHeight - padding - el.offsetHeight;

  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;

  el.style.left = randomX + "px";
  el.style.top = randomY + "px";
}

function freezeButton() {
  isFrozen = true;
  runawayBtn.textContent = "😳 You froze me!";
  runawayBtn.style.backgroundColor = "lightblue";
  runawayBtn.style.border = "3px solid blue";
}

// === Clone Button ===
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

// Clear Clones
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert the world
document.getElementById("invert-button").addEventListener("click", () => {
  document.body.classList.add('inverted-upside-down');
  setTimeout(() => {
    document.body.classList.remove('inverted-upside-down');
  }, 3000);
});

// Glitch effect
document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 2000);
});

// Confetti Rain (formerly Confetti Storm)
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  const interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 5);
  }, 100);
  setTimeout(() => clearInterval(interval), 7000);
});

// Reward Popup
function showReward(text) {
  const popup = document.getElementById('reward-popup');
  popup.textContent = text;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 5000);
}

// Puzzle toggle button
const puzzleToggleBtn = document.getElementById('puzzle-toggle-button');
const puzzleContent = document.getElementById('puzzle-content');
puzzleToggleBtn.addEventListener('click', () => {
  if (puzzleContent.style.display === 'none') {
    puzzleContent.style.display = 'block';
  } else {
    puzzleContent.style.display = 'none';
  }
});

// Clue button toggle
document.getElementById('clue-button').addEventListener('click', () => {
  const clueText = document.getElementById('clue-text');
  if (clueText.style.display === 'none') {
    clueText.style.display = 'block';
  } else {
    clueText.style.display = 'none';
  }
});

// Prevent copy-paste in input and show alert
const freezeInput = document.getElementById('freeze-code');

freezeInput.addEventListener('paste', (e) => {
  e.preventDefault();
  alert("Copying and pasting is not allowed!");
});

freezeInput.addEventListener('copy', (e) => {
  e.preventDefault();
  alert("Copying and pasting is not allowed!");
});

freezeInput.addEventListener('cut', (e) => {
  e.preventDefault();
  alert("Copying and pasting is not allowed!");
});

// Also prevent right-click context menu on input
freezeInput.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert("Copy-paste via right-click is disabled!");
});

// Submit code button
document.getElementById('submit-code').addEventListener('click', () => {
  const code = freezeInput.value.trim();
  // The code is first 50 digits of pi INCLUDING the '3' but excluding the decimal point.
  // The correct code is:
  const correctCode = "31415926535897932384626433832795028841971693993751";

  if (code === correctCode) {
    alert("Correct! You cracked the code!");
    freezeButton();  // Freeze the runaway button as reward
  } else {
    alert("Wrong code! Try again.");
  }
});

// No Copying anywhere in the page
document.addEventListener('copy', (e) => {
  e.preventDefault();
  alert("Copying is not allowed anywhere on this page!");
});

document.addEventListener('cut', (e) => {
  e.preventDefault();
  alert("Cutting is not allowed anywhere on this page!");
});

document.addEventListener('paste', (e) => {
  e.preventDefault();
  alert("Pasting is not allowed anywhere on this page!");
});













