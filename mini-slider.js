function initGenerated(generated_object, slide_duration) {
  var $ = window.jQuery;

  if (!$) {
    console.warn("jQuery is not loaded");
    return;
  }

  var sliderId = "tistols-mini-slider";
  var styleId = sliderId + "-style";

  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
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
}

[class*="tistolsCircleTab"]:hover {
  transform: scale(1);
}

.act {
  transform: scale(1.1) !important;
}

.fade {
  animation: fade 0.8s ease-out forwards !important;
}

@keyframes fade {
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

  var info = {};

  try {
    info = Function('"use strict"; return ({' + generated_object + '});')();
  } catch (error) {
    console.warn("Mini slider data error", error);
    return;
  }

  var svg = `<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
  <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
  <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#00f" stroke-width="2"></circle>
</svg>`;

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
    var classes = ($tab.attr("class") || "").split(/\s+/);

    for (var i = 0; i < classes.length; i++) {
      var match = classes[i].match(/^tistolsCircleTab(\d+)$/);

      if (match) {
        return parseInt(match[1], 10);
      }
    }

    return null;
  }

  function startAnimation(tabNumber) {
    var $circle = $(".tistolsCircleTab" + tabNumber + " .tistols-animated-circle");

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
    var $title = $(".tistolsTitleMS .tn-atom");
    var $person = $(".tistolsPersonMS .tn-atom");
    var $desc = $(".tistolsDescMS .tn-atom");
    var $pic = $(".tistolsPicMS .tn-atom");

    $title.text(data.title || "");
    $person.text(data.person || "");
    $desc.text(data.decs || "");

    if ($pic.length && data.pic) {
      var oldPic = $pic.css("background-image");

      $pic.css("--tistols-prev-pic", oldPic);
      $pic.addClass("is-changing");

      if ($pic[0]) {
        $pic[0].offsetHeight;
      }

      $pic.css("background-image", "url(" + data.pic + ")");

      requestAnimationFrame(function () {
        $pic.removeClass("is-changing");
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

  function initMiniSlider() {
    var $tabs = $('[class*="tistolsCircleTab"]');

    if (!$tabs.length) return;

    if ($tabs.data("tistolsMiniSliderReady")) return;
    $tabs.data("tistolsMiniSliderReady", true);

    $tabs.each(function () {
      var $tab = $(this);
      var $atom = $tab.find(".tn-atom").first();

      if (!$atom.length) return;

      if (!$atom.find(".tistols-circle-svg").length) {
        $atom.append(svg);
      }

      var $circle = $atom.find(".tistols-animated-circle");
      var hexColor = rgbToHex($atom.css("background-color"));

      if (hexColor) {
        $circle.attr("stroke", hexColor);
      }
    });

    $tabs.removeClass("act");
    $(".tistolsCircleTab1").addClass("act");

    updateInfo(1);
    startAnimation(1);

    $tabs.off("click.tistolsMiniSlider").on("click.tistolsMiniSlider", function () {
      var tabNumber = getTabNumber($(this));

      if (!tabNumber) return;

      $tabs.removeClass("act");
      $(this).addClass("act");

      updateInfo(tabNumber);
      startAnimation(tabNumber);
    });

    $(".tistols-animated-circle")
      .off("animationend.tistolsMiniSlider")
      .on("animationend.tistolsMiniSlider", function () {
        var $activeTab = $tabs.filter(".act").first();
        var currentTab = getTabNumber($activeTab) || 1;
        var totalSlides = $tabs.length;
        var nextTab = (currentTab % totalSlides) + 1;

        $tabs.removeClass("act");
        $(".tistolsCircleTab" + nextTab).addClass("act");

        updateInfo(nextTab);
        startAnimation(nextTab);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMiniSlider);
  } else {
    initMiniSlider();
  }

  window.addEventListener("load", function () {
    setTimeout(initMiniSlider, 300);
  });
}
