function addTax(price) {
  return price * 1.07;
}

const addTax = (price) => {
    return price * 1.07;
}

---------

document.getElementById('show-name').addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    document.getElementById('output').textContent = name;
});

----------

const html = products
  .filter(p => p.inStock)
  .map(p => `<article class="product"><h3>${p.name}</h3><p>$${p.price}</p></article>`)
  .join('');

document.querySelector('#results').innerHTML += html;