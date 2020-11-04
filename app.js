/* eslint-disable no-plusplus */

// Constructor Function to add new books
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
// Array for storing books
const booksArr = (localStorage.length > 0) ? JSON.parse(localStorage.getItem('books')) : [];

// Adds Books to the Array
const addBook = (title, author, pages, isRead) => {
  booksArr.push(new Book(title, author, pages, isRead));
};

// Function to create cards
const handleCards = (arr) => {
  const bookSection = document.getElementById('bookSection');
  bookSection.innerHTML = '';
  for (let i = 0; i < booksArr.length; i++) {
    const card = document.createElement('div');
    card.className = 'card col-sm-2 shadow';
    card.style.width = '18rem';
    card.dataset.indexNumber = i;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = arr[i].title;

    const author = document.createElement('p');
    author.className = 'card-text';
    author.id = 'cardAuthor';

    const pages = document.createElement('p');
    pages.className = 'card-text';
    pages.id = 'cardPages';

    const isRead = document.createElement('p');
    isRead.className = 'card-text';
    isRead.id = 'isReadStatus';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'close deleteBtn';
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

    bookSection.appendChild(card);
    card.appendChild(title);
    title.appendChild(deleteBtn);
    card.appendChild(cardBody);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(isRead);
    author.textContent = arr[i].author;
    pages.textContent = arr[i].pages;
    isRead.textContent = arr[i].isRead ? 'Book Read!' : 'Book not Read';
  }
  // Delete Button Behaviour

  const delBtn = document.getElementsByClassName('deleteBtn');
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener('click', (event) => {
      const index = parseInt(event.target.parentNode.parentNode.parentNode.dataset.indexNumber, 10);
      booksArr.splice(index, 1);
      handleCards(booksArr);
    });
  }
  localStorage.setItem('books', JSON.stringify(booksArr));
};

// Submit Button Behaviour
const submit = document.getElementById('submitBook');
submit.addEventListener('click', (event) => {
  const bookTitle = document.getElementById('bookTitle');
  const bookAuthor = document.getElementById('bookAuthor');
  const bookPages = document.getElementById('bookPages');
  const isRead = document.getElementById('isRead');
  const closeModal = document.getElementById('closeModal');

  addBook(bookTitle.value, bookAuthor.value, bookPages.value, isRead.checked);
  handleCards(booksArr);
  closeModal.click();

  event.preventDefault();
});
handleCards(booksArr);
