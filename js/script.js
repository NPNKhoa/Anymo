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
