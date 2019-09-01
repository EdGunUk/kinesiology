"use strict";

let body = document.body;
let imagesArr = [].slice.call(body.querySelectorAll(".carusel-img"));
let imageHeight;

function resizeHeightCarusel() {
  imageHeight = imagesArr[0].offsetHeight;
  body.querySelector(".carusel").style.height = imageHeight + "px";
}

let gallery = body.querySelector(".carusel-gallery");

function resizeHeightGallery() {
  gallery.style.height = imageHeight * imagesArr.length + "px";
}

// ------------------------------------------------------------------ //

let statusBarItemArr = [];

function createStatusBarItem() {
  imagesArr.forEach(function() {
    let statusBarItem = document.createElement("s");
    statusBarItem.classList.add("carusel-status-bar-item");
    body.querySelector(".carusel-status-bar").appendChild(statusBarItem);

    statusBarItemArr.push(statusBarItem);
  });
}

function setColorAsVariable(color) {
  if(!!document.documentMode) {
    return "#" + color.slice(-3);
  }
  return " var(--" + color + ")";
}

let statusBarColor;
let counter = 0;

function chengeStatusBarColor() {
  statusBarColor = imagesArr[counter].dataset.statusBarColor;

  statusBarItemArr.forEach(function(item) {
    item.style.borderColor = setColorAsVariable(statusBarColor);
  });
}

function highlightStatusBarItem() {
  statusBarItemArr.forEach(function(item) {
    item.style.backgroundColor = "";
  });

  statusBarItemArr[counter].style.backgroundColor = setColorAsVariable(statusBarColor);
}

function chengeArrowsColor() {
  let arrowColor = imagesArr[counter].dataset.arrowColor;
  [].slice.call(body.querySelectorAll(".carusel-arrow-item")).forEach(function(item) {
    item.style.backgroundColor = setColorAsVariable(arrowColor);
  });
}

let caruselTexts = body.querySelectorAll(".carusel-text");

function showCaruselText() {
  caruselTexts[counter].style.opacity = "1";
}

function hideCaruselText() {
  caruselTexts[counter].style.opacity = "";
}

let timerDisappearCaruselText;
let runCaruselInterval = 10000;
let dalayAppearCaruselText = 1000;
let dalayDisappearCaruselText = runCaruselInterval - dalayAppearCaruselText;
let delaRunCarusel = dalayAppearCaruselText;

function delayCaruselText() {
  setTimeout(showCaruselText, dalayAppearCaruselText);
  timerDisappearCaruselText = setTimeout(
    function() {
      if(isFunction(clearTimerCaruselAndText)) {
        clearTimerCaruselAndText();
        return;
      }

      hideCaruselText();
    }, dalayDisappearCaruselText);
}

function chengeImage(resize) {
  if(resize === "resize") {
    gallery.style.WebkitTransitionDuration = "0s";
    gallery.style.transitionDuration = "0s";
  }
  
  let newPosition = imageHeight * counter;
  gallery.style.WebkitTransform = "translateY(" + (-newPosition) + "px)";
  gallery.style.transform = "translateY(" + (-newPosition) + "px)";
  
  setTimeout(function() {
    gallery.style.WebkitTransitionDuration = "";
    gallery.style.transitionDuration = "";
  }, 2000);
}

function runCarusel(direction) {
  if(direction === "normal") {
    counter++;
    if(counter >= imagesArr.length) counter = 0;
  }
  if(direction === "reverse") {
    counter--;
    if(counter < 0) counter = imagesArr.length - 1;
  }
  
  chengeStatusBarColor();
  highlightStatusBarItem();
  chengeArrowsColor();
  delayCaruselText();
  chengeImage();
}

let timerRunCarusel;

function runCaruselWithInterval() {
  timerRunCarusel = setTimeout(function() {
    if(isFunction(clearTimerCaruselAndText)) {
      clearTimerCaruselAndText();
      showCaruselText();
      return;
    }

    runCarusel("normal");
    runCaruselWithInterval();
  }, runCaruselInterval);
}

let clearTimerCaruselAndText;

function isFunction(func) {
  return typeof func === "function";
}

function stopCaruselWithInterval(timerDisappearCaruselText, timerRunCarusel) {
  return function() {
    clearTimeout(timerDisappearCaruselText);
    clearTimeout(timerRunCarusel);
    clearTimerCaruselAndText = null;
  };
}

function mouseoverCarusel() {
  clearTimerCaruselAndText = stopCaruselWithInterval(timerDisappearCaruselText, timerRunCarusel);
}

function mouseoutCarusel() {
  if(isFunction(clearTimerCaruselAndText)) {
    clearTimerCaruselAndText = null;
    return;
  }
  
  hideCaruselText();
  setTimeout(function() {
    runCarusel("normal");
    runCaruselWithInterval();
  }, delaRunCarusel);
}

function clickOnArrow(direction) {
  stopCaruselWithInterval(timerDisappearCaruselText, timerRunCarusel)();
  hideCaruselText();
  runCarusel(direction);
  runCaruselWithInterval();
}

// ------------------------------------------------------------------ //

function initialStartCarusel() {
  resizeHeightCarusel();
  resizeHeightGallery();
  createStatusBarItem();
  setTimeout(function() {
    chengeStatusBarColor();
    highlightStatusBarItem();
  }, 0);
  chengeArrowsColor();
  delayCaruselText();
  runCaruselWithInterval();
}

let arrowTop = body.querySelector(".carusel-arrow-top");
let arrowBottom = body.querySelector(".carusel-arrow-bottom");

function defineEvent() {
  window.addEventListener("resize", resizeHeightCarusel);
  window.addEventListener("resize", resizeHeightGallery);
  window.addEventListener("resize",
    function() {
      chengeImage("resize");
    });

  gallery.addEventListener("mouseover", mouseoverCarusel);
  gallery.addEventListener("mouseout", mouseoutCarusel);

  arrowTop.addEventListener("click",
    function() {
      clickOnArrow("reverse");
    });

  arrowBottom.addEventListener("click",
    function() {
      clickOnArrow("normal");
    });
}

initialStartCarusel();
defineEvent();