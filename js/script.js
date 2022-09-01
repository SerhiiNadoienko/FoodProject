window.addEventListener('DOMContentLoaded', ()=> {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParrent = document.querySelector('.tabheader__items');

    function hide() {
        tabsContent.forEach(i=> {
            i.classList.add('hide');
            i.classList.remove('show', 'fade');
        });
        tabs.forEach(i=> {
            i.classList.remove('tabheader__item_active');
        }); 
           
    }

    function show(i=0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hide();
    show();

    tabsParrent.addEventListener('click', (e)=> {
        const t=e.target;
        if(t && t.classList.contains('tabheader__item')) {
            tabs.forEach((item,  i)=> {
                if(t==item) {
                    hide();
                    show(i);
                }
            });
                
        
        }
    });

    //Timer 
     const deadLine = '2022-09-29';

     function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // Date.parse(endtime) - получим колво милисекунд которые задали
        //Date.parse(new Date() - отнимаем от текущей даты 
        //и теперь когда функция запускается  - мы в переменнкю t полуаем разницу между этими датами в милисекундах
        const t = Date.parse(endtime) - Date.parse(new Date());
        if( t<=0) {
            days=0;
            hours=0;
            minutes=0;
            seconds=0;
        } else {
            days = Math.floor(t /(1000*60 *60 *24));
             hours = Math.floor(( t/ (1000 * 60 * 60)) % 24);
             minutes =  Math.floor(( t / 1000 / 60) % 60 );
             seconds = Math.floor(( t / 1000)% 60);
        }

        return {
            'total' : t,
            'days': days,
            'hours':hours,
            'minutes': minutes,
            'seconds' : seconds
        };
     }

     function getZero(num) {
        if(num >=0 && num <10) {
            return `0${num}`;
        }else {
            return num;
        }
     }

     function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
             seconds= timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000); 
//вызываем updateClock для исправления бага в первую секунду.
             updateClock();

             function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds. innerHTML = getZero(t.seconds);

                if(t.total<=0) {
                    clearInterval(timeInterval);
                }
             }
     }
     setClock('.timer', deadLine);

     
    // Modal
    const openModal = document.querySelectorAll('[data-modal]');
    const closeModal =document.querySelector('[data-close]');
    const modalWindow =document.querySelector('.modal');
//function for opening modal window
    function open() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow ='hidden';
        clearInterval(timeModal);
    }
   openModal.forEach(btn=>{
    btn.addEventListener('click', ()=> {
        open();
    });
   });
   //for close 
   function close() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow ='';
   }

    closeModal.addEventListener('click', close);

    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow) {
            close();
            
        }
    });
    document.addEventListener('keydown',(e)=>{
        if(e.code === 'Escape' && modalWindow.classList.contains('show')) {
            close();
        }
    });

    /* const timeModal = setTimeout(open,40000); */
    
    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            open();
            removeEventListener('scroll',showModalByScroll);
        } 
    }
    window.addEventListener('scroll',showModalByScroll);

    //используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src =src;
            this.alt =alt;
            this.title=title;
            this.descr=descr;
            this.price=price;
            this.classes =classes;
            //здесь лежит дом элемент
            this.parent =document.querySelector(parentSelector);
            this.transfer=27;
            this.changeToUAH();
        } 

        changeToUAH() {
            this.price=this.price*this.transfer;
        }
//это метод который будет создавать верстку
        render() { 
            /* const element = document.createElement('div');
            if(this.classes.length ===0) {
                this.element ='menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className=>element.classList.add(className));
            }  */

            const element = document.createElement('div');
            if(this.classes.length===0) {
                const defoltClassName = 'menu__item';
                element.classList.add(defoltClassName);
            }else {
                this.classes.forEach(className=>element.classList.add(className));
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

    //тут создаем дивы уже 
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        2,
        ".menu .container",
        'menu__item',
        'big'
    ).render();
    
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        2,
        ".menu .container",
        'menu__item',
        'big'
    ).render();

     
});



