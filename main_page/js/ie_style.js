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