let firebaseConfig = {
    apiKey: "AIzaSyAd92HXUcQiPZfMm36oBTnEi3konB93xHk",
    authDomain: "the-bois--literature-project.firebaseapp.com",
    databaseURL: "https://the-bois--literature-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "the-bois--literature-project",
    storageBucket: "the-bois--literature-project.appspot.com",
    messagingSenderId: "188265502392",
    appId: "1:188265502392:web:15d29d416b6e9c078a464d"};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();