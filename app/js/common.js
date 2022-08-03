$(document).ready(async function () {

    $(function () {
        $("input[name=phone]").mask("+7 (999) 999-99-99");
    });

    let popupLinkClassSelector = '.popup'
    let popupWindowClass = 'mfp_popup_window'

    $(popupLinkClassSelector).magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: popupWindowClass,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 600,
        zoom: {
            enabled: true,
            duration: 600
        },
    });
    //$.magnificPopup.open({items: {src: '#popup_form_small'}})

    //плавный скролл по странице

    $("a[href^='#'].scroll").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"}, $(_href).offset().top / 5, 'swing',);
        return false;
    });


    //отправка формы обратной связи
    $(".js_form_ajax_post").on('submit', function (event) {
        console.log($(this));
        $.ajax({
            url: "mailer.php", //url страницы
            type: "POST", //метод отправки
            dataType: "html", //формат данных
            data: $(this).serialize(),  // Сеарилизуем объект
            success: function () { //Данные отправлены успешно
                console.log('ajax sucсesfull');
                $("#js_popup_greeting").children(".js_popup_message_success").show();
                $("#js_popup_greeting").children(".js_popup_message_fail").hide();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                    ;
                }, 2000);
            },
            error: function () { // Данные не отправлены
                console.log('ajax error');
                $("#js_popup_greeting").children(".js_popup_message_success").hide();
                $("#js_popup_greeting").children(".js_popup_message_fail").show();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                        ;
                    }
                    , 2000);
            }
        });
        return false;
    });


    //jcarousel инициализация*************************************
    const CAROUSELITEM = "#carousel_n1 .carousel_frame";
    const CAROUSELBUTTONPREV = "#carousel_n1 .carousel__button.prev";
    const CAROUSELBUTTONNEXT = "#carousel_n1 .carousel__button.next";


    $(CAROUSELITEM).jcarousel({
        wrap: 'circular'
    });
    $(CAROUSELBUTTONPREV).click(function () {
        $(CAROUSELITEM).jcarousel('scroll', '-=1');
    });
    $(CAROUSELBUTTONNEXT).click(function () {
        $(CAROUSELITEM).jcarousel('scroll', '+=1');
    });
    $(CAROUSELITEM).swipe((direction) => {
            switch (direction) {
                case 'left':
                    $(CAROUSELITEM).jcarousel('scroll', '+=1');
                    break;
                case 'right':
                    $(CAROUSELITEM).jcarousel('scroll', '-=1');
                    break;
            }
        },
        {
            preventDefault: false,
            mouse: false,
            pen: true,
            distance: 50
        }
    );

    //radio trigger
    const s4Labels = document.querySelectorAll('.s4_label')
    const s4Radios = document.querySelectorAll('input[type=radio][name="about"]')
    const s4Items = document.querySelectorAll('.s4_item')
    s4Radios.forEach(r=>r.addEventListener('change', (e)=>{
        const idRadio = e.currentTarget.id;
        const valueRadio = e.currentTarget.value;
        s4Labels.forEach(l=>{
            l.classList.remove('active');
            if ( idRadio === l.attributes['for'].value){
                l.classList.add('active')
            }

        })
        s4Items.forEach(i=>{
            i.classList.remove('active');
            if ( valueRadio === i.dataset.tag){
                i.classList.add('active')
                $('#verticalCarousel').jcarousel('scroll', +valueRadio);
            }
        })
    }))
    $('#verticalCarousel').jcarousel({});

    console.log(' '.charCodeAt(0))
    console.log(' '.charCodeAt(0))

})



