const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');
const tagField = document.querySelector('.tag-select');
const uploadDesc = document.querySelector('.upload-description');
const storageRef = firebase.storage().ref();

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath = null;

const publishBtn = document.querySelector('.publish-btn');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage);
})

const uploadImage = (uploadFile) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        storageRef.child('img/'.concat(file.name)).put(file).then((data) => {
            data.ref.getDownloadURL().then((url) => {
                uploadDesc.style.display = 'none'; 
                bannerPath = url;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            });
        });
    }
}

// const addImage = (imagepath, alt) => {
//     let curPos = articleFeild.selectionStart;
//     let textToInsert = `\r![${alt}](${imagepath})\r`;
//     articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
// }

function publish(){
    // generating id
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let blogTitle = blogTitleField.value.split(" ").join("-");
    let id = '';
    for(let i = 0; i < 4; i++){
        id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`;
    let date = new Date(); // for published at info

    //access firstore with db variable;
    db.collection("blogs").doc(docName).set({
        title: blogTitleField.value,
        article: tinymce.get("article").getContent(),
        tag: tagField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
        publishedTime: date.toLocaleString(),
    })
    .then(() => {
        location.href = 'blog.html'+'?id='+docName;
    }).catch((error) => {
        alert("Đăng thất bại, lỗi: " + error);
    }); 
}

publishBtn.addEventListener('click', () => {
    if(!tinymce.get("article").getContent().length){
        alert("Bài viết chưa có nội dung!");
    }
    else if(!blogTitleField.value.length){
        alert("Bài viết chưa có tiêu đề!");
    }
    else if(!tagField.value.length){
        alert("Bài viết chưa có tag!");
    }
    else{
        let password = prompt("Vui lòng nhập password để đăng bài viết");

        db.doc("info/password").get().then((pass) => {
            if(password == pass.data().val){
                if(bannerPath == null){
                    let rnd = Math.floor(Math.random()*7 + 1);
                    storageRef.child('default-images/'.concat(rnd).concat('.jpg')).getDownloadURL().then((url) => {
                        bannerPath = url;
                        publish();
                    });
                }
                else{
                    publish();
                }
            }
            else{
                alert("Sai password!");
            }
        })    
    }
})