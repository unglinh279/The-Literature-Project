const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');
const tagField = document.querySelector('.tag-select');
const storageRef = firebase.storage().ref();

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath = null;

const publishBtn = document.querySelector('.publish-btn');
//const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage);
})

// uploadInput.addEventListener('change', () => {
//     uploadImage(uploadInput, "image");
// })

const uploadImage = (uploadFile) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        storageRef.child('img/'.concat(file.name)).put(file).then((data) => {
            data.ref.getDownloadURL().then((url) => {
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
        publishedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    })
    .then(() => {
        location.href = 'blog.html'+'?id='+docName;
    }); 
}

publishBtn.addEventListener('click', () => {
    if(!tinymce.get("article").getContent().length){
        alert("viết gì ik rùi đăng");
    }
    else if(!blogTitleField.value.length){
        alert("viết cái tiêu đề ik");
    }
    else{
        if(bannerPath == null){
            storageRef.child('img/default.jpg').getDownloadURL().then((url) => {
                bannerPath = url;
                publish();
            });
        }
        else{
            publish();
        }
    }
})