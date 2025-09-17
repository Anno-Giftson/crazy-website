let usedTouch = false;
let touchBlocked = false;
let clones = [];
let isFrozen = false;

// Check if device is mobile
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

  // Attach event listeners for buttons
  attachButtonListeners();
});

function attachButtonListeners() {
  document.getElementById('spin-button').addEventListener('click', spinButton);
  document.getElementById('runaway-button').addEventListener('mouseover', runawayMouseOver);
  document.getElementById('clone-button').addEventListener('click', cloneButton);
  document.getElementById('clear-clones-button').addEventListener('click', clearClones);
  document.getElementById('invert-button').addEventListener('click', invertPage);
  document.getElementById('glitch-button').addEventListener('click', glitchPage);
  document.getElementById('confetti-rain-button').addEventListener('click', startConfettiRain);
  document.getElementById('open-puzzle-btn').addEventListener('click', togglePuzzle);
  document.getElementById('submit-code').addEventListener('click', submitCode);
  document.getElementById('clue-button').addEventListener('click', toggleClue);
}

function spinButton() {
  const btn = document.getElementById('spin-button');
  btn.style.transition = 'transform 2s ease';
  btn.style.transform = 'rotate(3600deg)';
  setTimeout(() => {
    btn.style.transform = 'rotate(0deg)';
  }, 2000);
}

function runawayMouseOver(e) {
  if (isFrozen) return; // freeze disables movement

  const btn = e.target;
  const padding = 50; // minimum distance from edges
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const btnRect = btn.getBoundingClientRect();

  // Random new position inside viewport boundaries
  let newX = Math.random() * (vw - btnRect.width - padding * 2) + padding;
  let newY = Math.random() * (vh - btnRect.height - padding * 2) + padding;

  // Avoid placing it too close to current position (optional)
  const currentX = btnRect.left;
  const currentY = btnRect.top;
  if (Math.abs(newX - currentX) < 100) newX += 100;
  if (Math.abs(newY - currentY) < 100) newY += 100;

  // Animate position change smoothly
  btn.style.transition = 'top 0.3s ease, left 0.3s ease';
  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;
}

function cloneButton() {
  const clone = document.getElementById('runaway-button').cloneNode(true);
  clone.id = ''; // remove duplicate ID
  clone.style.position = 'fixed';

  // Random position for clone
  clone.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
  clone.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
  clone.style.transform = 'none';

  // Attach event for runaway effect on clone
  clone.addEventListener('mouseover', runawayMouseOver);

  document.body.appendChild(clone);
  clones.push(clone);
}

function clearClones() {
  clones.forEach(c => c.remove());
  clones = [];
}

function invertPage() {
  document.body.classList.toggle('inverted-upside-down');
}

function glitchPage() {
  document.body.classList.add('glitching');
  setTimeout(() => {
    document.body.classList.remove('glitching');
  }, 2000);
}

function startConfettiRain() {
  const confettiContainer = document.getElementById('confetti-container');
  const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00'];

  let interval = setInterval(() => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }, 150);

  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

function togglePuzzle() {
  const puzzleContent = document.getElementById('puzzle-content');
  puzzleContent.style.display = puzzleContent.style.display === 'none' ? 'block' : 'none';
}

function submitCode() {
  const codeInput = document.getElementById('freeze-code');
  const code = codeInput.value.trim();
  const pi50 = "3.14159265358979323846264338327950288419716939937510";

  if (code === pi50) {
    isFrozen = true;
    alert('Code correct! Running button frozen.');
  } else {
    alert('Incorrect code, try again!');
  }
}

function toggleClue() {
  const clueText = document.getElementById('clue-text');
  clueText.style.display = clueText.style.display === 'none' ? 'block' : 'none';
}

// Block touch screen usage on non-mobile devices with full black overlay and red text
window.addEventListener('touchstart', () => {
  if (!isMobileDevice()) {
    if (!touchBlocked) {
      touchBlocked = true;

      const blocker = document.createElement('div');
      blocker.id = 'blocker';
      blocker.style.position = 'fixed';
      blocker.style.top = '0';
      blocker.style.left = '0';
      blocker.style.width = '100vw';
      blocker.style.height = '100vh';
      blocker.style.backgroundColor = 'black';
      blocker.style.color = 'red';
      blocker.style.fontSize = '2em';
      blocker.style.display = 'flex';
      blocker.style.justifyContent = 'center';
      blocker.style.alignItems = 'center';
      blocker.style.textAlign = 'center';
      blocker.style.zIndex = '99999';
      blocker.style.padding = '20px';
      blocker.innerHTML = '🚫<br>Sorry, touch screen use is not allowed on desktop.<br>Please use a mouse or keyboard instead.';
      document.body.appendChild(blocker);

      // Stop runaway button movement by freezing
      isFrozen = true;
    }
  }
}, { passive: true });

// ADMIN INVISIBLE BUTTON LOGIC

const adminBtn = document.getElementById('admin-invisible-button');
adminBtn.addEventListener('click', () => {
  const password = prompt("Enter admin password:");
  if (password === "Crazyadmin123") {
    window.location.href = "admin.html";
  } else if(password !== null) {
    alert("Incorrect password!");
  }
});





























