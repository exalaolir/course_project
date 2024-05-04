var hamb = document.querySelector("#hamb");
var popup = document.querySelector("#popup");
var body = document.body;
// При клике на иконку hamb вызываем ф-ию hambHandler
hamb.addEventListener("click", hambHandler);

// Выполняем действия при клике ..
function hambHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
}

// Здесь мы рендерим элементы в наш попап

// Для каждого элемента меню при клике вызываем ф-ию

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}
window.addEventListener('resize', function (e) {
  var width = document.body.clientWidth;
  if (width >= 992) {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
  }
});