const productList = document.getElementById("productList");
const featuredProductList = document.getElementById("featuredProductList");
const getData = async () => {
  try {
    const response = await fetch("./json/products.json");
    if (!response.ok) {
      console.error("Fel från servern " + response.status);
    }

    const products = await response.json();
    renderProducts(products);
    renderFeaturedProducts(products);
  } catch (error) {
    console.error("Fel: ", error);
  }
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("prod");
    const name = document.createElement("h3");
    name.textContent = product.name;
    const image = document.createElement("img");
    image.src = product.img;
    image.alt = product.imgAlt;
    const description = document.createElement("p");
    description.textContent = product.description;
    const voltage = document.createElement("p");
    voltage.textContent = product.voltage;

    const buySection = document.createElement("div");
    buySection.classList.add("buy-section");
    const quantity = document.createElement("input");
    quantity.classList.add("quantity");
    quantity.type = "number";
    quantity.value = "1";
    quantity.min = "1";
    quantity.ariaLabel = "Product quantity for " + product.name;
    const productButton = document.createElement("button");
    productButton.classList.add("productButton");
    productButton.dataset.name = product.name;
    productButton.textContent = "Lägg i varukorg";

    const price = document.createElement("p");

    if (product.oldPrice) {
      const oldPrice = document.createElement("span");
      oldPrice.classList.add("old-price");
      oldPrice.textContent = product.oldPrice;

      const newPrice = document.createElement("span");
      newPrice.classList.add("new-price");
      newPrice.textContent = product.price;

      price.appendChild(oldPrice);
      price.appendChild(newPrice);
    } else {
      price.textContent = product.price;
    }

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");

      if (product.badge === "REA") {
        badge.classList.add("sale");
      } else if (product.badge === "Nyhet") {
        badge.classList.add("new");
      } else if (product.badge === "Populär") {
        badge.classList.add("popular");
      }

      badge.textContent = product.badge;
      article.appendChild(badge);
    }

    productButton.addEventListener("click", () => {
      const productElement = productButton.closest(".prod");

      const quantityInput = productElement.querySelector(".quantity");
      const quantity = Number(quantityInput.value);
      const name = productButton.dataset.name;

      if (productItem[name]) {
        productItem[name] += quantity;
      } else {
        productItem[name] = quantity;
      }

      renderCart();

      alert(`Vara lagd i varukorg: ${name}`);
    });

    buySection.appendChild(quantity);
    buySection.appendChild(productButton);
    article.appendChild(name);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(voltage);
    article.appendChild(price);
    article.appendChild(buySection);
    productList.appendChild(article);
  });
};

// FÖR UTVALDA PRODUKTER I START

const renderFeaturedProducts = (products) => {
  products.forEach((product) => {

    if(!product.featured){
      return;
    }
    const article = document.createElement("article");
    article.classList.add("featured-prod");
    const name = document.createElement("h3");
    name.textContent = product.name;
    const image = document.createElement("img");
    image.src = product.img;
    image.alt = product.imgAlt;
    const description = document.createElement("p");
    description.textContent = product.description;
    const voltage = document.createElement("p");
    voltage.textContent = product.voltage;

    const buySection = document.createElement("div");
    buySection.classList.add("buy-section");
    const quantity = document.createElement("input");
    quantity.classList.add("quantity");
    quantity.type = "number";
    quantity.value = "1";
    quantity.min = "1";
    quantity.ariaLabel = "Product quantity for " + product.name;
    const productButton = document.createElement("button");
    productButton.classList.add("productButton");
    productButton.dataset.name = product.name;
    productButton.textContent = "Lägg i varukorg";

    const price = document.createElement("p");

    if (product.oldPrice) {
      const oldPrice = document.createElement("span");
      oldPrice.classList.add("old-price");
      oldPrice.textContent = product.oldPrice;

      const newPrice = document.createElement("span");
      newPrice.classList.add("new-price");
      newPrice.textContent = product.price;

      price.appendChild(oldPrice);
      price.appendChild(newPrice);
    } else {
      price.textContent = product.price;
    }

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");

      if (product.badge === "REA") {
        badge.classList.add("sale");
      } else if (product.badge === "Nyhet") {
        badge.classList.add("new");
      } else if (product.badge === "Populär") {
        badge.classList.add("popular");
      }

      badge.textContent = product.badge;
      article.appendChild(badge);
    }

    productButton.addEventListener("click", () => {
      const productElement = productButton.closest(".featured-prod");

      const quantityInput = productElement.querySelector(".quantity");
      const quantity = Number(quantityInput.value);
      const name = productButton.dataset.name;

      if (productItem[name]) {
        productItem[name] += quantity;
      } else {
        productItem[name] = quantity;
      }

      renderCart();

      alert(`Vara lagd i varukorg: ${name}`);
    });

    buySection.appendChild(quantity);
    buySection.appendChild(productButton);
    article.appendChild(name);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(voltage);
    article.appendChild(price);
    article.appendChild(buySection);
    featuredProductList.appendChild(article);
  });
};

getData();

const productButtons = document.querySelectorAll(".productButton");
const productItem = {};

function toggleCart() {
  cart.classList.toggle("hidden");
}
showCartButton.addEventListener("click", toggleCart);
closeCartButton.addEventListener("click", toggleCart);

const cartList = document.querySelector("#cartItems");
function renderCart() {
  cartList.innerHTML = "";

  for (const item in productItem) {
    cartList.innerHTML += `
    <div class="cart-item">
        <span>${item}</span>
        <span>${productItem[item]} st</span>
    </div>
`;
  }
}
