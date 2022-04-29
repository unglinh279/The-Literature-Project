import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, doc, addDoc, collection, getDocs, query, onSnapshot, orderBy} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getStorage, ref} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAd92HXUcQiPZfMm36oBTnEi3konB93xHk",
    authDomain: "the-bois--literature-project.firebaseapp.com",
    databaseURL: "https://the-bois--literature-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "the-bois--literature-project",
    storageBucket: "the-bois--literature-project.appspot.com",
    messagingSenderId: "188265502392",
    appId: "1:188265502392:web:15d29d416b6e9c078a464d"
};

const DEBUGREF = 'doc-hieu/ki-nang';
const DEBUGIMG = 'https://firebasestorage.googleapis.com/v0/b/the-bois--literature-project.appspot.com/o/img%2Fimg.jpg?alt=media&token=18e1cec3-e59f-4789-84c3-4dce091b3894';
const DEBUGPDF = 'https://firebasestorage.googleapis.com/v0/b/the-bois--literature-project.appspot.com/o/pdf%2Fpdf.pdf?alt=media&token=9652539d-b3f4-401e-a47d-80e1e805be23'

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

// WRITE
function addBlog(ref, titleTxt, imgLink, pdfLink){
    const collectionRef = collection(firestore, 'main/'.concat(ref));
    const newDoc = addDoc(collectionRef, {
        title: titleTxt,
        img: imgLink,
        pdf: pdfLink,
        time: new Date().toLocaleString()
    })
}

var randomBtn = document.getElementById("randomBtn");
randomBtn.onclick = function(){
    console.log('wtf did i say?')
    var id = Math.floor(Math.random() * 100);
    addBlog(DEBUGREF, 'Bài viết '.concat(id), DEBUGIMG, DEBUGPDF);
}

// READ

let list = document.getElementById("all-posts");
const collectionRef = collection(firestore, 'main/'.concat(DEBUGREF));
const Query = query(collectionRef, orderBy('time'));

// const querySnapshot = await getDocs(Query);
onSnapshot(Query, (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((snap) => {
        let titleID = snap.data().id;
        let titleDisplay = snap.data().title;
        let imgDisplay = snap.data().img;
        let pdfDisplay = snap.data().pdf;
    
        let div = document.createElement("div");
        div.id = titleID;
        div.setAttribute("class", "column");
        div.innerHTML = card(titleDisplay, pdfDisplay, imgDisplay);
        list.appendChild(div);
    });
});

list.addEventListener("click", e =>{
    let listNode = e.target.parentNode.parentNode;
    let pdf = listNode.querySelector('#pdf-link').innerText;

    localStorage.setItem('pdf', pdf);
    window.location.href = 'pdfview.html';
});

function card(title, pdf, img) {
    return `
    <div class="card">
      <header class="card-header">
        <h1 class="card-header-title" id="data-title">${title}</h1>
        <center><img id="data-img" src="${img}"></center>
      </header>
      <h1 style="font-size: 0px; margin: 0px;" id="pdf-link">${pdf}</h1>
      </div>
    <br>
    `;
  }

