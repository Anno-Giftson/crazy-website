// Check if device is touch screen capable
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

if (!isTouchDevice) {
  window.addEventListener('touchstart', function (e) {
    alert('No touchscreen allowed!');
  }, { passive: true });
}

const runningBtn = document.getElementById('runningBtn');
const catchBtn = document.getElementById('catchBtn');
const submitCodeBtn = document.getElementById('submitCode');
const inputCode = document.getElementById('inputCode');
const rewardMsg = document.getElementById('rewardMsg');

let runningFrozen = true;

function moveButtonRandomly() {
  if (runningFrozen) return; // Don't move if frozen

  const container = runningBtn.parentElement;
  const maxX = container.clientWidth - runningBtn.offsetWidth;
  const maxY = container.clientHeight - runningBtn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  runningBtn.style.position = 'absolute';
  runningBtn.style.left = randomX + 'px';
  runningBtn.style.top = randomY + 'px';
}

// Start button moving every 500ms when unfrozen
let moveInterval;

catchBtn.addEventListener('click', () => {
  if (!runningFrozen) {
    // Move button once immediately on click
    moveButtonRandomly();
  }
});

// When submitting the pi code
submitCodeBtn.addEventListener('click', () => {
  const userCode = inputCode.value.trim();
  const correctCode = '3.141592653'; // First 10 digits of pi including decimal

  if (userCode === correctCode) {
    runningFrozen = false;
    rewardMsg.textContent = 'You caught it! Here is your reward 🎉';
    rewardMsg.style.display = 'block';

    // Start moving the running button
    moveInterval = setInterval(moveButtonRandomly, 500);

  } else {
    rewardMsg.textContent = 'Wrong code! Try again.';
    rewardMsg.style.display = 'block';
  }
});

// When running button clicked and not frozen
runningBtn.addEventListener('click', () => {
  if (!runningFrozen) {
    alert('Congrats! You caught the running button!');
    // Stop moving after catch
    clearInterval(moveInterval);
    rewardMsg.textContent = '';
  }
});





