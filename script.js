let touchBlocked = false;
let clones = [];
let isFrozen = false;

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

window.addEventListener('DOMContentLoaded', () => {
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";
});

window.addEventListener('touchstart', () => {
  if (!isMobileDevice()) {
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

setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

document.addEventListener('mousemove', (e) => {
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

runawayBtn.addEventListener("mouseenter", () => {
  if (isFrozen) return;
  moveRandom(runawayBtn);
});

runawayBtn.addEventListener("click", () => {
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
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 3000);
});

// Confetti rain
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
});

let confettiInterval;
function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 15);
  }, 300);
}
function stopConfettiRain() {
  clearInterval(confettiInterval);
}

// Puzzle container toggle
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");

openPuzzleBtn.addEventListener("click", () => {
  puzzleContent.style.display = (puzzleContent.style.display === "none") ? "block" : "none";
});

// Clue toggle
document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
});

// No copy/paste
const freezeInput = document.getElementById("freeze-code");

["copy", "paste", "cut"].forEach(event => {
  freezeInput.addEventListener(event, (e) => {
    e.preventDefault();
    alert(`No ${event}ing allowed!`);
  });
});

// Submit code
document.getElementById("submit-code").addEventListener("click", () => {
  const inputVal = freezeInput.value.trim();
  const pi50digits = "3.14159265358979323846264338327950288419716939937510";

  if (inputVal === pi50digits) {
    if (!isFrozen) {
      freezeButton();
    }
  } else {
    alert("Wrong code! Keep trying.");
  }
});

function freezeButton() {
  isFrozen = true;
  runawayBtn.textContent = "😳 You froze me!";
  runawayBtn.style.backgroundColor = "lightblue";
  runawayBtn.style.border = "3px solid blue";
}

function showReward(msg) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = msg;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

// === ADMIN ACCESS SYSTEM ===
const adminBtn = document.getElementById("admin-access-btn");
const adminModal = document.getElementById("admin-modal");
const adminSubmit = document.getElementById("admin-submit");
const adminPasswordInput = document.getElementById("admin-password");
const adminError = document.getElementById("admin-error");

adminBtn.addEventListener("click", () => {
  adminModal.style.display = "flex";
  adminPasswordInput.value = "";
  adminError.style.display = "none";
});

adminSubmit.addEventListener("click", () => {
  const password = adminPasswordInput.value;
  const correctPassword = "letmein"; // 🔐 Change this to your own secure password

  if (password === correctPassword) {
    window.location.href = "admin.html";
  } else {
    adminError.style.display = "block";
  }
});































