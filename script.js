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

// Set initial position just below header container, centered horizontally
runawayBtn.style.position = "fixed";
runawayBtn.style.top = "100px";
runawayBtn.style.left = "50%";
runawayBtn.style.transform = "translateX(-50%)";

function moveRandom(el) {
  el.style.position = "fixed";

  // Limit area so button doesn't go under header container or out of view
  const headerHeight = document.getElementById('header-container').offsetHeight;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;

  // Min top = header height + 10px spacing
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

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

// Confetti rain button
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

// === Puzzle container open/close logic ===
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");

openPuzzleBtn.addEventListener("click", () => {
  if (puzzleContent.style.display === "none") {
    puzzleContent.style.display = "block";
  } else {
    puzzleContent.style.display = "none";
  }
});

// Clue toggle
document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
});

// No copy/paste on input and alert
const freezeInput = document.getElementById("freeze-code");

freezeInput.addEventListener("copy", (e) => {
  e.preventDefault();
  alert("No copying allowed!");
});
freezeInput.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("No pasting allowed!");
});
freezeInput.addEventListener("cut", (e) => {
  e.preventDefault();
  alert("No cutting allowed!");
});

// Submit code button
document.getElementById("submit-code").addEventListener("click", () => {
  const inputVal = freezeInput.value.trim();
  // The first 50 digits of pi (including the leading '3')
  const pi50digits = "31415926535897932384626433832795028841971693993751";

  if (inputVal === pi50digits) {
    if (!isFrozen) {
      alert("You need to freeze the button first (hover for 2 seconds or double click it)!");
      return;
    }
    showReward("🎉 Correct! You solved the puzzle! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  } else {
    alert("Wrong code! Keep trying.");
  }
});

// Reward popup show/hide
function showReward(msg) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = msg;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}














