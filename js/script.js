// Make a toggle search bar when click the search icons
$(document).ready(function () {
  $(".search-button").click(function () {
    $(".search-input").toggle("slide");
    $(".nav.login-menu").toggleClass("shift-left");
  })
});

// changeImageforproduct
$(() => {
  $(".small-img").click(function() {
    let imgPath = $(this).attr("src");
    $("#main-img").attr("src",imgPath);
  })
});

// ThemvaoLocaStore
// var btn = document.getElementsByTagName(".btn-oder-full");

// for(let i = 0;i <= btn.length;i++){
//   btn[i].addEventListener("click",function(){
//     var hinh = btn[i].parentElement.childNodes[i].sr
//     var ten = btn[i].parentElement.childNodes[3].text;
//     var gia = btn[i].parentElement.childNodes[7].value;
//     alert("gia");
//   })
// };

var cart = new Array();

function addToLocalStorage(x) {
  // Lấy tên sản phẩm từ thẻ HTML
  var productName = document.getElementById("productName").innerText;
  var quantity = parseInt(document.getElementById("quantity").value);
  var img = document.getElementById("main-img").src;
  var capacity = document.getElementById("capacity").innerText;
  var color = document.getElementById("color-sp").innerText;
  var price = document.getElementById("price").innerText;
  var product = new Array(img, productName, capacity, color, price, quantity);
  
  //kiem tra gio hang
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
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

function ShowMycart() {
  var gh = sessionStorage.getItem("cart");
  var cart = JSON.parse(gh);
  var ttgh = "";
  for (let i = 0; i< cart.length; i++) {
    ttgh += '<li class="cart-item">' +
            '<img src="'+cart[i][0]+'" class="cart-img">' +
            '<div class="cart-item-info">' +
              '<div class="cart-item-head">' +
                '<div id="cart-item-head">' +
                  '<span class="cart-item-head-name" id="cart-item-head-name">'+cart[i][1]+'</span>' +
                  '<span> - </span>' +
                  '<span class="cart-item-head-capacity">'+cart[i][2]+'</span>' +
                  '<span> - </span>' +
                  '<span class="cart-item-head-color">'+cart[i][3]+'</span>' +
                '</div>' +     
                '<span class="cart-item-head-remove" onclick="XoaSP()">Xóa</span>' +
              '</div>' +
              '<div class="cart-item-body">' +
                '<span class="cart-item-body-price">'+cart[i][4]+'</span>' +
                '<div class="cart-item-wrap">' +
                  '<span class="cart-item-wrap-name">Số lượng:</span>' +
                  '<span class="cart-item-body-qnt">'+cart[i][5]+'</span>' +
                '</div>' + 
              '</div>' +
            '</div>' +
          '</li>';       
  }
  document.getElementById("mycart").innerHTML = ttgh;
}

function dathang() {
  var hoten = document.getElementById("name").value;
  var sdt = document.getElementById("phone").value;
  var duong = document.getElementById("street").value;
  var phuong = document.getElementById("wards").value;
  var quan = document.getElementById("district").value;
  var tinh = document.getElementById("province").value;
  var ttdh = new Array(hoten, sdt, duong, phuong, quan, tinh);

  sessionStorage.setItem("ttdh", JSON.stringify(ttdh));

  console.log(ttdh);
  alert("Đặt hàng thành công");
}

function ShowOrder() {
  var od = sessionStorage.getItem("ttdh");
  var ttdh = JSON.parse(od);
  var ttkh = '<form class="order-customer-detail">'+
            '<div class="order-customer-namephone">'+
              '<div class="order-customer-name">'+
                '<label for="cusName" class="order-customer-name-label">Họ và Tên:</label>'+
                '<span>'+ ttdh[0] +'</span>'+
              '</div>'+
              '<div class="order-customer-phone">'+
                '<label for="cusPhone" class="order-customer-name-label">Số điện thoại:</label>'+
                '<span>'+ ttdh[1] +'</span>'+
              '</div>'+
            '</div>'+
            '<h5 class="order-address">Địa chỉ nhận hàng</h5>'+
            '<div class="order-address--">'+
              '<div class="order-address--street">'+
                '<label for="cusStreet" class="order-customer-name-label">Số nhà, tên đường:</label>'+
                '<span>'+ ttdh[2] +'</span>'+
              '</div>'+
              '<div class="order-address--ward">'+
                '<label for="cusWards" class="order-customer-name-label">Phường, Xã:</label>'+
                '<span>'+ ttdh[3] +'</span>'+
              '</div>'+
              '<div class="order-address--district">'+
                '<label for="cusDistrict" class="order-customer-name-label">Quận, Huyện:</label>'+
                '<span>'+ ttdh[4] +'</span>'+
              '</div>'+
              '<div class="order-address--province">'+
                '<label for="cusProvince" class="order-customer-name-label">Tỉnh, Thành phố:</label>'+
                '<span>'+ ttdh[5] +'</span>'+
              '</div>'+
            '</div>'+
          '</form>';
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

  var thanhtien = '<p class="cart-summary-total">Tổng cộng:</p>'+
                  '<span class="cart-summary-sum">'+ tong +'</span>';
  document.getElementById("thanhtien").innerHTML = thanhtien;
}

function XoaSP() {
  var gh = sessionStorage.getItem("cart");
  var cart = JSON.parse(gh);
  var name = document.getElementById("cart-item-head-name").innerText;
  for (let i = 0; i < cart.length; i++) {
    if(cart[i][1] == name){
      cart.splice(i, 1);
    }
  }
  
}

ShowMycart();
thanhtien();


// change button img


function changeImages(imageUrl) {
  // Change main image
  document.getElementById('main-img').src = imageUrl;

  // Change small images
  const smallImages = document.querySelectorAll('.small-img');
  smallImages.forEach(img => img.classList.remove('active'));
  const selectedSmallImage = Array.from(smallImages).find(img => img.src === imageUrl);
  selectedSmallImage.classList.add('active');
}

// Function to handle next and previous buttons
function navigateImages(direction) {
  const smallImages = document.querySelectorAll('.small-img');
  const mainImage = document.getElementById('main-img');

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
