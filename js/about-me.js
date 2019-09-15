"use strict";

let arrAboutMeGallery = [].slice.call(document.body.querySelectorAll(".about-me-gallery"));
let arrAboutMeGalleryHTML = [];

arrAboutMeGallery.forEach(element => {
  arrAboutMeGalleryHTML.push(element.innerHTML);
}); 

const pointsRebuildLayout = [992, 768, 576];

function searchExistingColumn(width, arrItem) {
  if(width === pointsRebuildLayout[0]) {
    return arrAboutMeGallery[arrItem].querySelectorAll(".about-me-column:not(.display-none-992-flex)");
  }
  
  if(width === pointsRebuildLayout[1]) {
    return arrAboutMeGallery[arrItem].querySelectorAll(".about-me-column:not(.display-none-992-flex):not(.display-none-768-flex)");
  }
  
  if(width === pointsRebuildLayout[2]) {
    return arrAboutMeGallery[arrItem].querySelectorAll(".about-me-column:not(.display-none-992-flex):not(.display-none-768-flex):not(.display-none-576-flex)");
  }
}

function searchItemInNonexistentColumn(width, arrItem) {
  return arrAboutMeGallery[arrItem].querySelectorAll(".display-none-" + width + "-flex .about-me-item");
}

function putItemInExistingColumn(arrExistingColumn, arrItemInNonexistentColumn) {
  let counter = 0;
  while (counter < arrItemInNonexistentColumn.length) {
    for(let i = 0; i < arrExistingColumn.length; i++) {

      if(counter >= arrItemInNonexistentColumn.length) break;
      arrExistingColumn[i].append(arrItemInNonexistentColumn[counter]);
      counter++;
    }
  }
}

function rebuildLayout(windowWidth) {
  for(let i = 0; i < arrAboutMeGallery.length; i++) {
    arrAboutMeGallery[i].innerHTML = arrAboutMeGalleryHTML[i];

    if(windowWidth < pointsRebuildLayout[0]) {
      putItemInExistingColumn(searchExistingColumn(pointsRebuildLayout[0], i), searchItemInNonexistentColumn(pointsRebuildLayout[0], i));
    }
    
    if(windowWidth < pointsRebuildLayout[1]) {
      putItemInExistingColumn(searchExistingColumn(pointsRebuildLayout[1], i), searchItemInNonexistentColumn(pointsRebuildLayout[1], i));
    }
    
    if(windowWidth < pointsRebuildLayout[2]) {
      putItemInExistingColumn(searchExistingColumn(pointsRebuildLayout[2], i), searchItemInNonexistentColumn(pointsRebuildLayout[2], i));
    }
  }
}

window.addEventListener("resize", function() {
  rebuildLayout(window.innerWidth);
});

rebuildLayout(window.innerWidth);