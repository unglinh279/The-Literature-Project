
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

function SearchBlogs(keyword){
    blogSection.innerHTML = '';

    db.collection("blogs").get().then((blogs) => {
        const blogList = [];
        blogs.forEach(blog => {
            if(tag == null || blog.data().tag.includes(tag)){
                const urlParams = new URLSearchParams(window.location.search);
                if(blog.id != urlParams.get('id')){
                    blogList.push(blog);
                }
            }
        })
    
        function toTimestamp(strDate){
            var datum = Date.parse(strDate);
            return datum/1000;
        }
    
        blogList.sort((a, b) => (toTimestamp(a.data().publishedTime) < toTimestamp(b.data().publishedTime) ? 1 : -1))
    
        for(var i = 0; i < blogList.length; i++){
            var blog = blogList[i];
            var title = extractContent(blog.data().title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
            var article = extractContent(blog.data().article).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

            keyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
            if(title.includes(keyword) || article.includes(keyword)){
                createBlog(blog);
            }
        }
    })
}

const sb = document.getElementById('search-bar');
sb.addEventListener('input', function(){
    SearchBlogs(sb.value);
})

// btnSearch.addEventListener('click', function(){
//     if(tags.length == 0) location.reload();

//     blogSection.innerHTML = '';
//     db.collection("blogs").where("tag", (tag == null) ? "!=" : "==", tag).get().then((blogs) => {
//         blogs.forEach(blog => {
//             var title = extractContent(blog.data().title).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//             var article = extractContent(blog.data().article).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

//             var display = true;
//             for(var i = 0; i < tags.length; i++){
//                 var val = tags[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
//                 display &= (title.includes(val) || article.includes(val));
//             }

//             if(display){
//                 createBlog(blog);
//             }
//         })
//     })    
// })