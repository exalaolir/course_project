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
        modalWindow.classList.add('model_open');

        button.addEventListener('click', function(event){
            modalWindow.classList.remove('model_open');
        });

        modalWindow.addEventListener('click', function(event){
            let target = event.target.closest('.info-card');
            if(target == modalCard) return;
            modalWindow.classList.remove('model_open');
        });
    });
}