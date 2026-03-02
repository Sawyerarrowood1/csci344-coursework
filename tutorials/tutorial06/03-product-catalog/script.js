const products = [
  {
    name: "Laptop",
    price: 999.99,
    description: "High performance laptop.",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Sofa",
    price: 499.99,
    description: "Comfortable 3-seat sofa.",
    category: "Furniture",
    inStock: false
  },
  {
    name: "Microwave",
    price: 149.99,
    description: "Compact kitchen microwave.",
    category: "Appliances",
    inStock: true
  }
];

const productGrid = document.getElementById("productGrid");
const productForm = document.getElementById("productForm");

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <h2>${product.name}</h2>
      <div class="price">${formatPrice(product.price)}</div>
      <p class="description">${product.description}</p>
      <span class="category">${product.category}</span>
      ${
        product.inStock
          ? `<span class="stock-status in-stock">In Stock</span>`
          : `<span class="stock-status out-of-stock">Out of Stock</span>`
      }
    </div>
  `;
}

function renderProducts() {
  productGrid.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const productHTML = createProductCard(products[i]);
    productGrid.innerHTML += productHTML;
  }
}

function addItemToList(event) {
  event.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const description = document.getElementById("productDescription").value.trim();
  const category = document.getElementById("productCategory").value;
  const inStock = document.getElementById("productInStock").checked;

  const newProduct = {
    name: name,
    price: price,
    description: description,
    category: category,
    inStock: inStock
  };

  products.push(newProduct);

  renderProducts();
  productForm.reset();
}

productForm.addEventListener("submit", addItemToList);

renderProducts();