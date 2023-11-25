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

function addToLocalStorage() {
  // Lấy tên sản phẩm từ thẻ HTML
  var productName = document.getElementById("productName").innerText;
  var quantity = parseInt(document.getElementById("quantity").value);
  var img = document.getElementById("main-img").src;
  var capacity = document.getElementById("capacity").innerText;
  var color = document.getElementById("color-sp").innerText;
  var price = parseInt(document.getElementById("price").value);
  var product = new Array(img, productName, capacity, color, price, quantity);

  cart.push(product);




  // Kiểm tra xem Local Storage có sẵn không
  if (typeof(Storage) !== "undefined") {
      // Lấy giá trị hiện tại từ Local Storage
      var currentValue = localStorage.getItem(productName);
      // Kiểm tra xem sản phẩm đã tồn tại trong Local Storage chưa
      if (currentValue) {
          // Nếu sản phẩm đã tồn tại, tăng giá trị lên 1
          currentValue = parseInt(currentValue) + quantity;
      } else {
          // Nếu sản phẩm chưa tồn tại, đặt giá trị là 1
          currentValue = quantity;
      }

      // Lưu giá trị mới vào Local Storage, với key là productName
      sessionStorage.setItem("cart", JSON.stringify(cart));

      alert("Đã thêm vào giỏ hàng");
  } else {
      alert("Trình duyệt của bạn không hỗ trợ.");
  }
};

function ShowMycart() {
  var gh = sessionStorage.getItem("cart");
  var cart = JSON.parse(gh);
  var ttgh = "";
  var tong = 0;
  for (let i = 0; i< cart.length; i++) {
    var tt = cart[i][5] * cart[i][4];
    tong += tt;
    ttgh += '<li class="cart-item">' +
            '<img src="'+cart[i][0]+'" class="cart-img">' +
            '<div class="cart-item-info">' +
              '<div class="cart-item-head">' +
                '<div id="cart-item-head">' +
                  '<span class="cart-item-head-name">'+cart[i][1]+'</span>' +
                  '<span> - </span>' +
                  '<span class="cart-item-head-capacity">'+cart[i][2]+'</span>' +
                  '<span> - </span>' +
                  '<span class="cart-item-head-color">'+cart[i][3]+'</span>' +
                '</div>' +     
                '<span class="cart-item-head-remove">Xóa</span>' +
              '</div>' +
              '<div class="cart-item-body">' +
                '<span class="cart-item-body-price">'+cart[i][4]+'</span>' +
                '<div class="cart-item-wrap">' +
                  '<button class="cart-item-body-minus">-</button>' +
                  '<span class="cart-item-body-qnt">'+cart[i][5]+'</span>' +
                  '<button class="cart-item-body-plus">+</button>' +
                '</div>' + 
              '</div>' +
            '</div>' +
          '</li>';       
  }
  ttgh = '<div class="cart-list-summary">' +
        '<div>' +
          '<p class="cart-summary-total">Tổng cộng:</p>' +
          '<span class="cart-summary-sum">'+ tong +'</span>' +
        '</div>' +
        '<button class="cart-summary-pay" onclick=" ">Đặt hàng</button>' +
      '<div>';
  document.getElementById("mycart").innerHTML = ttgh;
}

ShowMycart();
