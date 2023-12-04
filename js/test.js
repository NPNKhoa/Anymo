import { products } from "./data.js";

const newsProductContainer = document.getElementById("best-seller-container");
const flashSaleContainer = document.getElementById("flash-sale-container");

const sortedProductsBestSeller = products.sort((a, b) => b.saled - a.saled);
const sortedProductsBestSale = products.sort((a, b) => b.saleOff - a.saleOff);
const top3Products = sortedProductsBestSeller.slice(0, 3);
const topSaleProducts = sortedProductsBestSale.slice(0, 3);

top3Products.forEach((product) => {
  const productItem = document.createElement("div");
  productItem.className = "best-seller-items col-lg-3";

  const card = document.createElement("div");
  card.className = "card";

  const image = document.createElement("img");
  image.src = product.urlImg;
  image.alt = product.name;
  image.className = "card-img-top best-seller-img";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title best-seller-name";
  cardTitle.textContent = product.name;

  // Set a maximum height for the product name
  cardTitle.style.minHeight = "50px"; // Adjust the value as needed

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

/*
topSaleProducts.forEach((product) => {
  const productItem = document.createElement("div");
  productItem.className = "best-seller-items col-3";

  const card = document.createElement("div");
  card.className = "card";

  const image = document.createElement("img");
  image.src = product.urlImg;
  image.alt = product.name;
  image.className = "card-img-top best-seller-img";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title best-seller-name";
  cardTitle.textContent = product.name;

  // Set a maximum height for the product name
  cardTitle.style.minHeight = "50px"; // Adjust the value as needed

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

  flashSaleContainer.appendChild(productItem);
});
*/
