// Array of books
let myLibrary = [];

// Declare and add listeners to DOM elements
const cardContainer = document.querySelector(".card-container");
const form = document.querySelector("#add-book");
form.addEventListener("submit", addBookToLibrary);
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", displayModal);

// Book object with constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `Book title is ${title}`;
    }
}

// Define function on Book's prototype
Book.prototype.changeReadStatus = function () {
    this.isRead = !(this.isRead);
}

// Add book to myLibrary
function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

// Manually add example book to myLibrary for testing
const exampleBook = new Book("Harry Potter", "JK Rowling", 100, true);
myLibrary.push(exampleBook);
const exampleBook2 = new Book("James and the Small Peach", "Roll Daal", 300, false);
myLibrary.push(exampleBook2);
const exampleBook3 = new Book("Goosebumps", "That Guy", 50, false);
myLibrary.push(exampleBook3);
displayBooks();

// Remove book from myLibrary
function removeBookFromLibrary(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (i == book) {
            myLibrary = myLibrary.splice(i, 1);
        }
    }
}

// Display books on page
function displayBooks() {
    for (let book of myLibrary) {
        let card = document.createElement("div");
        for (let key in book) {
            console.log(book[key]);
            if ((key == "title")) {
                card.classList.add("card");
                let cardItem = document.createElement("div");
                cardItem.classList.add("card-item");
                cardItem.textContent = `"${book.title}"`;
                card.appendChild(cardItem);
                cardContainer.appendChild(card);
            }
            else if ((key == "author")) {
                let cardItem = document.createElement("div");
                cardItem.classList.add("card-item");
                cardItem.textContent = `${book.author}`;
                card.appendChild(cardItem);
                cardContainer.appendChild(card);
            }
            else if ((key == "pages")) {
                let cardItem = document.createElement("div");
                cardItem.classList.add("card-item");
                cardItem.textContent = `${book.pages} pages`;
                card.appendChild(cardItem);
                cardContainer.appendChild(card);
            }
            else if ((key == "isRead")) {
                let cardItem = document.createElement("div");
                cardItem.classList.add("card-item");
                let readBtn = document.createElement("button");
                if (book[key]) {
                    readBtn.classList.add("btn-green");
                    readBtn.textContent = `Read`;
                }
                else {
                    readBtn.classList.add("btn-red");
                    readBtn.textContent = `Not Read`;
                }
                cardItem.appendChild(readBtn);
                card.appendChild(cardItem);
                cardContainer.appendChild(card);
            }
        }
        let cardItem = document.createElement("div");
        cardItem.classList.add("card-item");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn-grey");
        deleteBtn.textContent = `Delete`;
        cardItem.appendChild(deleteBtn);
        card.appendChild(cardItem);
        cardContainer.appendChild(card);
    }
}

function displayModal() {
    
}


