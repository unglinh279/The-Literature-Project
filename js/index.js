
const urlParams = new URLSearchParams(window.location.search);
let tag = urlParams.get('tag');

const blogSection = document.querySelector('.blogs-section');

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
        createBlog(blogList[i]);
    }
}) 

function extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
};

const createBlog = (blog) => {
    let data = blog.data();

    let title = extractContent(data.title);
    if(title.length > 100){
        title = title.substring(0, 100) + ' ...';
    }
    
    let article = extractContent(data.article);
    if(article.length > 200){
        article = article.substring(0, 200) + ' ...';
    }

    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="banner image">
        <h1 class="blog-title">${title}</h1>
        <p class="blog-overview">${article}</p>
        <br>
        <a href="blog.html" onClick="location.href=this.href+'?id=${blog.id}&tag=${data.tag}';return false;" class="btn dark">Đọc bài</a>
    </div>
    `;
}