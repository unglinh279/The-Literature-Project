import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, doc, addDoc, collection, getDocs, query, onSnapshot, orderBy} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

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
    addBlog(DEBUGREF, 'Bài viết '.concat(id), 'img.jpg', 'pdf');
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
        div.innerHTML = card(titleDisplay, "Lorem Ispum", imgDisplay);
        list.appendChild(div);
    });
});

function card(title, content, img) {
    return `
    <div class="card">
      <header class="card-header">
        <h1 class="card-header-title" id="data-title">${title}</h1>
        <center><img id="data-url" src="${img}"></center>
      </header>
      <div class="card-content">
        <span id="data-content">${content}</span>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" href="#preview" id="edit">Edit</a>
        <a class="card-footer-item" style="color:red" id="delete">Delete</a>
      </footer>
    </div>
    <br>
    `;
  }

