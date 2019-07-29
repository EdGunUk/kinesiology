"use strict";
let body = document.body;
let imagesArr = [].slice.call(body.querySelectorAll(".carusel-img"));
let imageHeight;

function resizeHeightCarusel(){
  imageHeight = imagesArr[0].offsetHeight;
  body.querySelector(".carusel").style.height = imageHeight + "px";
}

let gallery = body.querySelector(".carusel-gallery");

function resizeHeightGallery() {
  gallery.style.height = imageHeight * imagesArr.length + "px";
}

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

function delayCaruselText() {
  setTimeout(showCaruselText, dalayAppearCaruselText);
  timerDisappearCaruselText = setTimeout(hideCaruselText, runCaruselInterval - dalayAppearCaruselText);
}

function chengeImage() {
  let newPosition = imageHeight * counter;
  gallery.style.transform = "translateY(" + (-newPosition) + "px)";
}

function runCarusel(direction) {
  hideCaruselText();

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
  timerRunCarusel = setTimeout(function run() {
    runCarusel("normal");
    timerRunCarusel = setTimeout(run, runCaruselInterval);
  }, runCaruselInterval);

  // timerRunCarusel = setInterval(function() {
  //   runCarusel("normal");
  // }, runCaruselInterval);
}

function stopCaruselWithInterval() {
  clearTimeout(timerRunCarusel);
  clearTimeout(timerDisappearCaruselText);
}

// -------------------------------------------------------------------- //

function initialStartCarusel() {
  resizeHeightCarusel();
  resizeHeightGallery();
  createStatusBarItem();
  chengeStatusBarColor();
  highlightStatusBarItem();
  chengeArrowsColor();
  delayCaruselText();
  runCaruselWithInterval();
 }

let arrowTop = body.querySelector(".carusel-arrow-top");
let arrowBottom = body.querySelector(".carusel-arrow-bottom");

function defineEvent() {
  window.addEventListener("resize", resizeHeightCarusel);
  window.addEventListener("resize", resizeHeightGallery);

  gallery.addEventListener("mouseout", runCaruselWithInterval);
  gallery.addEventListener("mouseover", stopCaruselWithInterval);

  arrowTop.addEventListener("click", function() {
    runCarusel("reverse");
  });
  arrowTop.addEventListener("mouseout", runCaruselWithInterval);
  arrowTop.addEventListener("mouseover", stopCaruselWithInterval);

  arrowBottom.addEventListener("click", function() {
    runCarusel("normal");
  });
  arrowBottom.addEventListener("mouseout", runCaruselWithInterval);
  arrowBottom.addEventListener("mouseover", stopCaruselWithInterval);
}

initialStartCarusel();
defineEvent();










