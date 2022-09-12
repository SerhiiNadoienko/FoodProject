function forms() {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
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
            postData(' http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }
    this.fetch(' http://localhost:3000/menu')
    .then(data=>data.json())
    .then(res => console.log(res));
}

module.exports = forms;