// Animation for bars when the savings sections comes in view
const bars = document.querySelector(".bars");
const dealer = document.querySelector(".bar-dealer .bar-fill");
const branch = document.querySelector(".bar-branch .bar-fill");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                dealer.classList.add("animate__bar__full");
                branch.classList.add("animate__bar__half");
            }
        });
    },
    { threshold: 1 }
);

observer.observe(bars);

// Pulse animation on buttons in inspiration section
const pulses = document.querySelectorAll(".pulse");

pulses.forEach((pulse) => {
    setInterval(() => {
        pulse.classList.add("_pulse");

        setTimeout(() => {
            pulse.classList.remove("_pulse");
        }, 2000);
    }, 2500);
});
