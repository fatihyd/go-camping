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

/* reviews */

let reviewsContainer = document.querySelector("#reviews-container");
let addReviewButton = document.querySelector("#add-review");
addReviewButton.addEventListener("click", addReviewButtonHandler);

function addReviewButtonHandler() {
    //
    let newReviewContainer = document.createElement("div");
    newReviewContainer.className = "new-review";
    let leftSideContainer = document.createElement("div");
    leftSideContainer.className = "left-side";
    let reviewInfoContainer = document.createElement("div");
    reviewInfoContainer.className = "review-info";
    newReviewContainer.append(leftSideContainer, reviewInfoContainer);

    // {name, rating, review, current_date}
    let nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");
    let userPicture = document.createElement("span");
    userPicture.className = "user-picture";
    leftSideContainer.appendChild(userPicture);

    let nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    nameLabel.style.fontWeight = "bold";
    nameLabel.setAttribute("for", "name-input")
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "name-input";
    nameContainer.append(nameLabel, nameInput);

    let ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");
    let ratingLabel = document.createElement("label");
    ratingLabel.textContent = "Rating";
    ratingLabel.style.fontWeight = "bold";
    ratingLabel.setAttribute("for", "rating-input")
    let ratingInput = document.createElement("input");
    ratingInput.type = "range";
    ratingInput.className = "rating-input";
    ratingInput.min = 0;
    ratingInput.max = 5;
    ratingInput.step = 0.5;
    ratingContainer.append(ratingLabel, ratingInput);

    let reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-container");
    let reviewLabel = document.createElement("label");
    reviewLabel.textContent = "Review";
    reviewLabel.style.fontWeight = "bold";
    reviewLabel.setAttribute("for", "review-input")
    let reviewInput = document.createElement("textarea");
    reviewInput.className = "review-input";
    reviewInput.rows = 4;
    reviewInput.cols = 10;
    reviewContainer.append(reviewLabel, reviewInput);

    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    reviewInfoContainer.append(nameContainer, ratingContainer, reviewContainer, saveButton, removeButton);

    reviewsContainer.appendChild(newReviewContainer);


    saveButton.addEventListener("click", () => saveButtonHandler(reviewInfoContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton));

    // necessary event handlers
    removeButton.addEventListener("click", () => removeButtonHandler(reviewInfoContainer));
}

function saveButtonHandler(reviewInfoContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton) {
    // user picture
    userPicture.textContent = nameInput.value.charAt(0).toUpperCase();
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    userPicture.style.backgroundColor = "#" + randomColor;

    // replace
    let nameInfo = document.createElement("p");
    nameInfo.textContent = nameInput.value;
    nameInput.parentNode.replaceChild(nameInfo, nameInput);
    // replace
    let ratingInfo = document.createElement("p");
    ratingInfo.textContent = ratingInput.value;
    ratingInput.parentNode.replaceChild(ratingInfo, ratingInput);
    // replace
    let reviewInfo = document.createElement("p");
    reviewInfo.textContent = reviewInput.value;
    reviewInput.parentNode.replaceChild(reviewInfo, reviewInput);
    // remove
    saveButton.remove();
    removeButton.remove();
}

function removeButtonHandler(reviewInfoContainer) {
    // remove
    reviewInfoContainer.remove();
}
