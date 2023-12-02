import { products } from "./data.js";

function formatNumberToCurrency(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

const productContainer = document.getElementById("product-container");

function createProductElement(product) {
  const itemProduct = document.createElement("div");
  itemProduct.className = "col";

  const link = document.createElement("a");
  link.href = product.url;
  link.className = "product-itemm";

  const image = document.createElement("div");
  image.className = "product-item__img";
  image.style.backgroundImage = `url(${product.urlImg})`;
  link.appendChild(image);

  const name = document.createElement("h4");
  name.className = "product-item__name";
  name.textContent = product.name;
  link.appendChild(name);

  const priceContainer = document.createElement("div");
  priceContainer.className = `product-item__price ${
    product.saleOff > 0 ? "product-item__price--sale-off" : ""
  }`;

  const priceCurrent = document.createElement("span");
  priceCurrent.className = "product-item__price-curent";
  priceCurrent.textContent = formatNumberToCurrency(
    Math.round((product.price * (100 - product.saleOff)) / 100)
  );
  priceContainer.appendChild(priceCurrent);

  const priceOld = document.createElement("span");
  priceOld.className = "product-item__price-old";
  priceOld.textContent = formatNumberToCurrency(product.price);
  priceContainer.appendChild(priceOld);

  link.appendChild(priceContainer);

  const actionContainer = document.createElement("div");
  actionContainer.className = "product-item__action";

  const rating = document.createElement("div");
  rating.className = "product-item__rating";
  for (let i = 0; i < product.star; i++) {
    const starGold = document.createElement("i");
    starGold.className = "product-item__start--gold fa-solid fa-star";
    rating.appendChild(starGold);
  }

  for (let i = 0; i < 5 - product.star; i++) {
    const star = document.createElement("i");
    star.className = "product-item__start fa-solid fa-star";
    rating.appendChild(star);
  }

  actionContainer.appendChild(rating);

  const sold = document.createElement("span");
  sold.className = "product-item__sold";
  sold.textContent = `${product.saled} Đã bán`;
  actionContainer.appendChild(sold);

  link.appendChild(actionContainer);

  if (product.like) {
    const likeItem = document.createElement("div");
    likeItem.className = "product-item__favourite";

    const checkIcon = document.createElement("i");
    checkIcon.className = "fa-solid fa-check";
    likeItem.appendChild(checkIcon);

    const span = document.createElement("span");
    span.textContent = "Yêu thích";
    likeItem.appendChild(span);

    link.appendChild(likeItem);
  }

  if (product.saleOff > 0) {
    const saleOffContainer = document.createElement("div");
    saleOffContainer.className = "product-item__sale-off";

    const saleOffPercent = document.createElement("span");
    saleOffPercent.className = "product-item__sale-off-percent";
    saleOffPercent.textContent = `${product.saleOff}%`;
    saleOffContainer.appendChild(saleOffPercent);

    const saleOffLabel = document.createElement("div");
    saleOffLabel.className = "product-item__sale-off-lable";
    saleOffLabel.textContent = "GIẢM";
    saleOffContainer.appendChild(saleOffLabel);

    link.appendChild(saleOffContainer);
  }

  itemProduct.appendChild(link);

  return itemProduct;
}

function showProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const itemProduct = createProductElement(product);
    productContainer.appendChild(itemProduct);
  });
}

showProducts(products);

const title = document.getElementById("head-body__title");
const category = document.getElementById("category__list");
const sortOptions = document.getElementById("sort-option");

let newProducts = [...products];

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
    newProducts = [...products];
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
      newProducts = [...products];
      break;
  }
  showProducts(newProducts);
});
