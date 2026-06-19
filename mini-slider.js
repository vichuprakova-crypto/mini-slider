function initGenerated(generated_object, slide_duration) {
    document.write(`<!--SL10 - Модификация для Тильды. Слайдер из миниатюр с прогресс-баром https://mod.tistols.com/mini-slider -->
<style>
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
  animation: tistolsfillCircle ` + slide_duration + `s linear forwards;
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
</style>

<script>
var svg = \`<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
  <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
  <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#00f" stroke-width="2"></circle>
</svg>\`;

function rgbToHex(rgb) {
  if (!rgb) return "";

  var rgbValues = rgb.match(/^rgb\\(\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*\\)$/);
  if (!rgbValues) return "";

  function hex(x) {
    return ("0" + parseInt(x, 10).toString(16)).slice(-2);
  }

  return "#" + hex(rgbValues[1]) + hex(rgbValues[2]) + hex(rgbValues[3]);
}

function getTabNumber($tab) {
  var className = $tab.attr("class") || "";
  var match = className.match(/tistolsCircleTab(\\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function startAnimation(tabNumber) {
  var circle = jQuery(".tistolsCircleTab" + tabNumber + " .tistols-animated-circle");

  circle.each(function () {
    this.style.animation = "none";
    this.offsetHeight;
    this.style.animation = "";
    this.style.strokeDashoffset = this.style.strokeDasharray;
  });
}

function updateInfo(tabNumber) {
  var info = {` + generated_object + `};

  if (!info.hasOwnProperty(tabNumber)) return;

  var data = info[tabNumber];

  jQuery(".tistolsTitleMS .tn-atom").text(data.title || "");
  jQuery(".tistolsPersonMS .tn-atom").text(data.person || "");
  jQuery(".tistolsDescMS .tn-atom").text(data.decs || "");

  var pic = jQuery(".tistolsPicMS .tn-atom");

  if (pic.length && data.pic) {
    var oldPic = pic.css("background-image");

    pic.css("--tistols-prev-pic", oldPic);
    pic.addClass("is-changing");

    if (pic[0]) {
      pic[0].offsetHeight;
    }

    pic.css("background-image", "url(" + data.pic + ")");

    requestAnimationFrame(function () {
      pic.removeClass("is-changing");
    });
  }

  var animatedText = jQuery(".tistolsTitleMS .tn-atom, .tistolsPersonMS .tn-atom, .tistolsDescMS .tn-atom");

  animatedText.addClass("fade");

  setTimeout(function () {
    animatedText.removeClass("fade");
  }, 800);
}

jQuery(function () {
  var tabs = jQuery('[class*="tistolsCircleTab"]');
  var totalSlides = tabs.length;

  if (!totalSlides) return;

  tabs.each(function () {
    var tab = jQuery(this);
    var atom = tab.find(".tn-atom").first();

    if (!atom.length) return;

    if (!atom.find(".tistols-circle-svg").length) {
      atom.append(svg);
    }

    var circle = atom.find(".tistols-animated-circle");
    var rgbColor = atom.css("background-color");
    var hexColor = rgbToHex(rgbColor);

    if (hexColor) {
      circle.attr("stroke", hexColor);
    }
  });

  tabs.removeClass("act");
  jQuery(".tistolsCircleTab1").addClass("act");

  updateInfo(1);
  startAnimation(1);

  tabs.off("click.tistolsMiniSlider touchend.tistolsMiniSlider").on("click.tistolsMiniSlider touchend.tistolsMiniSlider", function (event) {
    event.preventDefault();

    var tab = jQuery(this);
    var tabNumber = getTabNumber(tab);

    if (!tabNumber) return;

    tabs.removeClass("act");
    tab.addClass("act");

    updateInfo(tabNumber);
    startAnimation(tabNumber);
  });

  jQuery(".tistols-animated-circle").off("animationend.tistolsMiniSlider").on("animationend.tistolsMiniSlider", function () {
    var currentTab = getTabNumber(jQuery(".act").first()) || 1;
    var nextTab = (currentTab % totalSlides) + 1;

    tabs.removeClass("act");
    jQuery(".tistolsCircleTab" + nextTab).addClass("act");

    startAnimation(nextTab);
    updateInfo(nextTab);
  });
});
<\/script>`);
}
