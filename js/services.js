"use strict";
let servicesContent = [].slice.call(document.body.querySelectorAll(".services-content"));

function rotateImg(event) {
  let coords = this.getBoundingClientRect();

  coords.halfHeight = coords.height / 2;
  coords.halfWidth = coords.width / 2;

  coords.mousseY = event.clientY - coords.top > 0 ? event.clientY - coords.top : 0;
  coords.mousseX = event.clientX - coords.left > 0 ? event.clientX - coords.left : 0;

  const coeficientDecrease = 20;

  let servicesContentImg = this.querySelector(".services-content__img");
  
  servicesContentImg.style.WebkitTransform = 
  "rotateX(" + (coords.halfHeight - coords.mousseY) / coeficientDecrease + "deg)" + 
  " rotateY(" + (coords.mousseX - coords.halfWidth) / coeficientDecrease + "deg)";
  
  servicesContentImg.style.transform = 
  "rotateX(" + (coords.halfHeight - coords.mousseY) / coeficientDecrease + "deg)" + 
  " rotateY(" + (coords.mousseX - coords.halfWidth) / coeficientDecrease + "deg)";
}

function cancelRotateImg() {
  let servicesContentImg = this.querySelector(".services-content__img");

  servicesContentImg.style.WebkitTransform = "rotateX(0deg)";
  servicesContentImg.style.transform = "rotateX(0deg)";
}

servicesContent.forEach(function(item) {
  item.addEventListener("mousemove", rotateImg);
  item.addEventListener("mouseout", cancelRotateImg);
});