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
const runawayButton = document.getElementById("runaway-button");
runawayButton.style.position = 'absolute';
runawayButton.style.left = '50%';
runawayButton.style.top = '150px';

runawayButton.addEventListener("mouseenter", () => {
  if (isFrozen) return;
  const x = Math.random() * (window.innerWidth - runawayButton.offsetWidth);
  const y = Math.random() * (window.innerHeight - runawayButton.offsetHeight);
  runawayButton.style.left = x + "px";
  runawayButton.style.top = y + "px";
});

// Freeze function for running button
function freezeButton() {
  isFrozen = true;
  runawayButton.style.backgroundColor = "cyan";
  runawayButton.textContent = "Frozen! Click me!";
  runawayButton.style.border = "3px solid white";
  runawayButton.removeEventListener("mouseenter", runawayButtonMouseEnter);
  runawayButton.addEventListener("click", () => {
    showReward("🎉 You caught the frozen button! Here's your prize!");
  });
}

function runawayButtonMouseEnter() {
  if (isFrozen) return;
  const x = Math.random() * (window.innerWidth - runawayButton.offsetWidth);
  const y = Math.random() * (window.innerHeight - runawayButton.offsetHeight);
  runawayButton.style.left = x + "px";
  runawayButton.style.top = y + "px";
}

// Cloning button
document.getElementById("clone-button").addEventListener("click", () => {
  const clone = runawayButton.cloneNode(true);
  clone.id = '';
  clone.style.position = 'absolute';
  clone.style.left = Math.random() * (window.innerWidth - clone.offsetWidth) + "px";
  clone.style.top = Math.random() * (window.innerHeight - clone.offsetHeight) + "px";
  clone.textContent = "Clone Button";
  clone.style.backgroundColor = 'purple';
  clone.style.border = '3px dotted yellow';
  clone.addEventListener('click', () => alert("I'm a clone!"));
  document.body.appendChild(clone);
  clones.push(clone);
});

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
  const title = document.getElementById("crazy-title");
  title.classList.add("glitching");
  setTimeout(() => {
    title.classList.remove("glitching");
  }, 2000);
});

// Confetti rain button
let confettiInterval = null;
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  } else {
    confettiInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      spawnConfetti(x, 0, 5);
    }, 200);
  }
});

// Reward popup
function showReward(text) {
  const reward = document.getElementById("reward-popup");
  reward.textContent = text;
  reward.style.display = "block";
  setTimeout(() => {
    reward.style.display = "none";
  }, 4000);
}

// === PUZZLE CONTAINER LOGIC ===

const puzzleToggleBtn = document.getElementById('puzzle-toggle-button');
const puzzleContent = document.getElementById('puzzle-content');
const clueBtn = document.getElementById('clue-button');
const clueText = document.getElementById('clue-text');
const codeInput = document.getElementById('freeze-code');
const submitCodeBtn = document.getElementById('submit-code');

puzzleToggleBtn.addEventListener('click', () => {
  puzzleContent.style.display = (puzzleContent.style.display === 'none' || puzzleContent.style.display === '') ? 'block' : 'none';
});

clueBtn.addEventListener('click', () => {
  clueText.style.display = (clueText.style.display === 'none' || clueText.style.display === '') ? 'block' : 'none';
});

// No copy/paste/cut/drop allowed in code input
["copy", "paste", "cut", "drop"].forEach(eventType => {
  codeInput.addEventListener(eventType, (e) => {
    e.preventDefault();
    alert("🚫 No copying and pasting allowed! Please type the code manually.");
  });
});

// Submit code button
submitCodeBtn.addEventListener('click', () => {
  const input = codeInput.value.trim();
  // Correct code: first 50 digits of pi including '3.'
  const correctCode = "3.14159265358979323846264338327950288419716939937510";

  if (input === correctCode && !isFrozen) {
    freezeButton();
    showReward("🧊 Code accepted! Button frozen. Click it to claim your prize!");
  } else if (!isFrozen) {
    alert("❌ Incorrect code. Try again!");
  }
});

// Randomize puzzle container position on load and resize
function randomizePuzzlePosition() {
  const container = document.getElementById('puzzle-container');
  const maxX = window.innerWidth - container.offsetWidth - 20;
  const maxY = window.innerHeight - container.offsetHeight - 20;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  container.style.left = randomX + 'px';
  container.style.top = randomY + 'px';
}
window.addEventListener('load', randomizePuzzlePosition);
window.addEventListener('resize', randomizePuzzlePosition);










