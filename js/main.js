import { products } from "./data.js";

function formatNumberToCurrency(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

const productContainer = document.getElementById("product-container");

function showProducts(products) {
  productContainer.innerHTML = ``;
  products.forEach((product) => {
    const itemProduct = document.createElement("div");
    itemProduct.className = "col";
    productContainer.appendChild(itemProduct);

    const likeItem = product.like
      ? `<div class="product-item__favourite">
          <i class="fa-solid fa-check"></i>
          <span>Yêu thích</span>
          </div>`
      : ``;

    const saleOff =
      product.saleOff > 0
        ? `<div class="product-item__sale-off">
          <span class="product-item__sale-off-percent">${product.saleOff}%</span>
          <div class="product-item__sale-off-lable">GIẢM</div>
          </div>`
        : ``;

    let starts = "";
    for (let i = 0; i < product.star; i++) {
      starts += `<i
              class="product-item__start--gold fa-solid fa-star"
            ></i>`;
    }

    for (let i = 0; i < 5 - product.star; i++) {
      starts += `</i>
            <i class="product-item__start fa-solid fa-star"></i>`;
    }

    itemProduct.innerHTML = `
                          <!-- Infor product -->
                    
                            <a href="iphone15-promax-512gb.html" class="product-itemm">
                              <div
                                class="product-item__img"
                                style="
                                  background-image: url(${product.urlImg});
                                "
                              ></div>
                              <h4 class="product-item__name">${
                                product.name
                              }</h4>
                              <div
                                class="product-item__price ${
                                  product.saleOff > 0
                                    ? `product-item__price--sale-off`
                                    : ``
                                }"
                              >
                                <span class="product-item__price-curent"
                                  >${formatNumberToCurrency(
                                    Math.round(
                                      (product.price *
                                        (100 - product.saleOff)) /
                                        100
                                    )
                                  )}</span
                                >
                                <span class="product-item__price-old">${formatNumberToCurrency(
                                  product.price
                                )}</span>
                              </div>
                              <div class="product-item__action">
                                <div class="product-item__rating">
                                  ${starts}
                                </div>
                                <span class="product-item__sold">${
                                  product.saled
                                } Đã bán</span>
                              </div>
                              ${likeItem}
                              ${saleOff}
                            </a>
          `;
  });
}

showProducts(products);

const title = document.getElementById("head-body__title");
const category = document.getElementById("category__list");
const sortOptions = document.getElementById("sort-option");

let newProducts = structuredClone(products);

category.addEventListener("click", function (e) {
  const categoryItem = e.target.closest("[data-value]");

  if (!categoryItem) return;

  category
    .querySelector(".catgory__item--active")
    ?.classList.remove("catgory__item--active");

  categoryItem.classList.add("catgory__item--active");

  const iphoneType = categoryItem.dataset.value;
  title.innerHTML = `IPHONE ${iphoneType == "all" ? "" : iphoneType} SERIES`;

  if (iphoneType != "all") {
    newProducts = products.filter((product) => product.type == iphoneType);
  } else {
    newProducts = structuredClone(products);
  }

  showProducts(newProducts);
});

sortOptions.addEventListener("change", function (e) {
  const option = e.target.value;

  if (!option) return;

  switch (option) {
    case "inc":
      newProducts.sort((a, b) => a.price - b.price);

      break;
    case "dec":
      newProducts.sort((a, b) => b.price - a.price);

      break;
    default:
      newProducts = structuredClone(products);
      break;
  }
  showProducts(newProducts);
});
