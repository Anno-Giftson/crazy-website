// === Touch screen alert ===
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  alert("👋 Hey touchscreen user! Enjoy the madness responsibly! 👆");
}

// === Main Website JS ===

// Elements
const spinButton = document.getElementById('spin-button');
const runawayButton = document.getElementById('runaway-button');
const cloneButton = document.getElementById('clone-button');
const clearClonesButton = document.getElementById('clear-clones-button');
const invertButton = document.getElementById('invert-button');
const deleteAllButton = document.getElementById('delete-all-button');
const generateCodeButton = document.getElementById('generate-code-button');
const piInput = document.getElementById('pi-input');
const submitPi = document.getElementById('submit-pi');
const puzzleContainer = document.getElementById('puzzle-container');
const confettiContainer = document.getElementById('confetti-container');
const rewardPopup = document.getElementById('reward-popup');

// Clones array
let clones = [];

// Confetti colors
const confettiColors = ['#FF004D', '#00E676', '#2979FF', '#FF9100', '#E91E63', '#00B8D4'];

// Spin button effect: rotate entire body 360 degrees in 2s
spinButton.addEventListener('click', () => {
  document.body.style.transition = 'transform 2s ease';
  document.body.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    document.body.style.transition = '';
    document.body.style.transform = '';
  }, 2100);
});

// Runaway button moves randomly within viewport on mouseover
runawayButton.addEventListener('mouseenter', () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxX = vw - runawayButton.offsetWidth;
  const maxY = vh - runawayButton.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  runawayButton.style.position = 'fixed';
  runawayButton.style.left = `${randomX}px`;
  runawayButton.style.top = `${randomY}px`;
});

// Clone me button clones the runaway button with glitch effect
cloneButton.addEventListener('click', () => {
  const clone = runawayButton.cloneNode(true);
  clone.classList.add('glitching');
  clone.style.position = 'fixed';
  // Position near original button with small random offset
  const rect = runawayButton.getBoundingClientRect();
  clone.style.left = (rect.left + (Math.random() * 100 - 50)) + 'px';
  clone.style.top = (rect.top + (Math.random() * 100 - 50)) + 'px';
  clone.style.zIndex = 9999;
  document.body.appendChild(clone);
  clones.push(clone);

  // Remove glitch class after animation duration
  setTimeout(() => {
    clone.classList.remove('glitching');
  }, 2000);

  // Add runaway effect on clones
  clone.addEventListener('mouseenter', () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxX = vw - clone.offsetWidth;
    const maxY = vh - clone.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    clone.style.left = `${randomX}px`;
    clone.style.top = `${randomY}px`;
  });
});

// Clear clones button removes all clones
clearClonesButton.addEventListener('click', () => {
  clones.forEach(clone => clone.remove());
  clones = [];
});

// Invert page button toggles invert + rotate
invertButton.addEventListener('click', () => {
  document.body.classList.toggle('inverted-upside-down');
});

// Delete all clones button removes clones + glitch effect on title
deleteAllButton.addEventListener('click', () => {
  clones.forEach(clone => clone.remove());
  clones = [];
  const title = document.getElementById('crazy-title');
  title.classList.add('glitching');
  setTimeout(() => {
    title.classList.remove('glitching');
  }, 1500);
});

// Generate 50 digits of Pi button autofills input
generateCodeButton.addEventListener('click', () => {
  piInput.value = '3.14159265358979323846264338327950288419716939937510';
});

// Submit Pi button checks if input is correct
submitPi.addEventListener('click', () => {
  const correctPi = '3.14159265358979323846264338327950288419716939937510';
  if (piInput.value === correctPi) {
    showReward("🎉 You solved the puzzle! Here's your reward! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    piInput.value = '';
  } else {
    alert('Nope! Try again!');
    piInput.value = '';
    piInput.focus();
  }
});

// Reward popup show function
function showReward(message) {
  rewardPopup.textContent = message;
  rewardPopup.style.display = 'block';
  setTimeout(() => {
    rewardPopup.style.display = 'none';
  }, 4000);
}

// Confetti spawn function
function spawnConfetti(x, y, count) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.left = (x + (Math.random() * 200 - 100)) + 'px';
    confetti.style.top = (y + (Math.random() * 50 - 25)) + 'px';
    confetti.style.width = confetti.style.height = (5 + Math.random() * 10) + 'px';
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// === Admin System ===
const adminArea = document.getElementById('admin-area');
const adminLoginPopup = document.getElementById('admin-login-popup');
const adminPanel = document.getElementById('admin-panel');
const adminPasswordInput = document.getElementById('admin-password');
const adminLoginButton = document.getElementById('admin-login-button');
const adminLogoutButton = document.getElementById('admin-logout-button');
const adminGetRewardButton = document.getElementById('admin-get-reward-button');

// Initially hide admin UI (already hidden via CSS, but just to be sure)
function hideAdminUI() {
  adminLoginPopup.style.display = 'none';
  adminPanel.style.display = 'none';
  adminPasswordInput.value = '';
}

// Show admin login popup
function showAdminLogin() {
  adminLoginPopup.style.display = 'block';
  adminPasswordInput.focus();
}

// Show admin panel after login
function showAdminPanel() {
  adminLoginPopup.style.display = 'none';
  adminPanel.style.display = 'block';
}

// Check if admin logged in (sessionStorage)
function checkAdminLogin() {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
  } else {
    hideAdminUI();
  }
}

// Click on invisible admin area to open login popup (if not logged in)
adminArea.addEventListener('click', () => {
  if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    showAdminLogin();
  }
});

// Admin login button click handler
adminLoginButton.addEventListener('click', () => {
  const password = adminPasswordInput.value;
  if (password === 'Crazyadmin123') {
    sessionStorage.setItem('adminLoggedIn', 'true');
    showAdminPanel();
    alert('Admin login successful!');
  } else {
    alert('Wrong password! Try again.');
    adminPasswordInput.value = '';
    adminPasswordInput.focus();
  }
});

// Admin logout button click handler
adminLogoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('adminLoggedIn');
  hideAdminUI();
  alert('Logged out successfully.');
});

// Admin "Get Reward Instantly" button click
adminGetRewardButton.addEventListener('click', () => {
  showReward("🎉 Admin reward granted instantly! 🎉");
  spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
});

// Check login status on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  checkAdminLogin();
});
























