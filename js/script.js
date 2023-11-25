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

function addToLocalStorage() {
  // Lấy tên sản phẩm từ thẻ HTML
  var productName = document.getElementById("productName").innerText;
  var quantity = parseInt(document.getElementById("quantity").value);

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
      localStorage.setItem(productName, currentValue);

      alert("Đã thêm vào giỏ hàng");
  } else {
      alert("Trình duyệt của bạn không hỗ trợ.");
  }
};