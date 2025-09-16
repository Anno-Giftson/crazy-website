let usedTouch = false;
let touchBlocked = false;
let clones = [];
let isFrozen = false;
let hoverTimeout = null;

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
  el.style.left = Math.random() * (window.innerWidth - 150) + "px";
  el.style.top = Math.random() * (window.innerHeight - 100) + "px";
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

// Confetti rain
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
});

function startConfettiRain() {
  let count = 0;
  const interval = setInterval(() => {
    spawnConfetti(Math.random() * window.innerWidth, 0, 5);
    count++;
    if (count > 50) clearInterval(interval);
  }, 200);
}

// Reward Popup
function showReward(text) {
  const popup = document.getElementById('reward-popup');
  popup.textContent = text;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 5000);
}

// === Puzzle Code ===

const puzzleToggleBtn = document.getElementById("puzzle-toggle-button");
const puzzleContent = document.getElementById("puzzle-content");
const clueButton = document.getElementById("clue-button");
const clueText = document.getElementById("clue-text");
const freezeCodeInput = document.getElementById("freeze-code");
const submitCodeBtn = document.getElementById("submit-code");

puzzleToggleBtn.addEventListener('click', () => {
  if (puzzleContent.style.display === 'block') {
    puzzleContent.style.display = 'none';
  } else {
    puzzleContent.style.display = 'block';
  }
});

clueButton.addEventListener('click', () => {
  clueText.style.display = (clueText.style.display === 'block') ? 'none' : 'block';
});

submitCodeBtn.addEventListener('click', () => {
  // The first 50 digits of pi INCLUDING the leading 3 and decimal point.
  // The decimal point counts as a digit here, so total length 50 digits including "3."
  const piCode = "3.14159265358979323846264338327950288419716939937510";
  const entered = freezeCodeInput.value.trim();

  if (entered === piCode) {
    freezeButton();
    alert("Correct code! Button is frozen now.");
  } else {
    alert("Wrong code. Try again!");
  }
});

// Prevent copy-pasting in the code input
freezeCodeInput.addEventListener('paste', e => {
  e.preventDefault();
  alert("No copying and pasting allowed!");
});

freezeCodeInput.addEventListener('copy', e => {
  e.preventDefault();
  alert("No copying and pasting allowed!");
});

freezeCodeInput.addEventListener('cut', e => {
  e.preventDefault();
  alert("No copying and pasting allowed!");
});












