// Keeps track of which slide potition its on
let currentPosition = 0;

// Space between each slide
let gap = 10;

// Width of each slide
const slideWidth = 400;

// Function that moves the carousel forward and backward
function moveCarousel(direction) {

    // Select all elements with the class of "carousel-item"
    const items = document.querySelectorAll(".carousel-item");

    // If it is moving forward
    if (direction == "forward") {

        // Stop if its already at the last slide
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) {
            return false;
        }

        // Move to the next slide
        currentPosition++;
    } else {

        // If it is on the first slide, then it should stop
        if (currentPosition == 0) {
            return false;
        }
        // Move to the previous slide
        currentPosition--;
    }

    // Caluclate how far its going to need to shift the slides
    const offset = (slideWidth + gap) * currentPosition;

    // Move every slide left using the CSS transform function
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
