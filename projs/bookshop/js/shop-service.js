'use strict';
var gBooks;
_createBooks();

var openBook;
var elRating = document.querySelector('.rating');
const PAGE_SIZE = 3;
var gPageIdx = 0;

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}

function previousPage() {
  if (gPageIdx === 0) return;
  gPageIdx--;
}

function getBooks() {
  var books = gBooks;
  const fromIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function addBook(name, price) {
  var book = _createBook(name, price);
  gBooks.unshift(book);
  _saveBooksToStorage();
}
function _createBook(name, price = getRandomIntInclusive(1, 200)) {
  return {
    id: +makeId(),
    name,
    price,
    desc: makeLorem(),
    rating: 0,
  };
}

function getBooks() {
  var books = gBooks;
  const fromIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function _createBooks() {
  var books = loadFromStorage('id');
  if (!books || !books.length) {
    books = [_createBook('Java'), _createBook('Css'), _createBook('Html')];
  }
  gBooks = books;
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });
  return book;
}

function updateBook(bookId, newPrice) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });
  book.price = newPrice;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage('id', gBooks);
}

function changeRating() {
  openBook.rating = elRating.value;
  renderBooks();
  _saveBooksToStorage();
}

function sortByName() {
  gBooks.sort(function (book1, book2) {
    if (book1.name.toUpperCase() > book2.name.toUpperCase()) return 1;
    else if (book1.name.toUpperCase() < book2.name.toUpperCase()) return -1;
    return 0;
  });
  renderBooks();
}

function sortByPrice() {
  gBooks.sort(function (book1, book2) {
    return book1.price - book2.price;
  });
  renderBooks();
}

function sortByRating() {
  gBooks.sort(function (book1, book2) {
    return book1.rating - book2.rating;
  });
  renderBooks();
}
