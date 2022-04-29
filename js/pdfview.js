window.addEventListener('load', () =>{

    const pdflink = localStorage.getItem('pdf');
    console.log(pdflink);
    document.getElementById('frame').data = pdflink;
})