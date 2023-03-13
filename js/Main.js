let cartIcon = document.querySelector("#cartIcon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#closeCart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeBtn = document.getElementsByClassName("cartRemove");
  console.log(removeBtn);
  for (let i = 0; i < removeBtn.length; i++) {
    let button = removeBtn[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInput = document.getElementsByClassName("cartQty");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  let addCart = document.getElementsByClassName("addCart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  document
    .getElementsByClassName("buyBtn")[0]
    .addEventListener("click", buyBtnClicked);
}

function buyBtnClicked() {
  alert("Your Order Is Placed");
  var cartContent = document.getElementsByClassName("cartContent")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  let buttonClick = event.target;
  buttonClick.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("productTitle")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("productImg")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cartBox");
  var cartItems = document.getElementsByClassName("cartContent")[0];
  var cartItemsNames = document.getElementsByClassName("cartProductTitle");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have alredy add this item to cart");
      return;
    }
  }
  var cartBoxContent = `<div class="cartImg">
  <img src="${productImg}" alt="">
  </div>
  <div class="detailsBox">
    <div class="cartProductTitle">${title}</div>
    <div class="cartPrice">${price}</div>
    <input type="number" value="1" class="cartQty">
  </div>
  <i class="fa-solid fa-trash cartRemove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cartRemove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cartQty")[0]
    .addEventListener("change", quantityChanged);
}

// cartShopBox.innerHTML = cartBoxContent;
// cartItems.append(cartShopBox);
// cartShopBox.getElementsByClassName("cartRemove")[0].addEventListener("click", removeCartItem);
// cartShopBox.getElementsByClassName("cartQty")[0].addEventListener("change", quantityChanged);

function updateTotal() {
  let cartContent = document.getElementsByClassName("cartContent")[0];
  let cartBoxes = document.getElementsByClassName("cartBox");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cartPrice")[0];
    let quantityElement = cartBox.getElementsByClassName("cartQty")[0];
    // console.log(quantityElement.value)
    let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("totalPrice")[0].innerHTML = "₹ " + total;
}
