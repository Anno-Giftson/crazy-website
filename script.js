let clones = [];
let isFrozen = false;

const runawayBtn = document.getElementById("runaway-button");
runawayBtn.style.position = "fixed";
runawayBtn.style.top = "200px";
runawayBtn.style.left = "50%";
runawayBtn.style.transform = "translateX(-50%)";

// === DO NOT PRESS ===
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

// === RUNAWAY BUTTON ===
function moveRandom(el) {
  if (isFrozen) return;

  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = 140;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

runawayBtn.addEventListener("mouseenter", () => {
  if (!isFrozen) moveRandom(runawayBtn);
});

runawayBtn.addEventListener("click", () => {
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
  }
});

// === CLONE BUTTON ===
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

// === CLEAR CLONES ===
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// === INVERT PAGE ===
const mainContent = document.getElementById("main-content");
document.getElementById("invert-button").addEventListener("click", () => {
  mainContent.classList.toggle("inverted-upside-down");
});

// === GLITCH EFFECT ===
document.getElementById("glitch-button").addEventListener("click", () => {
  mainContent.classList.add("glitching");
  setTimeout(() => {
    mainContent.classList.remove("glitching");
  }, 3000);
});

// === CONFETTI RAIN ===
let confettiInterval;
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
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

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 15);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
}

// === PUZZLE SECTION ===
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");
openPuzzleBtn.addEventListener("click", () => {
  puzzleContent.style.display = (puzzleContent.style.display === "none") ? "block" : "none";
});

document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
});

document.getElementById("submit-code").addEventListener("click", () => {
  const val = document.getElementById("freeze-code").value.trim();
  const correct = "3.14159265"; // 10 digits
  if (val === correct) {
    freezeButton();
  } else {
    alert("Wrong code! Try again.");
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



