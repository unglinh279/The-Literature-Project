const DEBUGREF = "doc-hieu/ki-nang/";

const blogSection = document.querySelector('.blogs-section');

db.collection(DEBUGREF.concat("blogs")).get().then((blogs) => {
    blogs.forEach(blog => {
        const urlParams = new URLSearchParams(window.location.search);
        if(blog.id != urlParams.get('id')){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="banner image">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="blog.html" onClick="location.href=this.href+'?id=${blog.id}';return false;" class="btn dark">read</a>
    </div>
    `;
}