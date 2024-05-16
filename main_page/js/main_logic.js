let json;
let parsedJson = [];

fetch('http://127.0.0.1:5501/main_page/js/information.json').then(function(response) {//получаем данные с json файла с помощью fetch запроса. Тк. feth -- асинхронный запрос, используется promis
    return response.json()
  }).then(function(json) {
    main(json); //Вызываем функцию main и передаём в неё массив обектов
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });


  function main(json){
    parsedJson = json;
    if(document.URL.includes("catalog.html")){
        renderCards(json);
        initialiseSearch(json);
        addSortListener(json);
    }
    if(document.URL.includes("form.html")){
        renderBasketFilm(json);
    }
  }

  function renderBasketFilm(json){
    // отрисовка корзины
    let basketContainer = document.getElementById('info_card_film');
    let basketElements = '';
  
    json.forEach( function(el) {
        let id = el.id,
            saleId = el.saleId,
            header = el.header,
            date = el.date,
            time = el.time,
            director = el.director,
            country = el.country;

        if(localStorage.getItem("basketFilm") == saleId){
            basketElements +=
               '<div class="ifo-film-text">'+
                    '<div>'+
                        '<h1>Фильм</h1>'+
                        '<ul>'+
                            '<li id="name">' + header + '</li>'+
                            '<li id="date">' + date + '</li>'+
                            '<li id="time">' + time + '</li>'+
                            '<li id="country">' + country + '</li>'+
                            '<li id="director">' + director + '</li>'+
                        '</ul>'+
                        '<button type="button" value="" id="close" class="close close1">'+
                            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                                '<path d="M13.295 2.115C13.6844 1.72564 13.6844 1.09436 13.295 0.705V0.705C12.9056 0.315639 12.2744 0.315639 11.885 0.705L7.70711 4.88289C7.31658 5.27342 6.68342 5.27342 6.29289 4.88289L2.115 0.705C1.72564 0.315639 1.09436 0.315639 0.705 0.705V0.705C0.315639 1.09436 0.315639 1.72564 0.705 2.115L4.88289 6.29289C5.27342 6.68342 5.27342 7.31658 4.88289 7.70711L0.705 11.885C0.315639 12.2744 0.315639 12.9056 0.705 13.295V13.295C1.09436 13.6844 1.72564 13.6844 2.115 13.295L6.29289 9.11711C6.68342 8.72658 7.31658 8.72658 7.70711 9.11711L11.885 13.295C12.2744 13.6844 12.9056 13.6844 13.295 13.295V13.295C13.6844 12.9056 13.6844 12.2744 13.295 11.885L9.11711 7.70711C8.72658 7.31658 8.72658 6.68342 9.11711 6.29289L13.295 2.115Z"/>'+
                            '</svg>'+
                        '</button>'+
                    '</div>'+
                '</div>';  
        } 
    });

    basketContainer.innerHTML = basketElements;

    let btn = document.getElementsByClassName('close1');
    for (let index = 0; index < btn.length; index++) {
        const element = btn[index];
        element.addEventListener('click', function(){
            localStorage.removeItem('basketFilm');
            renderBasketFilm(json);
            localStorage.removeItem('isClick');
        });
    }
  }

  function renderCards(json){
    //Отрисовка карточек товаров
    let cardContainer = document.getElementById('cards'); //получаем контейнер для карточек
    let catalogElements = '';

    json.forEach( function(el) { //Перебираем массив объектов

        let id = el.id,
            saleId = el.saleId,
            img = el.img,
            header = el.header; //Разбиваем оюъект на отдельные составляющие

        catalogElements += //Прописываем код карточки товаров, подставляя значения ихзх массива. Для поддержки ie вместо шаблонных строк используем  конкатенацию
        '<li class="grid_card" id="' + id + '">'+
            '<img src="' + img + '" alt="img">'+
            '<h3>' + header + '</h3>'+
            '<input type="button" value="Забронировать" class="catalog_btn add_to_sale" id="'+ saleId + '">'
        '</li>';  
    });

    const CARDLIST = 
    '<ul class="catalog_grid">' + catalogElements + '</ul>';//Добавляем элементы списка  непосредственно внутрь самого списка

    cardContainer.innerHTML = CARDLIST; //Добавляем код списка в контейнер 

    openModal(json);
    saleListener(json);
  }

  function saleListener(json) {
    //Добавляем прослушиватель событий к кнопке бронирования фильма
    const SALEBTNS = document.getElementsByClassName('add_to_sale');
    const item = localStorage.getItem("isClick")
    for (let index = 0; index < SALEBTNS.length; index++) {
        const element = SALEBTNS[index];
        if(item == element.id){
            element.classList.add('remActiveBtn');
            element.value = "Отменить";
            element.addEventListener('click', function(){
                localStorage.removeItem('basketFilm');
                localStorage.removeItem('isClick');
                saleListener(json);
            });
        }
        else if(item){
            element.classList.add('nonActiveBtn');
        }
        if(!item){
            element.classList.remove('nonActiveBtn');
            element.classList.remove('remActiveBtn');
            element.value = "Забронировать";
            element.addEventListener('click', dd);
        }
    }
  }
  function disableButton(identify) {
    //Реализация механизма отключения кнопки выбора поле бронированяия фильма
    const SALEBTNS = document.getElementsByClassName('add_to_sale');

    for (let index = 0; index < SALEBTNS.length; index++) {
        const element = SALEBTNS[index];
        element.removeEventListener('click', dd);
        if(element.id != identify){
            element.classList.add('nonActiveBtn');
        }
        else{
            element.addEventListener('click', function(){
                localStorage.removeItem('basketFilm');
                localStorage.removeItem('isClick');
                saleListener(json);
            });
            localStorage.setItem("isClick", element.id);
            element.value = "Отменить";
            element.classList.add('remActiveBtn');
        }
    }
  }
  function dd(){
    let buttonId = this.id;
    localStorage.setItem("basketFilm", this.id);
    disableButton(buttonId);
    return buttonId;
}
  function openModal(json){
     //Открытие модального окна
    const modalWindow = document.getElementById('modal-window');
    const cards = document.getElementsByClassName('grid_card');
    
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        const buyButton =element.getElementsByClassName('catalog_btn');

        element.addEventListener('click', function(event){
            let target = event.target;
            if(target == buyButton[0]) return;
            renderModalWindow(element.id, json);
            modalWindow.classList.add('model_open');
            
            const button =document.getElementById('close');

            button.addEventListener('click', function(){
                modalWindow.classList.remove('model_open');
            });
    
            modalWindow.addEventListener('click', function(event){
                const modalCard = document.getElementById('info_card');
                let target = event.target.closest('.info-card');
                if(target == modalCard) return;
                modalWindow.classList.remove('model_open');
            });
        });
    }
  }

  function renderModalWindow(identify, json){
    //отрисовка модального окна
    let modalWindow = document.getElementById('modal-window');
    let infoCard = '';
    
    json.forEach( function(el) {
        let id = el.id,
            img = el.img,
            header = el.header,
            date = el.date,
            time = el.time,
            director = el.director,
            country = el.country,
            description = el.description,
            saleId = el.saleId;

        if(identify == id){
            infoCard +=
            '<div class="info-card" id="info_card">'+
                '<img src="' + img + '" alt="img">'+
                '<div class="ifo-film-text">'+
                    '<div>'+
                        '<h1>' + header + '</h1>'+
                        '<ul>'+
                            '<li id="name">' + header + '</li>'+
                            '<li id="date">' + date + '</li>'+
                            '<li id="time">' + time + '</li>'+
                            '<li id="director">' + director + '</li>'+
                            '<li id="country">' + country + '</li>'+
                            '<li id="description">' + description + '</li>'+
                        '</ul>'+
                        '<button type="button" value="" id="close" class="close">'+
                            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                                '<path d="M13.295 2.115C13.6844 1.72564 13.6844 1.09436 13.295 0.705V0.705C12.9056 0.315639 12.2744 0.315639 11.885 0.705L7.70711 4.88289C7.31658 5.27342 6.68342 5.27342 6.29289 4.88289L2.115 0.705C1.72564 0.315639 1.09436 0.315639 0.705 0.705V0.705C0.315639 1.09436 0.315639 1.72564 0.705 2.115L4.88289 6.29289C5.27342 6.68342 5.27342 7.31658 4.88289 7.70711L0.705 11.885C0.315639 12.2744 0.315639 12.9056 0.705 13.295V13.295C1.09436 13.6844 1.72564 13.6844 2.115 13.295L6.29289 9.11711C6.68342 8.72658 7.31658 8.72658 7.70711 9.11711L11.885 13.295C12.2744 13.6844 12.9056 13.6844 13.295 13.295V13.295C13.6844 12.9056 13.6844 12.2744 13.295 11.885L9.11711 7.70711C8.72658 7.31658 8.72658 6.68342 9.11711 6.29289L13.295 2.115Z"/>'+
                            '</svg>'+
                        '</button>'+
                    '</div>'+
                    '<input type="button" value="Оформить билет" class="catalog_btn add_to_sale " id ="' + saleId + '"/>'+
                '</div>'+
            '</div>'; 
        }
    });

    modalWindow.innerHTML = infoCard;

    const ITEMS = document.getElementsByClassName('add_to_sale');
    const item = localStorage.getItem("isClick")
    for (let index = 0; index < ITEMS.length; index++) {
        const element = ITEMS[index];
        if(item == element.id){
            element.classList.add('remActiveBtn');
            element.value = "Отменить";
            element.addEventListener('click', function(){
                localStorage.clear();
                saleListener(json);
            });
        }
        else if(item){
            element.classList.add('nonActiveBtn');
        }
        if(!item){
            element.classList.remove('nonActiveBtn');
            element.classList.remove('remActiveBtn');
            element.value = "Забронировать";
            element.addEventListener('click', dd);
        }
    }
  }

  function find(json, val){
    //реализация поиска
    let value = val.toLowerCase();
    let data = json;

    data = data.filter(function(n){
        return n.header.toLowerCase().startsWith(value);
    });
    renderCards(data);
  }

  function initialiseSearch(json){
    //прослушиватель событий поля поиска
    const SEARCHFIELD = document.getElementById('searchField');

    SEARCHFIELD.addEventListener('change', function(){
        find(json, this.value);
    });
    SEARCHFIELD.addEventListener('keyup', function(){
        find(json, this.value);
    });
}

