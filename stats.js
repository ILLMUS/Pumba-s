// Count Up Animation
const counters = document.querySelectorAll('.count');
const options = {
  threshold: 0.5
};

const countUp = (entry) => {
  const el = entry.target;
  const target = +el.getAttribute('data-target');
  let count = 0;
  const increment = target / 200; // duration ~2s

  const update = () => {
    count += increment;
    if(count < target){
      el.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      el.innerText = target;
    }
  }
  update();
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      countUp(entry);
      observer.unobserve(entry.target);
    }
  });
}, options);

counters.forEach(counter => {
  observer.observe(counter);
});

// Stats Count + Fade/Bounce Animation
const statItems = document.querySelectorAll('.stat-item');

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');

      // Count-up logic
      const el = entry.target.querySelector('.count');
      const target = +el.getAttribute('data-target');
      let count = 0;
      const increment = target / 200;

      const update = () => {
        count += increment;
        if(count < target){
          el.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          el.innerText = target;
        }
      }
      update();

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statItems.forEach(item => statsObserver.observe(item));
