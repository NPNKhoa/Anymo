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

var cart = new Array();

function addToLocalStorage() {
  // Lấy tên sản phẩm từ thẻ HTML
  var productName = document.getElementById("productName").innerText;
  var img = document.getElementById("main-img").src;
  var capacity = document.getElementById("capacity").innerText;
  var color = document.getElementById("color-sp").innerText;
  var price = document.getElementById("price").innerText;
  var quantity = parseInt(document.getElementById("quantity").value);
  var product = new Array(img, productName, capacity, color, price, quantity);
  
  var kiemtra = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][1] == productName) {
      kiemtra = 1;
      quantity += parseInt(cart[i][5]);
      cart[i][5] = quantity;
      break;
    }
  }
  if (kiemtra == 0) {
    //them vao gio hang
    cart.push(product);
  }
  console.log(cart);
  ShowCount();

  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function ShowCart() {

  document
    .getElementById("cart-list-product")
    .getElementsByTagName("tbody")[0].innerHTML = "";
  
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    let tr = document.createElement("tr");
    let td_img = document.createElement("td");
    td_img.innerHTML =
      "<img src='"+ cart[i][0] +"' class='cart-list-product-img'>";
    tr.appendChild(td_img);

    let td_name = document.createElement("td");
    td_name.innerText = cart[i][1] + '-' + cart[i][2] + '-' + cart[i][3];
    tr.appendChild(td_name);

    let td_num = document.createElement("td");
    td_num.innerText = orderNumber;
    tr.appendChild(td_num);
  }
}

function dathang() {
  var hoten = document.getElementById("customer-name").value;
  var sdt = document.getElementById("customer-phone").value;
  var diachi = document.getElementById("customer-address").value;
  var ttdh = new Array(hoten, sdt, diachi);

  sessionStorage.setItem("ttdh", JSON.stringify(ttdh));

  console.log(ttdh);
  if( hoten == "" || sdt == "" || diachi == ""){
    alert("Vui lòng điền đầy đủ thông tin đặt hàng");
  }else{
    alert("Đặt hàng thành công");
  }
}


function ShowOrder() {
  var od = sessionStorage.getItem("ttdh");
  var ttdh = JSON.parse(od);
  var ttkh =
    '<form class="order-customer-detail">' +
    '<div class="order-customer-namephone">' +
    '<div class="order-customer-name">' +
    '<label for="cusName" class="order-customer-name-label">Họ và Tên:</label>' +
    "<span>" +
    ttdh[0] +
    "</span>" +
    "</div>" +
    '<div class="order-customer-phone">' +
    '<label for="cusPhone" class="order-customer-name-label">Số điện thoại:</label>' +
    "<span>" +
    ttdh[1] +
    "</span>" +
    "</div>" +
    "</div>" +
    '<h5 class="order-address">Địa chỉ nhận hàng</h5>' +
    '<div class="order-address--">' +
    '<div class="order-address--street">' +
    '<label for="cusStreet" class="order-customer-name-label">Số nhà, tên đường:</label>' +
    "<span>" +
    ttdh[2] +
    "</span>" +
    "</div>" +
    '<div class="order-address--ward">' +
    '<label for="cusWards" class="order-customer-name-label">Phường, Xã:</label>' +
    "<span>" +
    ttdh[3] +
    "</span>" +
    "</div>" +
    '<div class="order-address--district">' +
    '<label for="cusDistrict" class="order-customer-name-label">Quận, Huyện:</label>' +
    "<span>" +
    ttdh[4] +
    "</span>" +
    "</div>" +
    '<div class="order-address--province">' +
    '<label for="cusProvince" class="order-customer-name-label">Tỉnh, Thành phố:</label>' +
    "<span>" +
    ttdh[5] +
    "</span>" +
    "</div>" +
    "</div>" +
    "</form>";
  document.getElementById("order-customer").innerHTML = ttkh;
}

function thanhtien() {
  var gh = sessionStorage.getItem("cart");
  var cart = JSON.parse(gh);
  var tong = 0;
  for (let i = 0; i < cart.length; i++) {
    var tt = parseInt(cart[i][5]) * parseFloat(cart[i][4]);
    tong += tt;
  }

  var thanhtien =
    '<p class="cart-summary-total">Tổng cộng:</p>' +
    '<span class="cart-summary-sum">' +
    tong +
    "</span>";
  document.getElementById("thanhtien").innerHTML = thanhtien;
}

function XoaSP(x) {
  var li = x.parentElement;
  li.remove();


  // var name = document.getElementById("cart-item-head-name").innerText;
  // for (let i = 0; i < cart.length; i++) {
  //   if(cart[i][1] == name){
  //     cart.splice(i, 1);
  //   }
  // }
}

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
