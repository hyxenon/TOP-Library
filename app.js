const authorElement = document.getElementById("author")
const titleElement = document.getElementById("title")
const numPagesElement = document.getElementById("numPages")
const isReadElement = document.getElementById("isRead")


const libraryContainerElement = document.querySelector(".library-container")
const addBtn = document.getElementById("add-btn")

// ------- Global Variables ---------
let library = []



// ------- Classes ---------

class Book{
    constructor(author,title,pages,isRead){
        this.author = author
        this.title = title
        this.pages = pages
        this.isRead = isRead
    }
}


// ------- Functions ---------

function getBookFromInput(){
    const author = authorElement.value
    const title = titleElement.value
    const numPages = numPagesElement.value
    const isRead = isReadElement.checked ? "read": "not-read"
    
    return new Book(author,title,numPages,isRead)
}


function addBookToLibrary(e){
    e.preventDefault()
    const book = getBookFromInput()
    if(book.author == "" || book.title == "" || book.pages == "") return

    clearForm()
    library.push(book)
    dispayBooksLibrary()
}

function dispayBooksLibrary(){
    libraryContainerElement.innerHTML = ""

    for(let i = 0 ; i<= library.length; i++){

        // Create Elements
        const newCard = document.createElement("div")
        const newAuthor = document.createElement("p")
        const newTitle = document.createElement("p")
        const newNumPages = document.createElement("p")
        const newIsRead = document.createElement("div")
        const newRemoveBtn = document.createElement("button")

        // Event Listener For New Elements
        newRemoveBtn.addEventListener("click",removeBtn)
        newIsRead.addEventListener("click",isReadToggle)


        newCard.classList.add("card")
        newCard.setAttribute("data-title",`${library[i].title}`)
        newAuthor.setAttribute("id","author")
        newTitle.setAttribute("id","title")
        newNumPages.setAttribute("id","numPages")
        newRemoveBtn.classList.add("remove-btn")


        newAuthor.textContent = library[i].author
        newTitle.textContent = library[i].title
        newNumPages.textContent = `${library[i].pages} pages`
        newIsRead.classList.add(`${library[i].isRead}`)
        newRemoveBtn.textContent = "Remove"

        newIsRead.textContent = library[i].isRead == "read"? "Read": "Not Read"

        newCard.append(newAuthor,newTitle,newNumPages,newIsRead,newRemoveBtn)
        libraryContainerElement.appendChild(newCard)
    }
}

function clearForm(){
    authorElement.value = ""
    titleElement.value = ""
    numPagesElement.value = ""
    isReadElement.checked = false
}

function removeBtn(e){
    const title = e.target.parentElement.dataset.title

    library.forEach((value,index)=>{
        if(value.title == title){
            library.splice(index,1)
            dispayBooksLibrary()
            return
        }
        
    })
}

function isReadToggle(e){
    if(e.target.classList == "read"){
        e.target.classList.remove("read")
        e.target.classList.add("not-read")
        e.target.textContent = "Not Read"
    }else{
        e.target.classList.remove("not-read")
        e.target.classList.add("read")
        e.target.textContent = "Read"
    }
}


// ------- Event Listeners ---------

// addBtn.addEventListener("click",(e)=>{
//     e.preventDefault()
//     const book = getBookFromInput()
//     if(book.author == "" || book.title == "" || book.pages == "") return

//     clearForm()
//     library.push(book)
//     dispayBooksLibrary()
    
// })
    addBtn.addEventListener("click",addBookToLibrary)

// ------- Modal Script ---------
const modal = document.getElementById("myModal")
const addBookBtn = document.getElementById("myBtn")
const span = document.getElementsByClassName("close")[0]

addBookBtn.addEventListener("click",()=>{
    modal.style.display="block"
})

span.addEventListener("click",()=>{
    modal.style.display = "none"
})
