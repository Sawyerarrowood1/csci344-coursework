const items = ["Apple", "Banana", "Orange", "Grape", "Mango"];

const itemList = document.querySelector("#itemList");

function displayItems() {
    itemList.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        itemList.innerHTML += `<li>${items[i]}</li>`;
    }
}

displayItems();