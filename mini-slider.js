function initGenerated(generated_object, slide_duration) {
  (function () {
    const duration = Number(slide_duration) || 7;
    const fadeDuration = 700;
    let slides = {};
    let current = 1;
    let timer = null;
    let initialized = false;
    let tries = 0;

    try {
      slides = new Function("return ({" + generated_object + "});")();
    } catch (error) {
      console.error("Mini slider data error:", error);
      return;
    }

    const totalSlides = Object.keys(slides).length;
    if (!totalSlides) return;

    function addStyles() {
      if (document.getElementById("tistols-mini-slider-style")) return;

      const style = document.createElement("style");
      style.id = "tistols-mini-slider-style";
      style.textContent = `
.tistolsPicMS .tn-atom {
  position: relative;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.tistolsPicMS .tn-atom::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--tistols-prev-pic);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity ${fadeDuration}ms ease;
  pointer-events: none;
  z-index: 1;
}

.tistolsPicMS .tn-atom.is-changing::before {
  opacity: 1;
}

.tistols-circle-svg {
  width: 130%;
  height: 130%;
  pointer-events: none;
}

.tistols-animated-circle {
  opacity: 0;
  stroke: #fff;
  stroke-dasharray: 251;
  stroke-dashoffset: 251;
}

.act .tistols-animated-circle {
  opacity: 1;
  animation: tistolsFillCircle ${duration}s linear forwards;
}

@keyframes tistolsFillCircle {
  to {
    stroke-dashoffset: 0;
  }
}

[class*="tistolsCircleTab"] {
  transform: scale(0.8);
  transition: transform 0.15s linear;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

[class*="tistolsCircleTab"]:hover {
  transform: scale(1);
}

[class*="tistolsCircleTab"].act {
  transform: scale(1.1) !important;
}
`;
      document.head.appendChild(style);
    }

    function getTabs() {
      return Array.from(document.querySelectorAll('[class*="tistolsCircleTab"]'));
    }

    function getPicAtom() {
      return document.querySelector(".tistolsPicMS .tn-atom");
    }

    function getTabNumber(tab) {
      const match = (tab.className || "").match(/tistolsCircleTab(\d+)/);
      return match ? Number(match[1]) : null;
    }

    function addSvg(tab) {
      const atom = tab.querySelector(".tn-atom");
      if (!atom) return;

      atom.style.position = "relative";

      if (atom.querySelector(".tistols-circle-svg")) return;

      atom.insertAdjacentHTML(
        "beforeend",
        `<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
          <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
          <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="2"></circle>
        </svg>`
      );
    }

    function restartCircle(tab) {
      const circle = tab && tab.querySelector(".tistols-animated-circle");
      if (!circle) return;

      circle.style.animation = "none";
      circle.offsetHeight;
      circle.style.animation = "";
      circle.style.strokeDashoffset = circle.style.strokeDasharray;
    }

    function setActiveTab(index) {
      const tabs = getTabs();
      tabs.forEach((tab) => tab.classList.remove("act"));

      const activeTab = document.querySelector(".tistolsCircleTab" + index);

      if (activeTab) {
        activeTab.classList.add("act");
        restartCircle(activeTab);
      }
    }

    function changeImage(index) {
      const picAtom = getPicAtom();
      const slide = slides[index];

      if (!picAtom || !slide || !slide.pic) return;

      const previousImage = picAtom.style.backgroundImage || getComputedStyle(picAtom).backgroundImage;

      picAtom.style.setProperty("--tistols-prev-pic", previousImage);
      picAtom.classList.add("is-changing");
      picAtom.style.backgroundImage = "url(" + slide.pic + ")";

      window.setTimeout(() => {
        picAtom.classList.remove("is-changing");
      }, 40);
    }

    function showSlide(index) {
      if (!slides[index]) index = 1;

      current = index;
      setActiveTab(index);
      changeImage(index);

      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        const next = current >= totalSlides ? 1 : current + 1;
        showSlide(next);
      }, duration * 1000);
    }

    function bindTabs() {
      getTabs().forEach((tab) => {
        if (tab.dataset.tistolsSliderReady === "1") return;

        tab.dataset.tistolsSliderReady = "1";

        const handler = function (event) {
          event.preventDefault();

          const index = getTabNumber(tab);
          if (!index) return;

          showSlide(index);
        };

        tab.addEventListener("click", handler);
        tab.addEventListener("touchend", handler, { passive: false });
      });
    }

    function preloadImages() {
      Object.keys(slides).forEach((key) => {
        if (!slides[key] || !slides[key].pic) return;

        const img = new Image();
        img.src = slides[key].pic;
      });
    }

    function init() {
      const tabs = getTabs();
      const picAtom = getPicAtom();

      if (!tabs.length || !picAtom) {
        tries += 1;

        if (tries < 80) {
          window.setTimeout(init, 100);
        }

        return;
      }

      addStyles();
      preloadImages();
      tabs.forEach(addSvg);
      bindTabs();

      if (!initialized) {
        initialized = true;
        showSlide(1);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    window.addEventListener("load", function () {
      window.setTimeout(init, 300);
      window.setTimeout(init, 1000);
    });
  })();
}
