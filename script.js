// Variables to control states
let usedTouch = false;
let touchBlocked = false;
let isFrozen = false;

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

// On page load, position the runaway button nicely
window.addEventListener('DOMContentLoaded', () => {
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";
});

// Detect touch on non-mobile devices to show warning
window.addEventListener('touchstart', () => {
  if (!isMobileDevice()) {
    usedTouch = true;
    blockTouchScreen();
  }
}, { passive: true });

function blockTouchScreen() {
  if (touchBlocked) return; // Prevent multiple blockers
  touchBlocked = true;

  const blocker = document.createElement('div');
  blocker.id = 'blocker';
  blocker.innerHTML = `
    <div>
      <div style="font-size: 6em;">🚫</div>
      <div style="font-size: 2em; margin-top: 20px;">
        Sorry, touch screen use is not allowed on this device.<br>Please use a mouse or trackpad.
      </div>
    </div>
  `;
  document.body.appendChild(blocker);

  // Prevent scrolling & interaction while blocker is visible
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    blocker.remove();
    document.body.style.overflow = '';
    touchBlocked = false;
  }, 3000);
}

// Background color changes every second (unless inverted-upside-down class is active)
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// Confetti on mouse move (only if no touch used)
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

// Catch Me If You Can button
const runawayBtn = document.getElementById("runaway-button");

function moveRandom(el) {
  el.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

// Move runaway button when hovered (if not touched & not frozen)
runawayBtn.addEventListener("mouseenter", () => {
  if (usedTouch || isFrozen) return;
  moveRandom(runawayBtn);
});

// Clicking runaway button rewards if frozen (if touch not used)
runawayBtn.addEventListener("click", () => {
  if (usedTouch) return;
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }
});

// Reward display function
function showReward(message) {
  alert(message);
}

// === Invisible Admin Trigger Button ===
const adminTrigger = document.getElementById("admin-trigger");
adminTrigger.addEventListener("click", () => {
  const password = prompt("Enter admin password:");
  if (password === "Crazyadmin123") {
    window.location.href = "admin.html"; // redirect to admin page
  } else {
    alert("Wrong password!");
  }
});



























