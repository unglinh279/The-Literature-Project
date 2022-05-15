
var isShowItemList = false;



// search.addEventListener("click", function(e) {
//   if (e.target == e.currentTarget) 
//     toggleModal();
// });

// -------------------------------SEARCH-BOX-----------------------------------


$('#catergory-btn').on('click', function (event) {
    $('#sidebar-nav').css('max-width', '100%');
});

// $('#navbar-container').on('mouseleave', function (event) {
//     $('#sidebar-nav').css('max-width', '0');
// });

$('#rickroll').on('click', function (event) {
    console.log('rickroll');
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
});
