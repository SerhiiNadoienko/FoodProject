function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
    //получили чтобы поставить pos relative
    slider = document.querySelector('.offer__slider'),
    prev=document.querySelector('.offer__slider-prev'),
    next=document.querySelector('.offer__slider-next'),
    //общее число картинок слайда
    total = document.querySelector('#total'),
    //акутальное число на слайде
    current = document.querySelector('#current'),
    //это наш главный враппер
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //получаем ширину окошка нашего главного вреппера
    width = window.getComputedStyle(slidesWrapper).width,
    //поле с нашими слайдерами
    slidesField = document.querySelector(".offer__slider-inner");

    
    let slideIndex =1;
    //перменная которая показывает сколько мы отступили 
    let offset =0;

    //условия по общему показу колва слайдеров
    if(slides.length <10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = ` ${slides.length}`;
        current.textContent = slideIndex;
    }

    //устанавливаем этому блоку ширину  
    slidesField.style.width = 100 * slides.length + '%';
    //формируем в одну линию картинки
    slidesField.style.display = 'flex';
    slidesField.style.transition ='0.5s all';
    //убираем с зоны видимости элементы за пределами нашего элемента.
    slidesWrapper.style.overflow = 'hidden';
    //делаем все слайды одинаковой ширины 
    slides.forEach(slide=> {
        slide.style.width = width;
    });

    //теперь все абсолютно спозиционированные элементы будут ок
    slider.style.position = 'relative';

    //создаем и стилизуем большую обертку для точек
    const indicators = document.createElement('ol'),
        dots = [];
    //добавляем класс, которого нет в css для себя
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    //
    slider.append(indicators);
    //цикл закончится когда закончатся слайды
    for(let i=0; i<slides.length;i++) {
        //создаем точку как лист айтем
        const dot = document.createElement('li');
        //добавляем каждой точке атрибут с нумерацией, начиная с 1 
         dot.setAttribute('data-slide-to', i + 1);
         dot.style.cssText =`
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
         `;  
         //устанавливаем по дефолту чтобы горела первая кнопка.
         if(i==0) {
            dot.style.opacity = 1; 
         }
         indicators.append(dot);
         dots.push(dot);
    }

    function deleteNotDigits( str) {
        return +str.replace(/\D/g,'');
            
    }

    next.addEventListener('click', ()=> {
        //условие если уперлись в конец слайдера
        //в width у нас 500px, мы обрезали px 
        if(offset== deleteNotDigits(width) * (slides.length -1)) {
            offset =0;
        } else  {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        // тут меняем слайдиндекс 
        if(slideIndex == slides.length) {
            slideIndex =1;
        } else {
            slideIndex++;
        }
        

        //тут мняем показ акутального числа относительно слайд индекса
        if(slides.length <10) {
            current.textContent= `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot=>dot.style.opacity = '.5'); 
        dots[slideIndex -1].style.opacity =1;

    });

    prev.addEventListener('click', ()=> {
        //погда мы листаем назад и у нас первый слайд, перем. в конец
        if( offset == 0) {
            offset= deleteNotDigits(width) * (slides.length -1);
        } else  {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        // тут меняем слайдиндекс 
        if(slideIndex == 1) {
            slideIndex =slides.length;
        } else {
            slideIndex--;
        }
        //тут мняем показ акутального числа относительно слайд индекса
        if(slides.length <10) {
            current.textContent= `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot=>dot.style.opacity = '.5'); 
        dots[slideIndex -1].style.opacity =1;

        dots.forEach(dot=> {
            dot.addEventListener('click',(e)=> {
                const slideTo =e.target.getAttribute('data-slide-to');

                slideIndex=slideTo;
                offset= deleteNotDigits(width) * (slideTo -1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if(slides.length <10) {
                    current.textContent= `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot=>dot.style.opacity = '.5'); 
                dots[slideIndex -1].style.opacity =1;

            });
        });

    });

 
    //первый вариант слайдера
   /*  //инициализируем функцуию, которую прописали ниже.
    showSlides(slideIndex);
    
    //условия по общему показу колва слайдеров
    if(slides.length <10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = ` ${slides.length}`;
    }
    
    
    //фун по показу и скрытию слайдов. n=slideIndex
    function showSlides(n) {
        //если уперлись в конец слайдера, то ночинаем сначала
        if(n>slides.length) {
            slideIndex=1;
        }
        //если уперлись в начало слайдера.
        if(n<1){
            //то слайдиндекс будет равен концу.
            slideIndex = slides.length;
        }
        
        //тут скрываем все картики со слайдера
        slides.forEach(item=> item.style.display ='none');
        // -1 это нулевой слайд. Его мы показываем 
         slides[slideIndex -1].style.display ='block';  

        //тут меняем актуальное число слайдера
         if(slides.length <10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    
    
    //эта функция будет вызывать фунцуию showSlides и менять наш слайдИндекс. Ведь когда мы будем перелистывать слайд вперед - мы должны увеличивать на 1, когда назад, то уменьшать на 1.
    function plusSlides(n) {
        showSlides(slideIndex +=n);
    }

    //назначаем обработчики на стрелки
    prev.addEventListener('click', ()=> {
        plusSlides(-1);
    });

    next.addEventListener('click', ()=> {
        plusSlides(1);
    });
 */
}
module.exports = slider;