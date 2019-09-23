"use strict";
let menu = document.body.querySelector(".menu");
let iconHamburger = document.body.querySelector(".icon-hamburger");

function toggleClass() {
  menu.classList.toggle("menu_close");
  iconHamburger.classList.toggle("icon-hamburger_cross");
}

iconHamburger.addEventListener("click", toggleClass);