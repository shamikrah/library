// Array of books
let myLibrary = [];

// Index books in myLibrary
let bookIndex = 0;

// Declare and add listeners to DOM elements
const newBookBtn = document.querySelector(".new-book");
newBookBtn.addEventListener("click", displayModal);
const cardContainer = document.querySelector(".card-container");

const overlay = document.querySelector(".modal-overlay");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".form");
form.addEventListener("submit", addBook);
const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", closeModal);


// Open modal window
function displayModal() {
    overlay.classList.add("active");
    formContainer.classList.add("active");
}

// Close modal window
function closeModal() {
    overlay.classList.remove("active");
    formContainer.classList.remove("active");
}

// Book object with constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Define function on Book's prototype
Book.prototype.changeReadStatus = function () {
    this.isRead = !(this.isRead);
}

// Add book to myLibrary
function addBook(e) {
    e.preventDefault();
    let book = getBookFromInput();
    myLibrary.push(book);
    displayBooksGrid();
    form.reset();
    closeModal();
}

// Get new book based off of form input values
function getBookFromInput() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = parseInt(document.querySelector("#pages").value);
    let read = ((document.querySelector("#read").value) == "yes") ? true : false;
    let book = new Book(title, author, pages, read);
    return book;
}

// Manually add example books to myLibrary for testing
const exampleBook1 = new Book("Harry Potter", "JK Rowling", 100, true);
const exampleBook2 = new Book("James and the Small Peach", "Roll Daal", 300, false);
const exampleBook3 = new Book("Goosebumps", "That Guy", 50, false);
myLibrary.push(exampleBook1, exampleBook2, exampleBook3);
displayBooksGrid();

// Remove book from myLibrary
function removeBook(e) {
    let nextBookIndex = e.target.parentNode.parentNode.dataset.id;
    myLibrary = myLibrary.filter((book) => { return book != myLibrary[e.target.parentNode.parentNode.dataset.id] });
    e.target.parentNode.parentNode.remove();
    let cards = document.querySelectorAll(".card");
    for (let i = nextBookIndex; i < cards.length; i++) {
        cards[i].dataset.id = `${parseInt(cards[i].dataset.id) - 1}`;
    }
}

// Toggle read status of book
function toggleRead(e) {
    let book = myLibrary[e.target.parentNode.parentNode.dataset.id];
    let readBtn = e.target;
    book.changeReadStatus();
    if (book.isRead) {
        readBtn.classList.remove("btn-red");
        readBtn.classList.add("btn-green");
        readBtn.textContent = `Read`;
    }
    else {
        readBtn.classList.remove("btn-green");
        readBtn.classList.add("btn-red");
        readBtn.textContent = `Not Read`;
    }
}

// Display books on page
function displayBooksGrid() {
    resetBooksGrid();
    for (let book of myLibrary) {
        let card = document.createElement("div");
        card.dataset.id = `${bookIndex}`;
        bookIndex++;
        card.classList.add("card");
        for (let key in book) {
            if ((key == "title")) {
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
                readBtn.addEventListener("click", toggleRead);
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
        deleteBtn.addEventListener("click", removeBook);
        deleteBtn.classList.add("btn-main-color");
        deleteBtn.textContent = `Delete`;
        cardItem.appendChild(deleteBtn);
        card.appendChild(cardItem);
        cardContainer.appendChild(card);
    }
    bookIndex = 0;
}

// Reset book display
function resetBooksGrid() {
    while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.lastElementChild);
    }
}

