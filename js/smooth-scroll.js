"use strict";
let anchors = [].slice.call(document.body.querySelectorAll("a[href*='#']"));

// let animationTime = 10;
// let coeficientFrames = 10;

anchors.forEach(function(element) {
  element.addEventListener("click", function(event) {
    event.preventDefault();

    let appropriateElement = document.querySelector(element.getAttribute("href"));
    let coordY = window.pageYOffset 
    + appropriateElement.getBoundingClientRect().top 
    - getComputedStyle(document.body.querySelector(".header")).height.slice(0, -2) 
    - getComputedStyle(appropriateElement).marginTop.slice(0, -2);

    scrollTo(0, coordY);
  });
});
