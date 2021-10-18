'use strict';

var gProjs = [
  {
    id: 'chess',
    name: 'Chess',
    title: 'My King is better ',
    desc: makeLorem(),
    idx: 1,
    link: 'projs/chess/index.html',
    publishedAt: 1448693940000,
    labels: ['Matrixes', 'mouse event'],
  },
  {
    id: 'touchnum',
    name: 'Touch num',
    title: 'Can you beat it?',
    idx: 2,
    desc: makeLorem(),
    link: 'projs/touchnum/index.html',
    publishedAt: 1448693940000,
    labels: ['Matrixes', 'mouse event'],
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    title: 'Be carefull!',
    idx: 3,
    desc: makeLorem(),
    link: 'projs/minesweeper/index.html',
    publishedAt: 1448693940000,
    labels: ['Matrixes', 'mouse event'],
  },
  {
    id: 'pacman',
    name: 'Pacman',
    title: 'Lets eat!',
    idx: 4,
    desc: makeLorem(),
    link: 'projs/pacman/index.html',
    publishedAt: 1448693940000,
    labels: ['Matrixes', 'keyboard event'],
  },
  {
    id: 'bookshop',
    name: 'Book Shop',
    title: 'Lets be smarter ',
    idx: 5,
    desc: makeLorem(),
    link: 'projs/bookshop/index.html',
    publishedAt: 1448693940000,
    labels: ['Cards', 'mouse event'],
  },
  {
    id: 'todos',
    name: 'Todos',
    title: 'Mange your time!',
    idx: 6,
    desc: makeLorem(),
    link: 'projs/todos/index.html',
    publishedAt: 1448693940000,
    labels: ['list', 'mouse event'],
  },
];

function getProjById(id) {
  return gProjs.find((proj) => proj.id === id);
}
