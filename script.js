// Existing code here...

// Grab new buttons
const runawayBtn = document.getElementById('runaway-button');
const cloneBtn = document.getElementById('clone-button');
const invertBtn = document.getElementById('invert-button');
const confettiStormBtn = document.getElementById('confetti-storm-button');

const prankSound = document.getElementById('prank-sound');
const runawaySound = document.getElementById('runaway-sound');

// PRANK 1: Runaway button — moves away when you try to hover it
runawayBtn.addEventListener('mouseenter', () => {
  runawaySound.currentTime = 0;
  runawaySound.volume = 0.4;
  runawaySound.play();

  const maxX = window.innerWidth - runawayBtn.offsetWidth;
  const maxY = window.innerHeight - runawayBtn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  runawayBtn.style.position = 'fixed';
  runawayBtn.style.left = randomX + 'px';
  runawayBtn.style.top = randomY + 'px';
});

// PRANK 2: Clone button — clones itself when clicked, chaos ensues!
cloneBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.3;
  prankSound.play();

  const clone = cloneBtn.cloneNode(true);
  clone.style.position = 'fixed';

  // Random position near center-ish
  const maxX = window.innerWidth - clone.offsetWidth;
  const maxY = window.innerHeight - clone.offsetHeight;
  const randomX = Math.floor(maxX / 3 + Math.random() * maxX / 3);
  const randomY = Math.floor(maxY / 3 + Math.random() * maxY / 3);

  clone.style.left = randomX + 'px';
  clone.style.top = randomY + 'px';

  // Add slight rotation & random animation on clones
  clone.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.7 + Math.random() * 0.6})`;
  clone.style.zIndex = 10000;

  // When clicked, clones ALSO clone! Recursive madness!
  clone.addEventListener('click', () => cloneBtn.click());

  document.body.appendChild(clone);
});

// PRANK 3: Invert colors for 5 seconds on invert button click
invertBtn.addEventListener('click', () => {
  prankSound.currentTime = 0;
  prankSound.volume = 0.4;
  prankSound.play();

  document.body.classList.add('inverted');

  alert("Whoa! The world looks upside down for a bit! (But don't worry, it's just colors inverted!)");

  setTimeout(() => {
    document.body.classList.remove('inverted');
  }, 5000);
});

// PRANK 4: Confetti storm button - rains confetti for 10 seconds nonstop
confettiStormBtn.addEventListener('click', () => {
  alert("Confetti storm unleashed! Brace yourself!");

  let stormInterval = setInterval(() => {
    // Spawn 10 confetti bursts at random positions on screen edges
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * window.innerWidth;
      let y = -20; // start above viewport

      spawnConfetti(x, y);
    }
  }, 200);

  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(stormInterval);
    alert("Confetti storm is over! Hope you had fun!");
  }, 10000);
});

