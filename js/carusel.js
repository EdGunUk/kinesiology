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

let statusBarColor;
let counter = 0;

function chengeStatusBarColor() {
  statusBarColor = imagesArr[counter].dataset.statusBarColor;
  statusBarItemArr.forEach(function(item) {
    item.style.borderColor = statusBarColor;
    item.style.boxShadow = "0 0 30px" + statusBarColor;
  });
}

function highlightStatusBarItem() {
  statusBarItemArr.forEach(function(item) {
    item.style.backgroundColor = "";
  });
  statusBarItemArr[counter].style.backgroundColor = statusBarColor;
}

function chengeArrowsColor() {
  let arrowColor = imagesArr[counter].dataset.arrowColor;
  [].slice.call(body.querySelectorAll(".carusel-arrow-item")).forEach(function(item) {
    item.style.backgroundColor = arrowColor;
    item.style.boxShadow = "0 0 10px" + arrowColor;
  });
}

function chengeImage() {
  let newPosition = imageHeight * counter;
  gallery.style.transform = "translateY(" + (-newPosition) + "px)";
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
  chengeImage();
}

let timerId;

function runCaruselWithInterval() {
  timerId = setInterval(function() {
    runCarusel("normal");
  }, 2000);
}

function stopCaruselWithInterval() {
  clearInterval(timerId);
}

// -------------------------------------------------------------------- //

function initialStartCarusel() {
  resizeHeightCarusel();
  resizeHeightGallery();
  createStatusBarItem();
  chengeStatusBarColor();
  highlightStatusBarItem();
  chengeArrowsColor();
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










