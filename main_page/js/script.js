let menu_list = document.querySelector("#menu_list");
let hanburger = document.querySelector("#hanburger");
let body = document.body;

menu_list.addEventListener("click", function(){
  hanburger.classList.toggle("open");
  menu_list.classList.toggle("active");
  body.classList.toggle("noscroll");
});

window.addEventListener('resize', function () {
  let width = document.body.clientWidth;
  if (width >= 992) {
    hanburger.classList.remove("open");
    menu_list.classList.remove("active");
    body.classList.remove("noscroll");
  }
});