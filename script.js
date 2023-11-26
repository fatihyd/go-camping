/* image gallery controls */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("gallery");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

let slideIndex = 1;
showSlides(slideIndex);

let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");

prevButton.addEventListener("click", function () {
    plusSlides(-1);
})
nextButton.addEventListener("click", function () {
    plusSlides(1);
})
