document.write("<script src=\"https://code.jquery.com/jquery-3.7.1.min.js\" integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\" crossorigin=\"anonymous\"></script>");
function init(dm = 0) {
    document.write('<div id="tistols-mods-generator"></div>');

    const container = $('#tistols-mods-generator');

    let form_input = "<fieldset>" +
        "                <label class=\"tm-image-label\">\n" +
        "                    <span>Текст для класса .tistolsPersonMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
        "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-personms[]\">\n" +
        "                </label>\n" +
        "                <label class=\"tm-image-label\">\n" +
        "                    <span>Текст для класса .tistolsDescMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
        "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-descms[]\">\n" +
        "                </label>\n" +
        "                <label class=\"tm-image-label\">\n" +
        "                    <span>Текст для класса .tistolsTitleMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
        "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-titlems[]\">\n" +
        "                </label>\n" +
        "                <label class=\"tm-image-label\">\n" +
        "                    <span>Ссылка на изображение<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
        "                    <input type=\"url\" class=\"tm-input\" name=\"tm-slide-imgms[]\">\n" +
        "                </label>\n" +
        "</fieldset>";

    let form_inputs = "";

    for (var i = 1; i < 3; i++) {
        form_inputs += form_input;
    }

    let form_code = "<script src=\"https://code.jquery.com/jquery-3.7.1.min.js\" integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\" crossorigin=\"anonymous\"></script><link rel=\"stylesheet\" href=\"https://mods.tistols.com/assets/css/mods-generator.css\">\n" +
        "    <div id=\"tistols-mods-generator\">\n" +
        "        <div class=\"tm-generator\">\n" +
        "<div class='outmode-toggle-btn'><input id=\"toggle-on\" class=\"toggle toggle-left\" name=\"toggle\" value=\"false\" type=\"radio\" checked>\n" +
        "<label for=\"toggle-on\" title='Стандартный - это режим для тех, кто не планирует вмешиваться в код и хочет использовать готовую модификацию «как есть» с автоматическими обновлениями.' class=\"btn\">Стандартный</label>\n" +
        "<input id=\"toggle-off\" class=\"toggle toggle-right\" name=\"toggle\" value=\"true\" type=\"radio\">\n" +
        "<label for=\"toggle-off\" title='Продвинутый - это режим для тех, кто разбирается в коде и планирует вносить свои корректировки в работу модификаций, обновления устанавливаются вручную, путем повторной генерации мода и установки обновленного кода.' class=\"btn\">Продвинутый</label></div>" +
        "            <div class=\"tm-generator-inputbox\">\n" +
        "                <label class=\"tm-image-label\">\n" +
        "                    <span>Длительность показа слайдов (сек) <font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
        "                    <input type=\"number\" min='0' step='1' value='5' class=\"tm-input\" name=\"tm-slide-duration\">\n" +
        "                </label>\n"+
        "            </div>\n" +
        "            <div class=\"tm-generator-inputbox\">\n" +
        form_inputs +
        "               <label><span>Добавить слайд</span>" +
        "               <button class=\"tm-submit\" id=\"tm-add-image\">+</button></label>" +
        "            </div>\n" +
        "\n" +
        "            <button class=\"tm-submit\" type=\"button\" id=\"tm-generate-zakrashivanie\">Скопировать код</button>\n" +
        "        </div>\n" +
        "    </div>";

    container.html(form_code);

    if (dm == "d2024") {
        $('#tm-generate-zakrashivanie').hide();
        $('#tm-generate-zakrashivanie').remove();
    }

    $("[contenteditable]").keypress(function (evt) {

  var keycode = evt.charCode || evt.keyCode;
  if (keycode  == 13) { //Enter key's keycode
    return false;
  }
}); function generate(generated_object, slide_duration) {
        container.append('<div id="tistols-mods__zakrashivanie"></div>');

        const zakr_container = $('#tistols-mods__zakrashivanie');

        let integrated_auto_code = "<!--SL10 - Модификация для Тильды. Слайдер из миниатюр с прогресс-баром https://mod.tistols.com/mini-slider --><script src='https://mods.tistols.com/mods/mini-slider/mini-slider.js'></script><script>initGenerated(`"+generated_object+"`, "+ slide_duration +")</script>";

        let integrated_code = `<!--SL10 - Модификация для Тильды. Слайдер из миниатюр с прогресс-баром https://mod.tistols.com/mini-slider -->
<style>
.tistols-circle-svg {
  width: 130%; 
  height: 130%; 
}
.tistols-animated-circle {
    opacity: 0
}
.act .tistols-animated-circle {
    opacity: 1;
  stroke-dasharray: 251; 
  stroke-dashoffset: 251; 
  animation: tistolsfillCircle `+ slide_duration +`s linear forwards; 
}
.tistolsPicMS .tn-atom {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}
@keyframes tistolsfillCircle {
  to {
    stroke-dashoffset: 0;
  }
}

    
[class*="tistolsCircleTab"] {
    transform: scale(0.8);
    transition: all 0.1s linear;
}
 [class*="tistolsCircleTab"]:hover {
     transform: scale(1)
 }

    .act {
        transform: scale(1.1)!important
    }

    .fade {
        animation: fade 0.8s ease-out forwards !important;
    }
    
    @keyframes fade {
        0% {
            opacity: 0;
            transform: none
        }
        100% {
            opacity: 1;
            transform: none
        }
    }
</style>
<script>
var svg = \`<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position: absolute;top: 50%;left: 50%; transform: translate(-50%,-50%);">
        <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
    <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#00f" stroke-width="2"></circle>
</svg>\`;

function rgbToHex(rgb) {
    if (!rgb) return ""; 
    var rgbValues = rgb.match(/^rgb\\(\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*\\)$/);
    if (!rgbValues) return ""; 
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgbValues[1]) + hex(rgbValues[2]) + hex(rgbValues[3]);
}

function startAnimation(tabNumber) {
    var circle = $('.tistolsCircleTab' + tabNumber + ' .tistols-animated-circle');
    circle.css('stroke-dashoffset', circle.css('stroke-dasharray'));
}

function updateInfo(tabNumber) {
    var info = {`+ generated_object +`};

    if (info.hasOwnProperty(tabNumber)) {
        var data = info[tabNumber];

        $('.tistolsTitleMS .tn-atom').text(data.title);
        $('.tistolsPersonMS .tn-atom').text(data.person);
        $('.tistolsDescMS .tn-atom').text(data.decs);
        $('.tistolsPicMS .tn-atom').css('background-image', 'url(' + data.pic + ')'); 
        
        $('.tistolsTitleMS .tn-atom').addClass('fade');
        $('.tistolsPersonMS .tn-atom').addClass('fade');
        $('.tistolsDescMS .tn-atom').addClass('fade');
        $('.tistolsPicMS .tn-atom').addClass('fade');

        setTimeout(function() {
            $('.tistolsTitleMS .tn-atom').removeClass('fade');
            $('.tistolsPersonMS .tn-atom').removeClass('fade');
            $('.tistolsDescMS .tn-atom').removeClass('fade');
            $('.tistolsPicMS .tn-atom').removeClass('fade');
        }, 800);
    }
}

$(function() {
    var totalSlides = $('[class*="tistolsCircleTab"]').length

    $('[class*="tistolsCircleTab"]').each(function() {
        $(this).find('.tn-atom').append(svg);
        var circle = $(this).find('.tistols-animated-circle');
        var rgbColor = $(this).find('.tn-atom').css('background-color');
        var hexColor = rgbToHex(rgbColor);
        circle.attr('stroke', hexColor);
    });
    
    $('.tistolsCircleTab1').addClass('act');
    startAnimation(1);

    $('[class*="tistolsCircleTab"]').click(function() {
        $('[class*="tistolsCircleTab"]').removeClass('act');
        $(this).addClass('act');
        var tabNumber = parseInt($(this).attr('class').split(' ').find(c => c.startsWith('tistolsCircleTab')).match(/\\d+/)[0]);
        updateInfo(tabNumber);
    });

    $('.tistols-animated-circle').on('animationend', function() {
        var currentTab = parseInt($('.act').attr('class').split(' ').find(c => c.startsWith('tistolsCircleTab')).match(/\\d+/)[0]);
        var nextTab = (currentTab % totalSlides) + 1;
        $('[class*="tistolsCircleTab"]').removeClass('act');
        $('.tistolsCircleTab' + nextTab).addClass('act');
        startAnimation(nextTab);
        updateInfo(nextTab);
    });
});

</script>`;

        let code_to_copy = "";

        if ($('input[name="toggle"]:checked').val() == "true") {
            //zakr_container.html("<pre>" + integrated_code + "</pre>");
            code_to_copy = integrated_code;
        } else {
            //zakr_container.html("<pre>" + integrated_auto_code + "</pre>");
            code_to_copy = integrated_auto_code;
        }
        const copyContent = async () => {
            try {
                await navigator.clipboard.writeText(code_to_copy);
                console.log('Content copied to clipboard');

                $('#tm-generate-zakrashivanie').text('Код скопирован');
                setTimeout(() => {
                    $('#tm-generate-zakrashivanie').text('Скопировать код');
                }, 3000);
            } catch (err) {
                console.error('Failed to copy: ', err);

                $('#tm-generate-zakrashivanie').text('Не удалось скопировать');
                setTimeout(() => {
                    $('#tm-generate-zakrashivanie').text('Скопировать код');
                }, 3000);
            }
        }

        copyContent()
    }

    $('#tm-generate-zakrashivanie').click((e) => {
        const personms = $('input[name="tm-slide-personms[]"]')
            .map(function(){return $(this).val();}).get();
        const descms = $('input[name="tm-slide-descms[]"]')
            .map(function(){return $(this).val();}).get();
        const titlems = $('input[name="tm-slide-titlems[]"]')
            .map(function(){return $(this).val();}).get();
        const imgms = $('input[name="tm-slide-imgms[]"]')
            .map(function(){return $(this).val();}).get();
        const slide_duration = $('input[name="tm-slide-duration"]').val();

        let generated_object = [];

        personms.forEach((item, index) => {
            generated_object.push(`'` + parseInt(parseInt(index) + 1) + `': {'person': '`+ personms[index] +`', 'decs': '`+ descms[index] +`', 'title': '`+ titlems[index] +`', 'pic': '`+ imgms[index] +`'}`);
        });

        generate(generated_object, slide_duration);
    });

    $('#tm-add-image').click((e) => {
        let inputs_count = $('.tm-generator-inputbox').children().length;

        if (inputs_count < 10) {
            $('fieldset').last().after("<fieldset>" +
                "                <span class=\"delete-input-btn\">✖</span>\n" +
                "                <label class=\"tm-image-label\">\n" +
                "                    <span>Текст для класса .tistolsPersonMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
                "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-personms[]\">\n" +
                "                </label>\n" +
                "                <label class=\"tm-image-label\">\n" +
                "                    <span>Текст для класса .tistolsDescMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
                "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-descms[]\">\n" +
                "                </label>\n" +
                "                <label class=\"tm-image-label\">\n" +
                "                    <span>Текст для класса .tistolsTitleMS<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
                "                    <input type=\"text\" class=\"tm-input\" name=\"tm-slide-titlems[]\">\n" +
                "                </label>\n" +
                "                <label class=\"tm-image-label\">\n" +
                "                    <span>Ссылка на изображение<font color='crimson' title='Обязательное поле'>*</font>:</span>\n" +
                "                    <input type=\"url\" class=\"tm-input\" name=\"tm-slide-imgms[]\">\n" +
                "                </label>\n" +
                "</fieldset>");

            $('.delete-input-btn').click((e) => {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            })
        } else {
            $('#tistols-mods-generator').prepend("<div class='tistols-error-badge'>Достигнут лимит добавляемых cлайдов!</div>");
        }
    });
}

