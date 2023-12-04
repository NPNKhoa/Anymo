import { products } from "./data.js";

const newsProductContainer = document.getElementById("best-seller-container");
const sortedProductsBestSeller = products.sort((a, b) => b.saled - a.saled);
const top3Products = sortedProductsBestSeller.slice(0, 3);

top3Products.forEach((product) => {
  const productItem = document.createElement("div");
  productItem.className = "best-seller-items col-lg-3";

  const card = document.createElement("a");
  card.className = "card";
  card.href = product.url;

  const image = document.createElement("img");
  image.src = product.urlImg;
  image.alt = product.name;
  image.className = "card-img-top best-seller-img";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title best-seller-name";
  cardTitle.textContent = product.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text best-seller-cost";
  cardText.textContent = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  const soldText = document.createElement("p");
  soldText.className = "card-text best-seller-quantites";
  soldText.innerHTML = `Đã bán ${product.saled}`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(soldText);

  card.appendChild(image);
  card.appendChild(cardBody);

  productItem.appendChild(card);

  newsProductContainer.appendChild(productItem);
});

// Flash Sale
const flashSaleBody = document.getElementById("flash-sale-body");
const sortedProductsBestSale = products.sort((a, b) => b.saleOff - a.saleOff);
const topSaleProducts = sortedProductsBestSale.slice(0, 3);

topSaleProducts.forEach((product) => {
  const productItem = document.createElement("div");
  productItem.className = "best-sale-items col-lg-3";

  const card = document.createElement("a");
  card.className = "card";
  card.href = product.url;

  const img = document.createElement("img");
  img.src = product.urlImg;
  img.alt = product.name;
  img.className = "card-img-top";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title best-sale-name";
  cardTitle.textContent = product.name;

  const currentPrice = document.createElement("p");
  currentPrice.className = "card-text current-price";
  currentPrice.textContent = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Math.round((product.price * (100 - product.saleOff)) / 100));

  const oldPrice = document.createElement("p");
  oldPrice.className = "card-text old-price";
  oldPrice.textContent = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(currentPrice);
  cardBody.appendChild(oldPrice);

  card.appendChild(img);
  card.appendChild(cardBody);

  productItem.appendChild(card);

  flashSaleBody.appendChild(productItem);
});
