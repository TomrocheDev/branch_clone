function calculateSlides() {
    if (window.innerWidth > 1000) return 4;
    if (window.innerWidth < 1000 && window.innerWidth > 800) return 3;
    if (window.innerWidth < 800 && window.innerWidth > 600) return 2;
    if (window.innerWidth <= 600) return 1;
}

function setActive(index) {
    glTwoButtons.forEach((btn) => btn.classList.remove("_text-active"));
    glTwoButtons[index].classList.add("_text-active");
    updateUnderlinePosition(index);
}

function updateUnderlinePosition(index) {
    const activeButton = glTwoButtons[index];
    const underline = document.querySelector(".underline");
    const buttonRect = activeButton.getBoundingClientRect();
    const containerRect = activeButton.parentNode.getBoundingClientRect();
    const offsetLeft = buttonRect.left - containerRect.left;
    underline.style.width = `${buttonRect.width}px`;
    underline.style.transform = `translateX(${offsetLeft}px)`;
}

// Glider 1 (best-sellers)
let isInView = false;

const gliderObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) isInView = true;
            else isInView = false;
        });
    },
    { threshold: 0.5 }
);

gliderObserver.observe(document.querySelector("#best-sellers"));

window.addEventListener("resize", () => {
    if (isInView) {
        calculateSlides();
        location.reload();
    }
});

const slidesPerView = calculateSlides();
const configOne = {
    type: "carousel",
    perView: slidesPerView,
};

new Glide(".glider-1", configOne).mount();

// Glider 2 (inspiration)
const glTwo = new Glide(".glider-2", { rewind: false });

glTwo.on("run", function () {
    currentSlide = glTwo.index;
    setActive(currentSlide);
});

glTwo.mount();

const glTwoButtons = document.querySelectorAll(".glider-2 .glide__bullet");
const glTwoSlides = document.querySelectorAll(".glider-2 .glide__slide");
let currentIndex = 0;
let currentSlide = 0;

setActive(currentIndex);

// Show modals when item is clicked
const itemButtons = document.querySelectorAll(".clickable-button");
const modals = document.querySelectorAll(".modal");

itemButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (modals[index].classList.contains("_visible")) {
            modals[index].classList.remove("_visible");
            button.classList.remove("_button-active");
        } else {
            modals.forEach((modal) => modal.classList.remove("_visible"));
            itemButtons.forEach((button) => button.classList.remove("_button-active"));
            modals[index].classList.add("_visible");
            button.classList.add("_button-active");
        }
    });
});
