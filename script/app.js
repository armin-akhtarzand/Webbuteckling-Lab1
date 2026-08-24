const productButtons = document.querySelectorAll(".productButton");

productButtons.forEach((button) => {
    button.addEventListener("click", () =>{
        const name = button.dataset.name;
        alert(`Vara lagd i varukorg: KMP ${name}`);
    } )
})