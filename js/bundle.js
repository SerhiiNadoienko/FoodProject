/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');
   
    
   
    let sex, height, weight, age, ratio;
    //проверки на локал стореж + ставим дефолтное значение
    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    function initLocalSettings(selector, activeClass) {
        const elements =document.querySelectorAll(selector);

        elements.forEach(e=> {
            e.classList.remove(activeClass); {
                if(e.getAttribute('id')===localStorage.getItem('sex')) {
                    e.classList.add(activeClass);
                }

                if(e.getAttribute('data-ratio')===localStorage.getItem('ratio')) {
                    e.classList.add(activeClass);
                }
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    //проверки на локал стореж + ставим дефолтное значение
    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        //если хотя бы чего то нет то заканчиваем
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }
        //если всё есть и это женщина то..(формула с сайта)
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();
    //функция по получению информации со статических элементов 
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        //вешаем на все элементы обработчик события
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });


    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            //проверка на что то кроме цифр
            if(input.value.match(/\D/g)) {
                input.style.border ='1px solid red';

            } else {
                input.style.border ='none';
    
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

//этот конструктор будет создаваться столько раз, сколько будет обьектов внутри массива который приедт из сервера.
    /* getResource('http://localhost:3000/menu')
    .then(data=> {
        data.forEach(({img, altimg, title, descr,price}) => {
            new MenuCard(img, altimg, title, descr,price, '.menu .container').render();
        });
    }); */

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data=> createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr,price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }

    /* axios.get('http://localhost:3000/menu')
        .then(data=>
            data.data.forEach(({img, altimg, title, descr,price}) => {
            new MenuCard(img, altimg, title, descr,price, '.menu .container').render();
        })); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formselector, modalTimerId) {
    const forms = document.querySelectorAll(formselector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

//отвечает за привязку постинга 
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
           
            const formData = new FormData(form);
//превращаем формдату в массив массивов, потом в классический обьект, а потом в json. Аналог перебора обьекта в обьект.
            const json = JSON.stringify(Object.fromEntries(formData.entries()));  
//это ссылка с реквестами с json-server. отправляем наш json на сервер
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests', json)
            .then(data=> {
                //data это данные из промимса(которые вернул сервер)
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
                form.reset();
            }).catch(()=> {
                showThanksModal(message.failure);
            }).finally(()=> {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
    /* this.fetch(' http://localhost:3000/menu')
    .then(data=>data.json())
    .then(res => console.log(res)); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
//когда ббудет вызываться эта функция - она не будет знать с кем будет работать
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
//когда ббудет вызываться эта функция - она не будет знать с кем будет работать
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId); 
    }
   
}

//modal
function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

modalTrigger.forEach(btn => {
    btn.addEventListener('click',()=> openModal(modalSelector, modalTimerId));
});



modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modalSelector);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { 
        closeModal(modalSelector);
    }
});




function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
    //получили чтобы поставить pos relative
    slider = document.querySelector(container),
    prev=document.querySelector(prewArrow),
    next=document.querySelector(nextArrow),
    //общее число картинок слайда
    total = document.querySelector(totalCounter),
    //акутальное число на слайде
    current = document.querySelector(currentCounter),
    //это наш главный враппер
    slidesWrapper = document.querySelector(wrapper),
    //получаем ширину окошка нашего главного вреппера
    width = window.getComputedStyle(slidesWrapper).width,
    //поле с нашими слайдерами
    slidesField = document.querySelector(field);

    
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function  tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

function hideTabContent() {
    
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
   

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//настраиваем наш запрос который отвечает за постинг данных
const postData =  async(url, data)=> {
    const res = await fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:data
    });
    //и трансформирует обьект в json
    return res.json();
};

//тут не будет вторым аргументом data, потому что мы ничего не отправляем, а только получаем.
const getResource =  async(url,)=> {
    //соответственно обьекта с настройками не будет. Мы просто делаем запрос,дожидаемся его окончания и трансформируем в обьект.
     const res = await fetch(url);
     
      if(!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
     return res.json();
 };









/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal',modalTimerId), 300000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    //сделали это что бы не привязываться жестко к обьектам, иначе будут баги.
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-10-02');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])( {
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prewArrow: '.offer__slider-prev',
        slide : '.offer__slide',
        totalCounter : '#total',
        currentCounter : '#current',
        wrapper : '.offer__slider-wrapper',
        field : ".offer__slider-inner"
    });
  


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map