function initGenerated(generated_object, slide_duration) {
    let images_format = "";

    document.write(`<!--SL10 - Модификация для Тильды. Слайдер из миниатюр с прогресс-баром https://mod.tistols.com/mini-slider -->
<style>
.tistols-circle-svg {
  width: 130%; 
  height: 130%; 
}
.tistols-animated-circle {
    opacity: 0
}
.act .tistols-animated-circle {
    opacity: 1;
  stroke-dasharray: 251; 
  stroke-dashoffset: 251; 
  animation: tistolsfillCircle `+ slide_duration +`s linear forwards; 
}
.tistolsPicMS .tn-atom {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}
@keyframes tistolsfillCircle {
  to {
    stroke-dashoffset: 0;
  }
}

    
[class*="tistolsCircleTab"] {
    transform: scale(0.8);
    transition: all 0.1s linear;
}
 [class*="tistolsCircleTab"]:hover {
     transform: scale(1)
 }

    .act {
        transform: scale(1.1)!important
    }

    .fade {
        animation: fade 0.8s ease-out forwards !important;
    }
    
    @keyframes fade {
        0% {
            opacity: 0;
            transform: none
        }
        100% {
            opacity: 1;
            transform: none
        }
    }
</style>
<script>
var svg = \`<svg class="tistols-circle-svg" viewBox="0 0 100 100" style="position: absolute;top: 50%;left: 50%; transform: translate(-50%,-50%);">
        <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" stroke-width="2"></circle>
    <circle class="tistols-animated-circle" cx="50" cy="50" r="40" fill="none" stroke="#00f" stroke-width="2"></circle>
</svg>\`;

function rgbToHex(rgb) {
    if (!rgb) return ""; 
    var rgbValues = rgb.match(/^rgb\\(\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*\\)$/);
    if (!rgbValues) return ""; 
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgbValues[1]) + hex(rgbValues[2]) + hex(rgbValues[3]);
}

function startAnimation(tabNumber) {
    var circle = $('.tistolsCircleTab' + tabNumber + ' .tistols-animated-circle');
    circle.css('stroke-dashoffset', circle.css('stroke-dasharray'));
}

function updateInfo(tabNumber) {
    var info = {`+ generated_object +`};

    if (info.hasOwnProperty(tabNumber)) {
        var data = info[tabNumber];

        $('.tistolsTitleMS .tn-atom').text(data.title);
        $('.tistolsPersonMS .tn-atom').text(data.person);
        $('.tistolsDescMS .tn-atom').text(data.decs);
        $('.tistolsPicMS .tn-atom').css('background-image', 'url(' + data.pic + ')'); 
        
        $('.tistolsTitleMS .tn-atom').addClass('fade');
        $('.tistolsPersonMS .tn-atom').addClass('fade');
        $('.tistolsDescMS .tn-atom').addClass('fade');
        $('.tistolsPicMS .tn-atom').addClass('fade');

        setTimeout(function() {
            $('.tistolsTitleMS .tn-atom').removeClass('fade');
            $('.tistolsPersonMS .tn-atom').removeClass('fade');
            $('.tistolsDescMS .tn-atom').removeClass('fade');
            $('.tistolsPicMS .tn-atom').removeClass('fade');
        }, 800);
    }
}

$(function() {
    var totalSlides = $('[class*="tistolsCircleTab"]').length

    $('[class*="tistolsCircleTab"]').each(function() {
        $(this).find('.tn-atom').append(svg);
        var circle = $(this).find('.tistols-animated-circle');
        var rgbColor = $(this).find('.tn-atom').css('background-color');
        var hexColor = rgbToHex(rgbColor);
        circle.attr('stroke', hexColor);
    });
    
    $('.tistolsCircleTab1').addClass('act');
    startAnimation(1);

    $('[class*="tistolsCircleTab"]').click(function() {
        $('[class*="tistolsCircleTab"]').removeClass('act');
        $(this).addClass('act');
        var tabNumber = parseInt($(this).attr('class').split(' ').find(c => c.startsWith('tistolsCircleTab')).match(/\\d+/)[0]);
        updateInfo(tabNumber);
    });

    $('.tistols-animated-circle').on('animationend', function() {
        var currentTab = parseInt($('.act').attr('class').split(' ').find(c => c.startsWith('tistolsCircleTab')).match(/\\d+/)[0]);
        var nextTab = (currentTab % totalSlides) + 1;
        $('[class*="tistolsCircleTab"]').removeClass('act');
        $('.tistolsCircleTab' + nextTab).addClass('act');
        startAnimation(nextTab);
        updateInfo(nextTab);
    });
});

</script>`);
}
