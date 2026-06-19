function initGenerated(generated_object, slide_duration) {
  (function () {
    var maxTries = 80;
    var tryDelay = 100;
    var inited = false;

    function getJQuery() {
      return window.jQuery || window.$;
    }

    function addStyle() {
      if (document.getElementById("tistols-mini-slider-style")) return;

      var style = document.createElement("style");
      style.id = "tistols-mini-slider-style";
      style.textContent = `
.tistols-circle-svg {
  width: 130%;
  height: 130%;
}

.tistols-animated-circle {
  opacity: 0;
}

.act .tistols-animated-circle {
  opacity: 1;
  stroke-dasharray: 251;
  stroke-dashoffset: 251;
  animation: tistolsfillCircle ${slide_duration}s linear forwards;
}

.tistolsPicMS .tn-atom {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
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
  transition: opacity .8s ease;
  pointer-events: none;
}

.tistolsPicMS .tn-atom.is-changing::before {
  opacity: 0;
}

@keyframes tistolsfillCircle {
  to {
    stroke-dashoffset: 0;
  }
}

[class*="tistolsCircleTab"] {
  transform: scale(0.8);
  transition: transform 0.1s linear;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

[class*="tistolsCircleTab"]:hover {
  transform: scale(1);
}

.act {
  transform: scale(1.1) !important;
}

.fade {
  animation: tistolsFade 0.8s ease-out forwards !important;
}

@keyframes tistolsFade {
  0% {
    opacity: 0;
    transform: none;
  }

  100% {
    opacity: 1;
    transform: none;
  }
}
`;
      document.head.appendChild(style);
    }

    function parseInfo() {
      try {
        return new Function("return ({" + generated_object + "});")();
      } catch (error) {
        console.error("mini-slider: data parse error", error);
        return {};
      }
    }

    function rgbToHex(rgb) {
      if (!rgb) return "";
      var rgbValues = rgb.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
      if (!rgbValues) return "";

      function hex(x) {
        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
      }

      return "#" + hex(rgbValues[1]) + hex(rgbValues[2]) + hex(rgbValues[3]);
    }

    function getTabNumber($tab) {
      var className = $tab.attr("class") || "";
      var match = className.match(/tistolsCircleTab(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }

    function init() {
      if (inited) return true;

      var jQuery = getJQuery();
      if (!jQuery) return false;

      var $tabs = jQuery('[class*="tistolsCircleTab"]');
      var $pic = jQuery(".tistolsPicMS .tn-atom");

      if (!$tabs.length || !$pic.length) return false;

      inited = true;

      addStyle();

      var info = parseInfo();
      var svg = `<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
  <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
  <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#00f" stroke-width="2"></circle>
</svg>`;

      function startAnimation(tabNumber) {
        var $circle = jQuery(".tistolsCircleTab" + tabNumber + " .tistols-animated-circle");

        $circle.each(function () {
          this.style.animation = "none";
          this.offsetHeight;
          this.style.animation = "";
          this.style.strokeDashoffset = this.style.strokeDasharray;
        });
      }

      function updateInfo(tabNumber) {
        if (!Object.prototype.hasOwnProperty.call(info, tabNumber)) return;

        var data = info[tabNumber] || {};

        var $title = jQuery(".tistolsTitleMS .tn-atom");
        var $person = jQuery(".tistolsPersonMS .tn-atom");
        var $desc = jQuery(".tistolsDescMS .tn-atom");
        var $picAtom = jQuery(".tistolsPicMS .tn-atom");

        $title.text(data.title || "");
        $person.text(data.person || "");
        $desc.text(data.decs || "");

        if ($picAtom.length && data.pic) {
          var oldPic = $picAtom.css("background-image");

          $picAtom.css("--tistols-prev-pic", oldPic);
          $picAtom.addClass("is-changing");

          if ($picAtom[0]) {
            $picAtom[0].offsetHeight;
          }

          $picAtom.css("background-image", "url(" + data.pic + ")");

          requestAnimationFrame(function () {
            $picAtom.removeClass("is-changing");
          });
        }

        var $animatedText = $title.add($person).add($desc);

        $animatedText.removeClass("fade");

        requestAnimationFrame(function () {
          $animatedText.addClass("fade");
        });

        setTimeout(function () {
          $animatedText.removeClass("fade");
        }, 800);
      }

      $tabs.each(function () {
        var $tab = jQuery(this);
        var $atom = $tab.find(".tn-atom").first();

        if (!$atom.length) return;

        $atom.find(".tistols-circle-svg").remove();
        $atom.append(svg);

        var $circle = $atom.find(".tistols-animated-circle");
        var hexColor = rgbToHex($atom.css("background-color"));

        if (hexColor) {
          $circle.attr("stroke", hexColor);
        }
      });

      $tabs.removeClass("act");
      jQuery(".tistolsCircleTab1").addClass("act");

      updateInfo(1);
      startAnimation(1);

      $tabs.off(".tistolsMiniSlider").on("click.tistolsMiniSlider touchend.tistolsMiniSlider", function (event) {
        event.preventDefault();

        var $tab = jQuery(this);
        var tabNumber = getTabNumber($tab);

        if (!tabNumber) return;

        $tabs.removeClass("act");
        $tab.addClass("act");

        updateInfo(tabNumber);
        startAnimation(tabNumber);
      });

      jQuery(".tistols-animated-circle")
        .off("animationend.tistolsMiniSlider webkitAnimationEnd.tistolsMiniSlider")
        .on("animationend.tistolsMiniSlider webkitAnimationEnd.tistolsMiniSlider", function () {
          var currentTab = getTabNumber(jQuery(".act").first()) || 1;
          var totalSlides = $tabs.length;
          var nextTab = (currentTab % totalSlides) + 1;

          $tabs.removeClass("act");
          jQuery(".tistolsCircleTab" + nextTab).addClass("act");

          updateInfo(nextTab);
          startAnimation(nextTab);
        });

      return true;
    }

    function retry() {
      if (init()) return;

      maxTries -= 1;

      if (maxTries > 0) {
        setTimeout(retry, tryDelay);
      }
    }

    retry();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", retry);
    }

    window.addEventListener("load", function () {
      setTimeout(retry, 300);
    });
  })();
}
