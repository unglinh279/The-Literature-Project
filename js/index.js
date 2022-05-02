
const urlParams = new URLSearchParams(window.location.search);
let tag = urlParams.get('tag');

const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").where("tag", (tag == null) ? "!=" : "==", tag).get().then((blogs) => {
    blogs.forEach(blog => {
        const urlParams = new URLSearchParams(window.location.search);
        if(blog.id != urlParams.get('id')){
            createBlog(blog);
        }
    })
})    

const createBlog = (blog) => {
    let data = blog.data();

    let title = data.title;
    if(title.length > 100){
        title = title.substring(0, 100) + ' ...';
    }
    
    let article = data.article;
    if(article.length > 200){
        article = article.substring(0, 200) + ' ...';
    }

    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="banner image">
        <h1 class="blog-title">${title}</h1>
        <p class="blog-overview">${article}</p>
        <p class="blog-overview">${data.tag}</p>
        <a href="blog.html" onClick="location.href=this.href+'?id=${blog.id}';return false;" class="btn dark">read</a>
    </div>
    `;
}