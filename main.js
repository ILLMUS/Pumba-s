// Animate Hero Title
const text = document.querySelector('.reveal-text');
const letters = text.textContent.split('');
text.textContent = '';
letters.forEach((letter, i) => {
  const span = document.createElement('span');
  span.textContent = letter;
  span.style.animationDelay = `${i * 0.05}s`;
  text.appendChild(span);
});

// Fade in on scroll
const fadeIns = document.querySelectorAll('.fade-in');

function reveal() {
  fadeIns.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);









// Reveal and Mouse follow for magic-section
const magic = document.querySelector('.magic-content');
const magicSection = document.querySelector('.fade-in-mouse');

window.addEventListener('scroll', () => {
  const top = magicSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    magicSection.classList.add('show');
  }
});

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  magic.style.transform = `translate(${x}px, ${y}px)`;
});


// Smooth cursor glow
const cursor = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.15; // lower is slower

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Click ripple effect
document.addEventListener('click', () => {
  cursor.classList.add('click-effect');
  setTimeout(() => cursor.classList.remove('click-effect'), 400);
});


// Spotlight tilt effect
const spotlight = document.querySelector('.spotlight-content');

document.querySelector('.spotlight-section').addEventListener('mousemove', (e) => {
  const { offsetWidth: width, offsetHeight: height } = spotlight;
  let { offsetX: x, offsetY: y } = e;

  // Normalize for nested elements
  if (e.target !== e.currentTarget) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const rotateX = ((height / 2 - y) / 25).toFixed(2);
  const rotateY = ((x - width / 2) / 25).toFixed(2);

  spotlight.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.querySelector('.spotlight-section').addEventListener('mouseleave', () => {
  spotlight.style.transform = `rotateX(0deg) rotateY(0deg)`;
});


// Reveal .fade-in-mouse elements on scroll
const faders = document.querySelectorAll('.fade-in-mouse');

const appearOptions = {
  threshold: 0.25,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-in-zoom');

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);





document.querySelector("form").addEventListener("submit", function(e) {
  const privacyAccepted = document.getElementById("privacy-checkbox").checked;
  if (!privacyAccepted) {
    e.preventDefault();
    alert("Please agree to our Privacy Policy to proceed.");
  }
});





