// == CrazyTown Main Script ==

// Grab elements
const spinButton = document.getElementById('spin-button');
const runawayButton = document.getElementById('runaway-button');
const cloneButton = document.getElementById('clone-button');
const clearClonesButton = document.getElementById('clear-clones-button');
const invertButton = document.getElementById('invert-button');
const glitchButton = document.getElementById('glitch-button');
const confettiRainButton = document.getElementById('confetti-rain-button');
const puzzleContainer = document.getElementById('puzzle-container');
const openPuzzleBtn = document.getElementById('open-puzzle-btn');
const puzzleContent = document.getElementById('puzzle-content');
const freezeCodeInput = document.getElementById('freeze-code');
const submitCodeBtn = document.getElementById('submit-code');
const clueButton = document.getElementById('clue-button');
const clueText = document.getElementById('clue-text');
const confettiContainer = document.getElementById('confetti-container');
const rewardPopup = document.getElementById('reward-popup');

// Admin elements
const adminSecretHitbox = document.getElementById('admin-secret-hitbox');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminPasswordInput = document.getElementById('admin-password-input');
const adminErrorMsg = document.getElementById('admin-error-msg');
const adminLoginSubmit = document.getElementById('admin-login-submit');
const adminLoginCancel = document.getElementById('admin-login-cancel');
const adminPanel = document.getElementById('admin-panel');
const adminGetRewardBtn = document.getElementById('admin-get-reward');
const adminLogoutBtn = document.getElementById('admin-logout');

let clones = [];
let inverted = false;
let glitchTimeout = null;
let confettiInterval = null;

// Puzzle correct code (first 50 digits of pi)
const pi50 = '31415926535897932384626433832795028841971693993751';

// ---------- BUTTONS LOGIC ---------- //

// DO NOT PRESS - spins the button and triggers confetti popup
spinButton.addEventListener('click', () => {
  spinButton.style.transition = 'transform 1s ease-in-out';
  spinButton.style.transform = 'rotate(1080deg)';
  setTimeout(() => {
    spinButton.style.transform = '';
  }, 1100);
  showRewardPopup("You pressed DO NOT PRESS! Nice try!");
  startConfettiRain(3000);
});

// Catch me if you can - runs away on hover
runawayButton.addEventListener('mouseenter', () => {
  const maxX = window.innerWidth - runawayButton.offsetWidth;
  const maxY = window.innerHeight - runawayButton.offsetHeight;
  const randX = Math.floor(Math.random() * maxX);
  const randY = Math.floor(Math.random() * maxY);
  runawayButton.style.position = 'fixed';
  runawayButton.style.left = randX + 'px';
  runawayButton.style.top = randY + 'px';
});

// Clone me! - clone button near the original
cloneButton.addEventListener('click', () => {
  const clone = cloneButton.cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = 'fixed';
  clone.style.left = (cloneButton.offsetLeft + Math.random() * 200 - 100) + 'px';
  clone.style.top = (cloneButton.offsetTop + Math.random() * 200 - 100) + 'px';
  clone.style.zIndex = 1000 + clones.length;
  clone.addEventListener('click', () => alert('You clicked a clone!'));
  document.body.appendChild(clone);
  clones.push(clone);
});

// Clear clones
clearClonesButton.addEventListener('click', () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert page and rotate upside down
invertButton.addEventListener('click', () => {
  inverted = !inverted;
  if (inverted) {
    document.body.classList.add('inverted-upside-down');
  } else {
    document.body.classList.remove('inverted-upside-down');
  }
});

// Glitch effect on title
glitchButton.addEventListener('click', () => {
  const title = document.getElementById('crazy-title');
  title.classList.add('glitching');
  clearTimeout(glitchTimeout);
  glitchTimeout = setTimeout(() => {
    title.classList.remove('glitching');
  }, 2000);
});

// Confetti rain button
confettiRainButton.addEventListener('click', () => {
  startConfettiRain(5000);
});

// ---------- PUZZLE ---------- //

openPuzzleBtn.addEventListener('click', () => {
  puzzleContent.style.display = puzzleContent.style.display === 'none' ? 'block' : 'none';
  clueText.style.display = 'none';
});

submitCodeBtn.addEventListener('click', () => {
  const userInput = freezeCodeInput.value.trim();
  if (userInput === pi50) {
    showRewardPopup('🎉 Correct! You got the reward! 🎉');
  } else {
    alert('Wrong code! Try again.');
  }
});

clueButton.addEventListener('click', () => {
  clueText.style.display = 'block';
});

// ---------- CONFETTI ---------- //

function startConfettiRain(duration = 3000) {
  const colors = ['#ff0043', '#14fc56', '#00d4ff', '#fffc00', '#ff00ff'];
  const confettiCount = 100;

  let intervalCount = 0;
  confettiInterval = setInterval(() => {
    if (intervalCount > confettiCount) {
      clearInterval(confettiInterval);
      return;
    }
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    intervalCount++;
  }, 30);
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.top = '-10px';
  confettiContainer.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// ---------- REWARD POPUP ---------- //

function showRewardPopup(text) {
  rewardPopup.textContent = text;
  rewardPopup.style.display = 'block';
  setTimeout(() => {
    rewardPopup.style.display = 'none';
  }, 3500);
}

// ---------- ADMIN LOGIN ---------- //

const ADMIN_PASSWORD = 'crazyadmin123';

function openAdminLogin() {
  adminPasswordInput.value = '';
  adminErrorMsg.textContent = '';
  adminLoginModal.classList.remove('hidden');
  adminPasswordInput.focus();
}

function closeAdminLogin() {
  adminLoginModal.classList.add('hidden');
}

function showAdminPanel() {
  adminPanel.classList.remove('hidden');
}

function hideAdminPanel() {
  adminPanel.classList.add('hidden');
  sessionStorage.removeItem('adminLoggedIn');
}

// Check sessionStorage on load for admin login
window.addEventListener('load', () => {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
  }
});

// Clicking the secret hitbox opens the admin login modal
adminSecretHitbox.addEventListener('click', () => {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    // Already logged in, toggle admin panel visibility
    if (adminPanel.classList.contains('hidden')) {
      showAdminPanel();
    } else {
      hideAdminPanel();
    }
  } else {
    openAdminLogin();
  }
});

// Submit admin login
adminLoginSubmit.addEventListener('click', () => {
  const pass = adminPasswordInput.value.trim();
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    closeAdminLogin();
    showAdminPanel();
  } else {
    adminErrorMsg.textContent = 'Incorrect password!';
  }
});

// Cancel admin login
adminLoginCancel.addEventListener('click', () => {
  closeAdminLogin();
});

// Admin "Get Reward Instantly" button
adminGetRewardBtn.addEventListener('click', () => {
  showRewardPopup('🎉 Admin reward granted instantly! 🎉');
});

// Admin logout
adminLogoutBtn.addEventListener('click', () => {
  hideAdminPanel();
  alert('Admin logged out.');
});






















