const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-on-scroll");
        entry.target.classList.remove("slide-in-up", "fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".animated-section").forEach((section) => {
  section.querySelectorAll(".slide-in-up, .fade-in").forEach((el) => {
    observer.observe(el);
  });
});

function animateCounter(id, targetValue, duration) {
  const element = document.getElementById(id);
  let startValue = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const value = Math.floor((progress / duration) * targetValue);

    if (value < targetValue) {
      element.textContent = value.toLocaleString();
      window.requestAnimationFrame(step);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  }

  window.requestAnimationFrame(step);
}

function animateProgressBar(id, targetPercentage) {
  const progressBar = document.querySelector(`#${id} .progress-bar-fill`);
  const percentageElement = document.querySelector(`#${id} #percentage-raised`);
  const targetWidth = targetPercentage;

  progressBar.style.width = targetWidth + "%";

  let currentPercentage = 0;
  const step = targetPercentage / 100;
  const interval = setInterval(() => {
    currentPercentage += step;
    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage;
      clearInterval(interval);
    }
    percentageElement.textContent = Math.round(currentPercentage);
  }, 20);
}

const statsSection = document.getElementById("stats");
const progressSection = document.getElementById("progress");

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Stats section intersecting");
        animateCounter("kids-count", 13045600, 500);
        animateCounter("scholarships-count", 8000000, 500);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Progress section intersecting");
        animateCounter("current-raised", 6300, 1500);
        animateCounter("goal-amount", 11000, 1500);
        animateCounter("days-left", 38, 1500);
        animateCounter("percentage-raised", 57, 1500);
        animateCounter("raised-2025", 736800, 1500);
        animateCounter("raised-2024", 2402000, 1500);
        animateCounter("raised-2023", 1906000, 1500);
        animateCounter("raised-2022", 5003040, 1500);

        animateProgressBar("progress", 57);
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

console.log("Observing stats section");
console.log("Observing progress section");

statsObserver.observe(statsSection);
progressObserver.observe(progressSection);
