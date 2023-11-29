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

class Review {
    constructor(name, rating, review) {
        this.name = name;
        this.rating = rating;
        this.review = review;
    }
}

let reviews = [];
let reviewsContainers = [];

let reviewsContainer = document.querySelector("#reviews-container");
let addReviewButton = document.querySelector("#add-review");
addReviewButton.addEventListener("click", addReviewButtonHandler);
let showCommentsButton = document.createElement("button");
showCommentsButton.id = "show-comments";
showCommentsButton.textContent = "Show more comments";

function addReviewButtonHandler() {
    //
    let newReviewContainer = document.createElement("div");
    newReviewContainer.className = "new-review";
    let leftSideContainer = document.createElement("div");
    leftSideContainer.className = "left-side";
    let reviewInfoContainer = document.createElement("div");
    reviewInfoContainer.className = "review-info";
    newReviewContainer.append(leftSideContainer, reviewInfoContainer);

    // {name, rating, review}
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
    let ratingValue = document.createElement("p");
    ratingValue.className = "rating-value";
    ratingLabel.textContent = "Rating";
    ratingLabel.style.fontWeight = "bold";
    ratingLabel.setAttribute("for", "rating-input");
    let ratingInput = document.createElement("input");
    ratingInput.type = "range";
    ratingInput.className = "rating-input";
    ratingInput.min = 0;
    ratingInput.max = 5;
    ratingInput.step = 0.5;
    ratingValue.textContent = "Your rating: " + ratingInput.value;

    // Update the current slider value (each time you drag the slider handle)
    ratingInput.oninput = function () {
        ratingValue.textContent = "Your rating: " + this.value;
    }

    ratingContainer.append(ratingLabel, ratingValue, ratingInput);

    let reviewContainer = document.createElement("div");
    reviewContainer.classList.add("review-container");
    let reviewLabel = document.createElement("label");
    reviewLabel.textContent = "Review";
    reviewLabel.style.fontWeight = "bold";
    reviewLabel.setAttribute("for", "review-input")
    let reviewInput = document.createElement("textarea");
    reviewInput.className = "review-input";
    reviewInput.rows = 3;
    reviewInput.cols = 48;
    reviewContainer.append(reviewLabel, reviewInput);

    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    reviewInfoContainer.append(nameContainer, ratingContainer, reviewContainer, saveButton, removeButton);

    if (reviewsContainer.firstChild) {
        reviewsContainer.insertBefore(newReviewContainer, reviewsContainer.firstChild);
    } else {
        reviewsContainer.appendChild(newReviewContainer);
    }

    saveButton.addEventListener("click", () => saveButtonHandler(newReviewContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton));

    // necessary event handlers
    removeButton.addEventListener("click", () => removeButtonHandler(newReviewContainer));
}

function saveButtonHandler(newReviewContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton) {
    let review = new Review(nameInput.value, ratingInput.value, reviewInput.value);
    reviews.push(review);

    // user picture
    userPicture.textContent = nameInput.value.charAt(0).toUpperCase();
    userPicture.style.backgroundColor = getRandomColor();
    // replace
    let nameInfo = document.createElement("p");
    nameInfo.textContent = nameInput.value;
    nameInfo.style.fontWeight = "bold";
    nameInput.parentNode.replaceChild(nameInfo, nameInput);
    // replace
    let ratingInfo = document.createElement("p");

    let wholeNumbers = Math.floor(ratingInput.value);
    let halfNumbers = (ratingInput.value - wholeNumbers) * 2;
    for (let i = 0; i < wholeNumbers; i++) {
        let fullStar = document.createElement("i");
        fullStar.classList = "fa fa-star checked";
        ratingInfo.appendChild(fullStar);
    }
    for (let i = 0; i < halfNumbers; i++) {
        let halfStar = document.createElement("i");
        halfStar.classList = "fa fa-star-half-full";
        ratingInfo.appendChild(halfStar);
    }
    ratingInput.parentNode.replaceChild(ratingInfo, ratingInput);
    // replace
    let reviewInfo = document.createElement("p");
    reviewInfo.textContent = reviewInput.value;
    reviewInput.parentNode.replaceChild(reviewInfo, reviewInput);

    // remove
    saveButton.remove();
    removeButton.remove();

    //
    reviewsContainers.push(newReviewContainer);
    if (reviewsContainers.length > 3) {
        //check to see if this button exists...
        if (!document.querySelector("#show-comments")) {
            addReviewButton.insertAdjacentElement("afterend", showCommentsButton);
        }

        for (let i = 0; i < reviewsContainers.length; i++) {
            reviewsContainers[i].style.display = "none";
        }

        for (let i = 0; i < 3; i++) {
            reviewsContainers[reviewsContainers.length - 1 - i].style.display = "flex";
        }

        showCommentsButton.addEventListener("click", function () {
            for (let i = 0; i < reviewsContainers.length; i++) {
                reviewsContainers[i].style.display = "none";
            }

            for (let i = 0; i < reviewsContainers.length; i++) {
                reviewsContainers[i].style.display = "flex";
            }
            showCommentsButton.remove();
        })
    }

    // Remove labels and the rating value
    newReviewContainer.querySelector('label[for="name-input"]').remove();
    newReviewContainer.querySelector('label[for="rating-input"]').remove();
    newReviewContainer.querySelector('label[for="review-input"]').remove();
    newReviewContainer.querySelector('.rating-value').remove();
}

function removeButtonHandler(newReviewContainer) {
    // remove
    newReviewContainer.remove();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        // Generate a random index between 0 and 15, but not less than 8 to avoid light colors
        var randomIndex = Math.floor(Math.random() * 8) + 8;
        color += letters[randomIndex];
    }
    return color;
}

