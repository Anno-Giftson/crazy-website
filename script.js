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
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
  } else {
    alert("Try to catch me first! I keep running!");
  }
});

// Open Puzzle
document.getElementById("open-puzzle-btn").addEventListener("click", () => {
  const puzzle = document.getElementById("puzzle-content");
  puzzle.style.display = puzzle.style.display === "none" ? "block" : "none";
});

// Submit freeze code
document.getElementById("submit-code").addEventListener("click", () => {
  const codeInput = document.getElementById("freeze-code").value.trim();
  const pi50 = "3.14159265358979323846264338327950288419716939937510";

  if (codeInput === pi50) {
    isFrozen = true;
    showReward("Frozen! Now you can catch the button!");
  } else {
    alert("Wrong code! Try again!");
  }
});

// Show clue
document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = clueText.style.display === "none" ? "block" : "none";
});

// Clear clones button
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(clone => clone.remove());
  clones = [];
});

// Clone me! button
document.getElementById("clone-button").addEventListener("click", () => {
  const cloneBtn = document.getElementById("clone-button");
  const clone = cloneBtn.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.top = `${Math.random() * (window.innerHeight - clone.offsetHeight)}px`;
  clone.style.left = `${Math.random() * (window.innerWidth - clone.offsetWidth)}px`;
  clone.addEventListener("click", () => {
    alert("Clone says hi!");
  });
  document.body.appendChild(clone);
  clones.push(clone);
});

// Invert page button
document.getElementById("invert-button").addEventListener("click", () => {
  document.body.classList.toggle("inverted-upside-down");
});

// Glitch button
document.getElementById("glitch-button").addEventListener("click", () => {
  const title = document.getElementById("crazy-title");
  title.classList.add("glitching");
  setTimeout(() => {
    title.classList.remove("glitching");
  }, 2000);
});

// Confetti rain button
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
});

let confettiInterval;
function startConfettiRain() {
  clearInterval(confettiInterval);
  confettiInterval = setInterval(() => {
    spawnConfetti(Math.random() * window.innerWidth, 0, 10);
  }, 300);
}

// Reward popup function
function showReward(text) {
  const popup = document.getElementById("reward-popup");
  popup.innerText = text;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

// Admin Invisible Button Click Handler
document.getElementById("admin-invisible-button").addEventListener("click", () => {
  const password = prompt("Enter Admin Password:");
  if (password === "Crazyadmin123") {
    window.location.href = "admin.html";
  } else {
    alert("Wrong password!");
  }
});




