function sortNew(json) {
    let massiv = json;
    massiv = massiv.filter(function(n){
        return n.isNew == true;
    })
    renderCards(massiv);
}

function sortPop(json) {
    let massiv = json;
    massiv = massiv.filter(function(n){
        return n.isPopular == true;
    })
    renderCards(massiv);
}

function sortFam(json) {
    let massiv = json;
    massiv = massiv.filter(function(n){
        return n.isFamily == true;
    })
    renderCards(massiv);
}

function addSortListener(json){
    const NEWBTN = document.getElementsByClassName('new_films_btn');
    const POPBTN = document.getElementsByClassName('popular_films_btn');
    const ALLFAMBTN = document.getElementsByClassName('all_family_btn');
    const ALLBTN = document.getElementsByClassName('all_btn');

    for (let index = 0; index < NEWBTN.length; index++) {
        const element = NEWBTN[index];
        
        element.addEventListener('click', function(){
            sortNew(json);
        });
    }
    for (let index = 0; index < POPBTN.length; index++) {
        const element = POPBTN[index];
        
        element.addEventListener('click', function(){
            sortPop(json);
        });
    }
    for (let index = 0; index < ALLFAMBTN.length; index++) {
        const element = ALLFAMBTN[index];
        
        element.addEventListener('click', function(){
            sortFam(json);
        });
    }
    for (let index = 0; index < ALLBTN.length; index++) {
        const element = ALLBTN[index];

        element.addEventListener('click', function(){
            renderCards(parsedJson);
        });
    }
}