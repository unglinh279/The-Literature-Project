let blogId = urlParams.get('id');
let docRef = db.collection("blogs").doc(blogId);
let deletePost = document.getElementById("delete-btn");

if(blogId == null){
    location.replace("index.html");
}
docRef.get().then((doc) => {
    if(doc.exists && blogId != null){
        setupBlog(doc.data());
    } else{
        location.replace("index.html");
    }
})

const setupBlog = (data) => {
    const banner = document.getElementById('banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const tag = document.querySelector('.tag');
    const publish = document.querySelector('.published');
    
    banner.src = data.bannerImage;
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    tag.innerHTML += data.tag;

    const article = document.querySelector('.article');
    article.innerHTML += data.article;
}

deletePost.addEventListener("click", function(){
    let password = prompt("Vui lòng nhập password để xóa bài viết");
    db.doc("info/password").get().then((pass) => {
        if(password == pass.data().val){
            db.collection("blogs").doc(blogId).delete().then(() => {
                alert("Xóa thành công!");
                location.href = "index.html";
            }).catch((error) => {
                alert("Xóa thât bại!, lỗi: " + error);
                location.href = "index.html";
            })
        }
        else{
            alert("Sai password!");
        }
    })  

});

// const addArticle = (ele, data) => {
//     data = data.split("\n").filter(item => item.length);
//     ele.innerHTML += data;

//     // data.forEach(item => {
//     //     // check for heading
//     //     if(item[0] == '#'){
//     //         let hCount = 0;
//     //         let i = 0;
//     //         while(item[i] == '#'){
//     //             hCount++;
//     //             i++;
//     //         }
//     //         let tag = `h${hCount}`;
//     //         ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
//     //     } 

//     //     //checking for image format
//     //     else if(item[0] == "!" && item[1] == "["){
//     //         let seperator;

//     //         for(let i = 0; i <= item.length; i++){
//     //             if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
//     //                 seperator = i;
//     //             }
//     //         }

//     //         let alt = item.slice(2, seperator);
//     //         let src = item.slice(seperator + 2, item.length - 1);
//     //         ele.innerHTML += `
//     //         <img src="${src}" alt="${alt}" class="article-image">
//     //         `;
//     //     }

//     //     else{
//     //         ele.innerHTML += `<p>${item}</p>`;
//     //     }
//     //})
// }