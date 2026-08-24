const productButtons = document.querySelectorAll(".productButton");
const cart = {};

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".prod, .featured-prod");
    const quantityInput = product.querySelector(".quantity");
    const quantity = Number(quantityInput.value);
    const name = button.dataset.name;

    if (cart[name]) {
      cart[name] += quantity;
    } else {
      cart[name] = quantity;
    }

    console.log(cart);
    alert(`Vara lagd i varukorg: KMP ${name}`);
  });
});
