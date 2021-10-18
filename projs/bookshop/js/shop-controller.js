'use strict';

function onInit() {
  renderBooks();
}

function renderBooks() {
  var strHtmls = `<table class="book-table"><tbody><th>id</th><th onclick="sortByName()">Title</th><th onclick="sortByPrice()">Price</th><th onclick="sortByRating()">Rating</th><th>Actions</th> `;

  var books = getBooks();

  strHtmls += books
    .map(function (book) {
      return `<tr> <td>${book.id}</td> <td>${book.name}</td> <td>${book.price}</td><td>${book.rating}</td> <td><button class="read" onclick="onReadBook(${book.id})">Read</button>
      <button class="update" onclick="onUpdateBook(${book.id})">Update</button>
      <button class="delete" onclick="onDeleteBook(${book.id})">Delete</button></td> </tr>`;
    })
    .join('');
  strHtmls += '</tbody></table>';
  document.querySelector('.books-container').innerHTML = strHtmls;
}

function onDeleteBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onAddBook() {
  const elName = document.querySelector('.name');
  const bookName = elName.value;
  var elPrice = document.querySelector('.price');
  var price = +elPrice.value;
  if (!bookName || price < 0 || !price) return;
  addBook(bookName, price);
  renderBooks();
  elName.value = '';
  elPrice.value = '';
}

function onUpdateBook(bookId) {
  var newPrice = +prompt('Price?');
  if (!newPrice || newPrice < 0) return;
  updateBook(bookId, newPrice);
  renderBooks();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  openBook = book;
  var elModal = document.querySelector('.modal');
  elModal.querySelector('h4').innerText = `Book name:${book.name}`;
  elModal.querySelector('h5').innerText = `Book price:${book.price}`;
  elModal.querySelector('p').innerText = book.desc;
  elModal.hidden = false;
  elModal.querySelector('img').src = `img/${book.name}.jpg`;
}

function onCloseModal() {
  document.querySelector('.modal').hidden = true;
  elRating.value = '';
}

function onNextPage() {
  nextPage();
  renderBooks();
}

function onPreviousPage() {
  previousPage();
  renderBooks();
}
