let touchBlocked = false;
let clones = [];
let isFrozen = false;
let confettiInterval = null;

const runawayBtn = document.getElementById("runaway-button");
const rewardPopup = document.getElementById("reward-popup");
const mainContent = document.getElementById("main-content");

// === Initialization ===
window.addEventListener('DOMContentLoaded', () => {
  // Position runaway button
  runawayBtn.style.position = "fixed";
  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";

  // Invisible Admin Button
  document.getElementById("admin-invisible-btn").addEventListener("click", () => {
    window.open("admin.html", "_blank");
  });
});

// === Touch Blocker ===
window.addEventListener('touchstart', () => {
  if (!isMobileDevice()) {
    blockTouchScreen();
  }
}, { passive: true });

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

function blockTouchScreen() {
  if (touchBlocked) return;
  touchBlocked = true;
  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.innerHTML = `🚫<br>Touch is not allowed. Use a mouse or trackpad.`;
  blocker.style = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.9); color: white; font-size: 2rem;
    display: flex; align-items: center; justify-content: center; z-index: 100000;
    text-align: center;
  `;
  document.body.appendChild(blocker);
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    blocker.remove();
    document.body.style.overflow = '';
    touchBlocked = false;
  }, 3000);
}

// === Background Color Changes ===
setInterval(() => {
  if (!mainContent.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// === Confetti on Mouse Move ===
document.addEventListener('mousemove', (e) => {
  spawnConfetti(e.pageX, e.pageY, 3);
});

function spawnConfetti(x, y, count = 10) {
  const container = document.getElementById('confetti-container');
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// === Button Events ===
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

runawayBtn.addEventListener("mouseenter", () => {
  if (isFrozen) return;
  moveRandom(runawayBtn);
});

runawayBtn.addEventListener("click", () => {
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
  }
});

function moveRandom(el) {
  if (isFrozen) return;
  const headerHeight = document.getElementById('header-container').offsetHeight;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

// Clone button
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

document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// === Invert Button ===
document.getElementById("invert-button").addEventListener("click", () => {
  mainContent.classList.toggle("inverted-upside-down");
});

// === Glitch Button ===
document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 3000);
});

// === Confetti Rain ===
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
});

function startConfettiRain() {
  if (confettiInterval) return;
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 15);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
  confettiInterval = null;
}

// === Puzzle + Freeze Logic ===
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");

openPuzzleBtn.addEventListener("click", () => {
  puzzleContent.style.display = (puzzleContent.style.display === "none") ? "block" : "none";
});

document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
});

const freezeInput = document.getElementById("freeze-code");
["copy", "paste", "cut"].forEach(event => {
  freezeInput.addEventListener(event, (e) => {
    e.preventDefault();
    alert(`No ${event}ing allowed!`);
  });
});

document.getElementById("submit-code").addEventListener("click", () => {
  const inputVal = freezeInput.value.trim();
  const pi10digits = "3.141592653";

  if (inputVal === pi10digits) {
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
  // Temporarily hide button
  runawayBtn.style.visibility = "hidden";
  rewardPopup.textContent = msg;
  rewardPopup.style.display = "block";

  setTimeout(() => {
    rewardPopup.style.display = "none";
    runawayBtn.style.visibility = "visible";
  }, 4000);
}

// === Admin Triggers ===
window.addEventListener("message", (event) => {
  const data = event.data;
  if (data === "trigger-do-not-press") {
    document.getElementById("spin-button").click();
  } else if (data === "trigger-glitch") {
    document.getElementById("glitch-button").click();
  } else if (data === "trigger-invert") {
    document.getElementById("invert-button").click();
  } else if (data === "trigger-confetti-rain") {
    document.getElementById("confetti-rain-button").click();
  } else if (data === "trigger-stop-confetti-rain") {
    stopConfettiRain();
  } else if (data === "trigger-clone") {
    document.getElementById("clone-button").click();
  } else if (data === "trigger-clear-clones") {
    document.getElementById("clear-clones-button").click();
  } else if (data === "trigger-freeze") {
    freezeButton();
  }
});


