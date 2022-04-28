import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAd92HXUcQiPZfMm36oBTnEi3konB93xHk",
    authDomain: "the-bois--literature-project.firebaseapp.com",
    databaseURL: "https://the-bois--literature-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "the-bois--literature-project",
    storageBucket: "the-bois--literature-project.appspot.com",
    messagingSenderId: "188265502392",
    appId: "1:188265502392:web:15d29d416b6e9c078a464d"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

const blog = doc(firestore, 'main/doc-hieu/ki-nang/1');

function writeBlog(){
    const blogData = {
        title: "Bai viet 1",
        img: "image link",
        pdf: "pdf link"
    }

    setDoc(blog, blogData);
}

writeBlog()