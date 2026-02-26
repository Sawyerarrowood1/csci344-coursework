const products = [
    {
        name: "Laptop",
        price: 999.99,
        description: "High-performance laptop for work and play",
        category: "Electronics",
        inStock: true
    },
    {
        name: "Coffee Maker",
        price: 49.99,
        description: "Brew perfect coffee every morning",
        category: "Appliances",
        inStock: false
    },
    {
        name: "Desk Chair",
        price: 199.99,
        description: "Comfortable ergonomic chair",
        category: "furniture",
        inStock: true
    }
];

const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
const productInStock = document.querySelector("#productInStock");
