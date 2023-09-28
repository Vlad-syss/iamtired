//========================================================================================================================================================================
//====================================================--CART---====================================================================================================================
//========================================================================================================================================================================
//=================
function toggleCart() {
  const cartWrapper = document.querySelector(".cart__main_wrapper");
  const cartEmpty = document.querySelector("[data-empty]");
  const cartButton = document.querySelector(".cart__form_button");

  if (cartWrapper.children.length > 0) {
    cartEmpty.classList.add("none");
    cartButton.classList.remove("none");
  } else {
    cartEmpty.classList.remove("none");
    cartButton.classList.add("none");
  }
}
//=================
document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cartItems");

  const storedData = JSON.parse(localStorage.getItem("productData")) || {};

  for (const productId in storedData) {
    const product = storedData[productId];
    const cartItem = `<div data-id="${product.id}" class="cart__main_box">
                          <a href="productCard.html?productId=${product.id}" class="cart__main_img">
                            <img src="${product.image}" alt="alt" />
                          </a>
                          <div class="cart__main_info">
                            <a href="productCard.html?productId=${product.id}" class="cart__main_title">
                              ${product.name}
                            </a>
                            <ul class="productCard__about_list">
                              <li class="_icon-star"></li>
                              <li class="_icon-star"></li>
                              <li class="_icon-star"></li>
                              <li class="_icon-star"></li>
                              <li class="_icon-star"></li>
                            </ul>
                            <button type="button" class="catalog__control_short">
                              Type: <span>Long</span>
                              <i class="_icon-arrow-down"></i>
                            </button>
                            <div class="productCard__type_color">
                              <div class="productCard__type_currentColor">
                                <span class="a"></span>
                              </div>
                              <div class="productCard__type_currentColor">
                                <span class="b"></span>
                              </div>
                              <div class="productCard__type_currentColor">
                                <span class="c"></span>
                              </div>
                              <div class="productCard__type_currentColor">
                                <span class="d"></span>
                              </div>
                            </div>
                          </div>
                          <div class="cart__main_current">
                            <div class="productCard__type_equal">
                              <div
                                class="productCard__type_plus"
                                style="cursor: pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  data-action="plus-one"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10 5V10M10 10V15M10 10H15M10 10H5"
                                    stroke="#2F302C"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                              <p class="productCard__type_number">
                                Number: <span data-counter-one>${product.count}</span>
                              </p>
                              <div
                                class="productCard__type_minus"
                                style="cursor: pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  data-action="minus-one"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M15 10H5"
                                    stroke="#2F302C"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h3 class="cart__main_price">${product.price}</h3>
                          </div>
                        </div>
    `;

    cartItems.insertAdjacentHTML("beforeend", cartItem);
    toggleCart();
  }
});
//========================================================================================================================================================================
//====================================================COUNTER====================================================================================================================
//========================================================================================================================================================================
document.addEventListener("click", function (event) {
  if (event.target.dataset.action) {
    const action = event.target.dataset.action;
    const countWrapper = event.target.closest(".productCard__type_equal");
    const count = countWrapper.querySelector("[data-counter-one]");
    const cartWrapper = countWrapper.closest(".cart__main_box");
    const cartID = cartWrapper.dataset.id;

    if (action === "plus-one" && parseInt(count.innerText) < 20) {
      count.innerText++;
    }

    if (action === "minus-one" && parseInt(count.innerText) > 0) {
      count.innerText--;
    }
    if (parseInt(count.innerText) === 0) {
      removeFromCart(cartID);
      toggleCart();
    }
  }
});

function removeFromCart(productId) {
  const productData = JSON.parse(localStorage.getItem("productData")) || {};

  if (productData.hasOwnProperty(productId)) {
    delete productData[productId];

    localStorage.setItem("productData", JSON.stringify(productData));
  }

  const productToRemove = document.querySelector(`[data-id="${productId}"]`);
  if (productToRemove) {
    productToRemove.remove();
    // toggleCart();
  }
}
