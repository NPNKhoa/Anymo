// Make a toggle search bar when click the search icons
$(document).ready(function () {
  $("#searchButton").click(function () {
    $(".search-input").toggle("slide");
    // $(".nav.login-menu").toggleClass("shift-left");
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
      "<img src='" + photo + "' class='cart-list-product-img'>";
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
  } else if (sdt == "") {
    alert("Vui lòng nhập số điện thoại khách hàng.");
  } else if (diachi == "") {
    alert("Vui lòng nhập địa chỉ khách hàng");
  } else {
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
// document.getElementById("cart-list-no-cart-img").style.display = "none";
// document.getElementById("cart-list-no-cart-msg").style.display = "none";
// document.getElementById("cart-list").style.display="block";
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

// Begin REGISTER, check pass and phone number

function send() {
  // Grab the input values
  const phoneNumber = document.getElementById("phone-signup").value;
  const password = document.getElementById("password-signup").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Check phone number format
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    // Display error message for invalid phone number
    showErrorModal("Số điện thoại nhập vào không hợp lệ.");
    return;
  }

  // Check password length
  if (password.length < 8) {
    // Display error message for insufficient password length
    showErrorModal("Mật khẩu phải có ít nhất 8 ký tự.");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    // Display error message for mismatched passwords
    showErrorModal("Mật khẩu và Nhập lại mật khẩu không trùng khớp.");
    return;
  }

  // Success message
  showSuccessModal("Đăng ký thành công!");

  // Redirect to the homepage
  window.setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}

function showErrorModal(message) {
  // Display the overlay and modal
  document.getElementById("overlay").style.display = "block";
  document.getElementById("custom-modal").style.display = "block";

  // Set the error message and show the close button
  document.getElementById("modal-message").innerText = message;
  document.querySelector(".modal-close").style.display = "block";
}

function showSuccessModal(message) {
  // Display the overlay and modal
  document.getElementById("overlay").style.display = "block";
  document.getElementById("custom-modal").style.display = "block";

  // Set the success message and hide the close button
  document.getElementById("modal-message").innerText = message;
  document.querySelector(".modal-close").style.display = "none";
}

function closeModal() {
  // Hide the overlay and modal
  document.getElementById("overlay").style.display = "none";
  document.getElementById("custom-modal").style.display = "none";
}

// End REGISTER

// Begin LOGIN, check pass and phone number

function login() {
  const phoneInput = document.getElementById("phoneInput").value;
  const passwordInput = document.getElementById("passwordInput").value;

  // Check if the phone number has 10 digits
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneInput)) {
    showError("Số điện thoại hoặc mật khẩu sai.");
    return;
  }

  // Check if the password is at least 8 characters long
  if (passwordInput.length < 8) {
    showError("Số điện thoại hoặc mật khẩu sai.");
    return;
  }

  // Login successful
  showSuccess("Đăng nhập thành công.");

  // Redirect to the homepage after 2 seconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 300);
}

function showSuccess(message) {
  const messageElement = document.getElementById("message");
  messageElement.innerText = message;
  messageElement.style.color = "green";
}

function showError(message) {
  const messageElement = document.getElementById("message");
  messageElement.innerText = message;
  messageElement.style.color = "red";
}

// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

// End LOGIN
