const productButtons = document.querySelectorAll(".productButton");
const productItem = {};

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".prod, .featured-prod");
    const quantityInput = product.querySelector(".quantity");
    const quantity = Number(quantityInput.value);
    const name = button.dataset.name;

    if (productItem[name]) {
      productItem[name] += quantity;
    } else {
      productItem[name] = quantity;
    }

    renderCart();

    console.log(productItem);
    alert(`Vara lagd i varukorg: KMP ${name}`);
  });
});

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
        <span>KMP ${item}</span>
        <span>${productItem[item]} st</span>
    </div>
`;
  }
}
