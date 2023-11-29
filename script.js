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
/* 'Review' class to represent the submitted feedback */
class Review {
    constructor(name, rating, review) {
        this.name = name;
        this.rating = rating;
        this.review = review;
    }
}
/* Array of Review objects to store submitted feedback */
let reviews = [];
let reviewsContainers = [];
/* Gets the already existing elements in DOM */
let reviewsContainer = document.querySelector("#reviews-container");
let addReviewButton = document.querySelector("#add-review");
addReviewButton.addEventListener("click", addReviewButtonHandler);
/* Adds a button to show more comments */
let showReviewsButton = document.createElement("button");
showReviewsButton.id = "show-reviews";
showReviewsButton.textContent = "Show more reviews";

function addReviewButtonHandler() {
    /* Containers for the new review */
    let newReviewContainer = document.createElement("div");
    newReviewContainer.className = "new-review";
    let profileContainer = document.createElement("div");
    profileContainer.className = "user-profile";
    let reviewInfoContainer = document.createElement("div");
    reviewInfoContainer.className = "review-info";
    newReviewContainer.append(profileContainer, reviewInfoContainer);

    /* Containers for the user picture */
    let userPicture = document.createElement("span");
    userPicture.className = "user-picture";
    profileContainer.appendChild(userPicture);
    /* Containers for the name */
    let nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");
    let nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    nameLabel.style.fontWeight = "bold";
    nameLabel.setAttribute("for", "name-input")
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "name-input";
    nameContainer.append(nameLabel, nameInput);
    /* Containers for the rating */
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
    /* Updates the rating slider */
    ratingInput.oninput = function () {
        ratingValue.textContent = "Your rating: " + this.value;
    }
    ratingContainer.append(ratingLabel, ratingValue, ratingInput);
    /* Containers for the review */
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
    /* Adds the save and the remove buttons */
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    /* Adds all the information to the container */
    reviewInfoContainer.append(nameContainer, ratingContainer, reviewContainer, saveButton, removeButton);
    /* Adds the new review on top */
    if (reviewsContainer.firstChild) {
        reviewsContainer.insertBefore(newReviewContainer, reviewsContainer.firstChild);
    } else {
        reviewsContainer.appendChild(newReviewContainer);
    }
    /* Updates the save and the remove button */
    saveButton.addEventListener("click", () => saveButtonHandler(newReviewContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton));
    removeButton.addEventListener("click", () => removeButtonHandler(newReviewContainer));
}

function saveButtonHandler(newReviewContainer, userPicture, nameInput, ratingInput, reviewInput, saveButton, removeButton) {
    /* Creates and stores a new review */
    let review = new Review(nameInput.value, ratingInput.value, reviewInput.value);
    reviews.push(review);

    /* Updates the user picture */
    userPicture.textContent = nameInput.value.charAt(0).toUpperCase();
    userPicture.style.backgroundColor = getRandomColor();
    /* Updates the name */
    let nameInfo = document.createElement("p");
    nameInfo.textContent = nameInput.value;
    nameInfo.style.fontWeight = "bold";
    nameInput.parentNode.replaceChild(nameInfo, nameInput);
    newReviewContainer.querySelector('label[for="name-input"]').remove();
    /* Updates the rating */
    let ratingInfo = document.createElement("p");
    /* Changes the rating number into star icons */
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
    newReviewContainer.querySelector('label[for="rating-input"]').remove();
    newReviewContainer.querySelector('.rating-value').remove();
    /* Updates the review */
    let reviewInfo = document.createElement("p");
    reviewInfo.textContent = reviewInput.value;
    reviewInput.parentNode.replaceChild(reviewInfo, reviewInput);
    newReviewContainer.querySelector('label[for="review-input"]').remove();
    /* Removes the save and the remove buttons */
    saveButton.remove();
    removeButton.remove();
    /* Stores the new review container */
    reviewsContainers.push(newReviewContainer);
    /* Shows only 3 reviews */
    if (reviewsContainers.length > 3) {
        /* Checks to see if this button exists */
        if (!document.querySelector("#show-comments")) {
            addReviewButton.insertAdjacentElement("afterend", showReviewsButton);
        }

        for (let i = 0; i < reviewsContainers.length; i++) {
            reviewsContainers[i].style.display = "none";
        }

        for (let i = 0; i < 3; i++) {
            reviewsContainers[reviewsContainers.length - 1 - i].style.display = "flex";
        }

        showReviewsButton.addEventListener("click", function () {
            for (let i = 0; i < reviewsContainers.length; i++) {
                reviewsContainers[i].style.display = "none";
            }

            for (let i = 0; i < reviewsContainers.length; i++) {
                reviewsContainers[i].style.display = "flex";
            }
            showReviewsButton.remove();
        })
    }

}

function removeButtonHandler(newReviewContainer) {
    newReviewContainer.remove();
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        // Generate a random index between 0 and 15, but not less than 8 to avoid light colors
        let randomIndex = Math.floor(Math.random() * 8) + 8;
        color += letters[randomIndex];
    }
    return color;
}
