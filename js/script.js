// Make a toggle search bar when click the search icons
$(document).ready(function () {
  $(".search-button").click(function () {
    $(".search-input").toggle("slide");
    $(".nav.login-menu").toggleClass("shift-left");
  });
});

// changeImageforproduct
$(() => {
  $(".small-img").click(function () {
    let imgPath = $(this).attr("src");
    $("#main-img").attr("src", imgPath);
  });
});

// Cai Dat Gio Hang

var ItemList = {
  IP11: {
    photo: "image/iphone-11-64gb-650x650.webp",
    name: "Iphone 11 - 64GB",
    price: 10990000,
  },
};

function addToLocalStorage(code) {
  let number = parseInt(document.getElementById("quantity").value);
  if (typeof localStorage[code] == "undefined") {
    window.localStorage.setItem(code, number);
  } else {
    let total = number + parseInt(window.localStorage.getItem(code));
    window.localStorage.setItem(code, total);
  }
}

let cart_button = document.querySelector(".fa-solid.fa-cart-shopping");

cart_button.addEventListener("click", function () {
  window.location.href = "cart.html";
});

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function ShowCart() {
  document
    .getElementById("cart-list-product")
    .getElementsByTagName("tbody")[0].innerHTML = "";

  let totalPrice = 0;

  for (const key in window.localStorage) {
    let name = ItemList[key].name;
    let price = ItemList[key].price;
    let photo = ItemList[key].photo;
    let orderNumber = localStorage.getItem(key);

    let tr = document.createElement("tr");

    let td_img = document.createElement("td");
    td_img.innerHTML =
      "<img src='"+ photo +"' class='cart-list-product-img'>";
    tr.appendChild(td_img);

    let td_name = document.createElement("td");
    td_name.innerText = name;
    tr.appendChild(td_name);

    let td_num = document.createElement("td");
    td_num.innerText = orderNumber;
    tr.appendChild(td_num);

    let td_price = document.createElement("td");
    td_price.innerText = VND.format(price);
    tr.appendChild(td_price);

    let td_total = document.createElement("td");
    let total = parseInt(price) * parseInt(orderNumber);
    total = VND.format(total);
    td_total.innerText = total;
    tr.appendChild(td_total);

    let td_del = document.createElement("td");
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("data-code", key);
    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-trash icon-pink");
    td_del.setAttribute("class", "center-align");
    a.appendChild(i);
    td_del.appendChild(a);
    tr.appendChild(td_del);
    a.onclick = () => removeCart(key);

    let tbody = document.querySelector("#cart-list-product tbody");
    tbody.appendChild(tr);

    totalPrice = totalPrice + price * orderNumber;
    let l = document.querySelectorAll("#cart-list-product tfoot span");
    l[0].textContent = VND.format(totalPrice);
    kiemtra = 1;
  }
}

function Order() {
  var hoten = document.getElementById("customer-name").value;
  var sdt = document.getElementById("customer-phone").value;
  var diachi = document.getElementById("customer-address").value;
  var ttdh = new Array(hoten, sdt, diachi);

  sessionStorage.setItem("ttdh", JSON.stringify(ttdh));

  console.log(ttdh);
  if (hoten == "") {
    alert("Vui lòng nhập tên khách hàng.");
  }else if(sdt == ""){
      alert("Vui lòng nhập số điện thoại khách hàng.");
  }else if(diachi == ""){
    alert("Vui lòng nhập địa chỉ khách hàng");
  }else{
    alert("Đặt hàng thành công.");
  }
}

function removeCart(code) {
  if (window.localStorage[code]) {
    window.localStorage.removeItem(code);
    document
      .getElementById("cart-list-product")
      .getElementsByTagName("tbody")[0].innerHTML = "";
    ShowCart();
  }
}
  document.getElementById("cart-list-no-cart-img").style.display = "none";
  document.getElementById("cart-list-no-cart-msg").style.display = "none";
  document.getElementById("cart-list").style.display="block";
  window.onload = () => ShowCart();
  window.onstorage = function () {
    ShowCart();
  };

//end cart

// change button img

function changeImages(imageUrl) {
  // Change main image
  document.getElementById("main-img").src = imageUrl;

  // Change small images
  const smallImages = document.querySelectorAll(".small-img");
  smallImages.forEach((img) => img.classList.remove("active"));
  const selectedSmallImage = Array.from(smallImages).find(
    (img) => img.src === imageUrl
  );
  selectedSmallImage.classList.add("active");
}

// Function to handle next and previous buttons
function navigateImages(direction) {
  const smallImages = document.querySelectorAll(".small-img");
  const mainImage = document.getElementById("main-img");

  // Find the index of the current main image
  const currentIndex = Array.from(smallImages).findIndex(
    (img) => img.src === mainImage.src
  );

  // Calculate the new index based on the direction
  let newIndex = currentIndex + direction;

  // Check if newIndex is within bounds
  if (newIndex < 0) {
    newIndex = smallImages.length - 1;
  } else if (newIndex >= smallImages.length) {
    newIndex = 0;
  }

  // Change both main and small images
  changeImages(smallImages[newIndex].src);
}

// Calculate the time until the next midnight
var now = new Date();
var midnight = new Date(now);
midnight.setHours(24, 0, 0, 0);
var timeUntilMidnight = midnight - now;

// Update the countdown every 1 second
var x = setInterval(function () {
  // Get the current date and time
  var currentTime = new Date();

  // Calculate the remaining time until the next midnight
  var distance = midnight - currentTime;

  // Ensure the distance is non-negative
  if (distance < 0) {
    clearInterval(x);
    $("#countdown").html('<div class="display-4 text-danger">EXPIRED</div>');
    return; // exit the function if the countdown is over
  }

  // Calculate hours, minutes, and seconds
  var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  $("#hours").text(hours < 10 ? "0" + hours : hours);
  $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
  $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
}, 1000);
