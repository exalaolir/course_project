fetch('http://127.0.0.1:5501/main_page/js/information.json').then(function(response) {
    return response.json()
  }).then(function(json) {
    main(json);
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });

  function main(json){
    if(document.URL.includes("catalog.html")){
        renderCards(json);
        openModal(json);
    }
  }

  function renderCards(json){
    let cardContainer = document.getElementById('cards');
    let catalogElements = '';

    json.forEach( function(el) {
        let id = el.id,
            img = el.img,
            header = el.header;

        catalogElements +=
        '<li class="grid_card" id="' + id + '">'+
            '<img src="' + img + '" alt="img">'+
            '<h3>' + header + '</h3>'+
            '<input type="button" value="Забронировать" class="catalog_btn">'
        '</li>';  
    });

    const CARDLIST = 
    '<ul class="catalog_grid">' + catalogElements + '</ul>';

    cardContainer.innerHTML = CARDLIST;
  }

  function openModal(json){
    const button =document.getElementById('close');
    const modalWindow = document.getElementById('modal-window');
    const modalCard = document.getElementById('info_card');
    
    const cards = document.getElementsByClassName('grid_card');
    
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        const buyButton =element.getElementsByClassName('catalog_btn');
    
        element.addEventListener('click', function(event){
            let target = event.target;
            if(target == buyButton[0]) return;
            renderModalWindow(element.id, json);
            modalWindow.classList.add('model_open');
    
            button.addEventListener('click', function(){
                modalWindow.classList.remove('model_open');
            });
    
            modalWindow.addEventListener('click', function(event){
                let target = event.target.closest('.info-card');
                if(target == modalCard) return;
                modalWindow.classList.remove('model_open');
            });
        });
    }
  }

  function renderModalWindow(identify, json){
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
            description = el.description;

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
                            '<li id="country">' + country + '</li>'+
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
                    '<input type="button" value="Оформить билет" class="btn"' + id + 'id="sale_btn">'+
                '</div>'+
            '</div>'; 
        }
    });

    modalWindow.innerHTML = infoCard;
  }