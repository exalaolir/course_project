let dataParse;
fetch('http://127.0.0.1:5501/main_page/js/adresses.json').then(function(response) {
    return response.json()
  }).then(function(json) {
    mainf(json);
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });


  function mainf(json){
    if(document.URL.includes("form.html")){
        dataParse = json;
        renderBasketRoom(json);
    }
    else if(document.URL.includes("adress.html")){
        renderAdress(json);
        function isInternetExplorer() {
            return (
              window.navigator.userAgent.indexOf("MSIE ") > -1 ||
              window.navigator.userAgent.indexOf("Trident/") > -1
            );
        }
          function addStyle(array, style) {
            for (var index = 0; index < array.length; index++) {
              array[index].classList.add(style);
            }
          }
        
          if (isInternetExplorer() === true) {
            var elementsArray = document.getElementsByClassName('nav_link');
            addStyle(elementsArray, 'navbar_items');
            elementsArray = document.getElementsByClassName('about_item');
            addStyle(elementsArray, 'about_items_style');
            elementsArray = document.getElementsByTagName('footer');
            addStyle(elementsArray, 'foot_style');
            elementsArray = document.getElementsByClassName('adress-info');
            addStyle(elementsArray, 'adress_Text');
            elementsArray = document.getElementsByClassName('grid_card');
            addStyle(elementsArray, 'grid_card_ie');
          }
    }
  }
    
  

  function renderAdress(json){
    let adressContainer = document.getElementById('adress_container');
    let adressElements = '';

    json.forEach( function(el) {
        let id = el.id,
            img = el.img,
            header = el.header,
            people = el.people,
            adress = el.adress;

        adressElements +=
        '<li class="adress-card">' +
            '<img src="' + img + '" alt="img">' +
            '<div class="adress-info">'+
                '<div>'+
                    '<h2>' + header + '</h2>' +
                    '<ul>' +
                        '<li id="qantity">' + people + '</li>' +
                        '<li id="adressOfLocation">' + adress + '</li>' +
                    '</ul>' +
                '</div>' +
                '<input type="button" value="Арендовать" class="catalog_btn room_but" id="' + id +'">' +
            '</div>' +
        '</li>';
    });
    adressContainer.innerHTML = adressElements;

    addListenerRoom(json);
}
    function addListenerRoom(json){
        const ROOMBTNS = document.getElementsByClassName('room_but');
        const item = localStorage.getItem("isClickRoom")
        for (let index = 0; index < ROOMBTNS.length; index++) {
            const element = ROOMBTNS[index];
            if(item == element.id){
                element.classList.add('remActiveBtn');
                element.value = "Отменить";
                element.addEventListener('click', function(){
                    localStorage.removeItem('basketRoom');
                    localStorage.removeItem('isClickRoom');
                    addListenerRoom(dataParse);
                });
            }
            else if(item){
                element.classList.add('nonActiveBtn');
            }
            if(!item){
                element.classList.remove('nonActiveBtn');
                element.classList.remove('remActiveBtn');
                element.value = "Забронировать";
                element.addEventListener('click', dz);
            }
    }
    }
  function disableButtonRoom(identify) {
    const ROOMBTNS = document.getElementsByClassName('room_but');

    for (let index = 0; index < ROOMBTNS.length; index++) {
        const element = ROOMBTNS[index];
        element.removeEventListener('click', dz);
        if(element.id != identify){
            element.classList.add('nonActiveBtn');
        }
        else{
            element.addEventListener('click', function(){
                localStorage.removeItem('basketRoom');
                localStorage.removeItem('isClickRoom');
                addListenerRoom(dataParse);
            });
            localStorage.setItem("isClickRoom", element.id);
            element.value = "Отменить";
            element.classList.add('remActiveBtn');
        }
    }
  }
  function dz(){
    let buttonId = this.id;
    localStorage.setItem("basketRoom", this.id);
    disableButtonRoom(buttonId);
    return buttonId;
}

function renderBasketRoom(json){
    let basketContainerRoom = document.getElementById('info_card_room');
    let basketElementsRoom = '';
  
    json.forEach( function(el) {
        let id = el.id,
        people = el.people,
        adress = el.adress;

        if(localStorage.getItem("basketRoom") == id){
            basketElementsRoom +=
               '<div class="ifo-film-text">'+
                    '<div>'+
                        '<h1>Кинокомната</h1>'+
                        '<ul>'+
                            '<li id="name">' + people + '</li>'+
                            '<li id="date">' + adress + '</li>'+
                        '</ul>'+
                        '<button type="button" value="" id="close" class="close close2">'+
                            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                                '<path d="M13.295 2.115C13.6844 1.72564 13.6844 1.09436 13.295 0.705V0.705C12.9056 0.315639 12.2744 0.315639 11.885 0.705L7.70711 4.88289C7.31658 5.27342 6.68342 5.27342 6.29289 4.88289L2.115 0.705C1.72564 0.315639 1.09436 0.315639 0.705 0.705V0.705C0.315639 1.09436 0.315639 1.72564 0.705 2.115L4.88289 6.29289C5.27342 6.68342 5.27342 7.31658 4.88289 7.70711L0.705 11.885C0.315639 12.2744 0.315639 12.9056 0.705 13.295V13.295C1.09436 13.6844 1.72564 13.6844 2.115 13.295L6.29289 9.11711C6.68342 8.72658 7.31658 8.72658 7.70711 9.11711L11.885 13.295C12.2744 13.6844 12.9056 13.6844 13.295 13.295V13.295C13.6844 12.9056 13.6844 12.2744 13.295 11.885L9.11711 7.70711C8.72658 7.31658 8.72658 6.68342 9.11711 6.29289L13.295 2.115Z"/>'+
                            '</svg>'+
                        '</button>'+
                    '</div>'+
                '</div>';  
        } 
    });

    basketContainerRoom.innerHTML = basketElementsRoom;

    let btnn = document.getElementsByClassName('close2');
    for (let index = 0; index < btnn.length; index++) {
        const element = btnn[index];
        element.addEventListener('click', function(){
            localStorage.removeItem('basketRoom');
            renderBasketRoom(json)
            localStorage.removeItem('isClickRoom');
        });
    }
  }