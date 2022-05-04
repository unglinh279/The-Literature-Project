var btnOpenSearch = document.querySelector('.btn-open-search')
var search = document.querySelector('.search')
var iconCloseSearch = document.querySelector('.search-header i')
var btnSearch = document.querySelector('.btn-search');

function toggleSearch() {
    search.classList.toggle('search-hide')
}

btnOpenSearch.addEventListener('click', toggleSearch)
iconCloseSearch.addEventListener("click", toggleSearch)

// search.addEventListener("click", function(e) {
//   if (e.target == e.currentTarget) 
//     toggleModal();
// });

// -------------------------------SEARCH-BOX-----------------------------------

var content = document.querySelector('.search-content')
var	input = document.querySelector('.search-content input')
var btnRemoveAll = document.querySelector('.btn-removeAll-search')

var tags = []

render()

function render() {
	content.innerHTML = ''
    for(let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        content.innerHTML += `<li>
                                ${tag}
                                <i class="fa-solid fa-xmark" onclick="removeTag(${i})"></i>
                              </li>
        `
    }
    content.appendChild(input)
    input.focus()
}

input.addEventListener('keydown', function(event) {
    if(event.key == 'Enter') {
        if(input.value.trim() != '')
            tags.push(input.value.trim())
        input.value = ''
        render()
    }
})

function removeTag(index) {
    tags.splice(index, 1)
    render()
}

btnRemoveAll.addEventListener('click', function() {
    tags = []
    render()
})

iconCloseSearch.addEventListener('click', function() {
    tags = []
    render()
})

btnSearch.addEventListener('click', function(){
    console.log(tags)
})