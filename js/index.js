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
    if(title.length > 50){
        title = title.substring(0, 50) + ' ...';
    }
    
    let article = extractContent(data.article);
    if(article.length > 150){
        article = article.substring(0, 150) + ' ...';
    }

    blogSection.innerHTML += `
    <div class="card-grid-space">
      <a class="card" href="blog.html" onClick="location.href=this.href+'?id=${blog.id}&tag=${data.tag}';return false;" style="--bg-img: url(${data.bannerImage})">
        <div>
          <h1>${title}</h1>
          <p>${article}</p>
          <div class="date">${data.publishedAt}</div>
          <div class="tags">
            <div class="tag">${data.tag}</div>
          </div>
        </div>
      </a>
    </div>
    `;
}