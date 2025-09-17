let usedTouch = false;
let touchBlocked = false;
let clones = [];
let isFrozen = false;

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

// Position the runaway button neatly on page load
window.addEventListener('DOMContentLoaded', () => {
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";
});

// Detect touch on non-mobile and show warning
window.addEventListener('touchstart', () => {
  if (!isMobileDevice()) {
    usedTouch = true;
    blockTouchScreen();
  }
}, { passive: true });

function blockTouchScreen() {
  if (touchBlocked) return;
  touchBlocked = true;
  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.innerHTML = `🚫<br>Sorry, touch screen use is not allowed on this device.<br>Please use a mouse or trackpad.`;
  document.body.appendChild(blocker);
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    blocker.remove();
    document.body.style.overflow = '';
    touchBlocked = false;
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

function moveRandom(el) {
  if (isFrozen) return;
  el.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

// Move when hovered
runawayBtn.addEventListener("mouseenter", () => {
  if (usedTouch || isFrozen) return;
  moveRandom(runawayBtn);
});

// Clicking frozen button gives reward
runawayBtn.addEventListener("click", () => {
  if (usedTouch) return;
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }
});

// === Clone Button ===
document.getElementById("clone-button").addEventListener("click", () => {
  const clone = document.getElementById("clone-button").cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = "fixed";
  clone.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
  clone.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
  clone.style.zIndex = 9999;
  clone.addEventListener("click", () => {
    alert("Clone clicked!");
  });
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
  document.body.classList.toggle("inverted-upside-down");
});

// Glitch button
document.getElementById("glitch-button").addEventListener("click", () => {
  const el = document.getElementById("crazy-title");
  el.classList.add("glitching");
  setTimeout(() => el.classList.remove("glitching"), 2000);
});

// Confetti rain button
let confettiRainInterval = null;
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  if (confettiRainInterval) {
    clearInterval(confettiRainInterval);
    confettiRainInterval = null;
  } else {
    confettiRainInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      spawnConfetti(x, 0, 10);
    }, 300);
  }
});

// Puzzle logic
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");
const freezeCodeInput = document.getElementById("freeze-code");
const submitCodeBtn = document.getElementById("submit-code");
const clueBtn = document.getElementById("clue-button");
const clueText = document.getElementById("clue-text");

openPuzzleBtn.addEventListener("click", () => {
  puzzleContent.style.display = "block";
  openPuzzleBtn.style.display = "none";
});

clueBtn.addEventListener("click", () => {
  clueText.style.display = clueText.style.display === "none" ? "block" : "none";
});

// The actual pi digits as code (first 50 digits after decimal)
const piDigits = "14159265358979323846264338327950288419716939937510";

submitCodeBtn.addEventListener("click", () => {
  if (isFrozen) {
    alert("You already froze the button!");
    return;
  }
  const val = freezeCodeInput.value.trim();
  if (val === piDigits) {
    freezeButton();
  } else {
    alert("Wrong code! Try again.");
  }
});

function freezeButton() {
  isFrozen = true;
  runawayBtn.textContent = "Frozen 🥶";
  runawayBtn.style.backgroundColor = "cyan";
  runawayBtn.style.border = "3px solid blue";
  alert("Button frozen! Now click it to get your reward!");
}

// Show reward popup
function showReward(text) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = text;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 6000);
}

// Invisible Admin button click opens password prompt and redirects
document.getElementById("admin-invisible-btn").addEventListener("click", () => {
  const password = prompt("Enter admin password:");
  if (password === "Crazyadmin123") {
    // Redirect to admin page
    window.location.href = "admin.html";
  } else if (password !== null) {
    alert("Wrong password!");
  }
});


























