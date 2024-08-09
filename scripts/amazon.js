import { updateCartQuantity, addToCart, cart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

updateCartQuantity();
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProductsGrid() {
  let productsHTML = "";
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src= "${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      let matchingItem;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId: productId,
          quantity: quantity,
        });
      }
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      saveToStorage();
      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add("added-to-cart-visible");

      setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);

      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

      updateCartQuantity();
    });
  });
  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `amazon.html?search=${search}`;
  });
  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchTerm = document.querySelector(".js-search-bar").value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });
}
