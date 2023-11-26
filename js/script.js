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
  var boximg = x.parentElement.children;
  var boxname = x.parentElement.children;
  var boxqnt = x.parentElement.children;
  var boxcap = x.parentElement.children;
  var boxcolor = x.parentElement.children;
  var boxprice = x.parentElement.children;
  // Lấy tên sản phẩm từ thẻ HTML
  var productName = boxname[0].innerText;
  var quantity = boxqnt[0].value;
  var img = boximg[0].children[0].src;
  var capacity = boxcap[0].innerText;
  var color = boxcolor[0].innerText;
  var price = boxprice[1].innerText;
  var product = new Array(img, productName, capacity, color, price, quantity);

  cart.push(product);

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
  document.getElementById("mycart").innerHTML = ttgh;
}
