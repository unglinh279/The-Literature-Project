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