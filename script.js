const slideBox = document.getElementById("slideBox");

const images = [
  "/public/brass_seaweed_set_5_banner.webp",
  "/public/beachcomber_multi.webp",
  "/public/laura.webp",
  "/public/pin1_1.webp",
];

let currentIndex = 0;

function changeBackground() {
  slideBox.style.backgroundImage = `url('${images[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % images.length;
}

changeBackground();
setInterval(changeBackground, 2500);

(function () {
  const track = document.getElementById("mySliderTrack");
  const dotsWrap = document.getElementById("mySliderDots");
  const slides = Array.from(track.querySelectorAll("img"));
  if (!track || slides.length === 0) return;

  const prevBtn = dotsWrap.querySelector(".prev");
  const nextBtn = dotsWrap.querySelector(".next");

  // Insert dots between prev and next
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "slider-dot" + (i === 0 ? " active" : "");
    d.dataset.index = i;
    d.addEventListener("click", () => {
      idx = i;
      update();
      resetTimer();
    });
    dotsWrap.insertBefore(d, nextBtn);
  });

  let idx = 0;
  const update = () => {
    track.style.transform = `translateX(${-idx * 100}%)`;
    Array.from(dotsWrap.querySelectorAll(".slider-dot")).forEach((dot, i) =>
      dot.classList.toggle("active", i === idx)
    );
  };

  let timer = setInterval(next, 3500);
  function next() {
    idx = (idx + 1) % slides.length;
    update();
  }
  function prev() {
    idx = (idx - 1 + slides.length) % slides.length;
    update();
  }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 3500);
  }

  prevBtn.addEventListener("click", () => {
    prev();
    resetTimer();
  });
  nextBtn.addEventListener("click", () => {
    next();
    resetTimer();
  });

  // Touch swipe
  let startX = 0;
  track.addEventListener(
    "touchstart",
    (e) => (startX = e.touches[0].clientX),
    { passive: true }
  );
  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
      resetTimer();
    }
  });

  track.addEventListener("mouseenter", () => clearInterval(timer));
  track.addEventListener("mouseleave", resetTimer);

  update();
})();
