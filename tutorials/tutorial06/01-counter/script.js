let count = 0;

const counter = document.querySelector("#counter");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");

function increment() {
    count++;
    updateDisplay();
};

function decrement() {
    count--;
    updateDisplay();
};

function reset() {
    count = 0;
    updateDisplay();    
};

function updateDisplay() {
    counter.textContent = count;
    if (count > 0) {
        counter.style.color = "green";
    } else if (count < 0) {
        counter.style.color = "red";
    } else {
        counter.style.color = "gray";
    }
}

incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", reset);

updateDisplay();