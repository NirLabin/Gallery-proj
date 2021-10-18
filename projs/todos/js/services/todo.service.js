'use strict';

var gTodos;
_createTodos();

var gFilterBy = 'ALL';
var gImportance = '';
var gSortBy = 'TXT';

function getTodosForDisplay() {
  sortTodos();
  if (gFilterBy === 'ALL') return gTodos;
  const todos = gTodos.filter(function (todo) {
    return (
      (todo.isDone && gFilterBy === 'DONE') ||
      (!todo.isDone && gFilterBy === 'ACTIVE')
    );
  });
  return todos;
}

function sortTodos() {
  gTodos.sort(function (todo1, todo2) {
    switch (gSortBy) {
      case 'TXT':
        if (todo1.txt.toUpperCase() > todo2.txt.toUpperCase()) return 1;
        else if (todo1.txt.toUpperCase() < todo2.txt.toUpperCase()) return -1;
        return 0;
      case 'IMPORTANCE':
        return todo1.importance - todo2.importance;
      case 'CREATED':
        return todo1.createTime - todo2.createTime;
    }
  });
}

function removeTodo(todoId) {
  var checkIfSure = confirm('Are you sure?');
  if (checkIfSure) {
    const idx = gTodos.findIndex((todo) => todo.id === todoId);
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
  } else return;
}

function toggleTodo(todoId) {
  const todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, importance) {
  const todo = _createTodo(txt, importance);
  gTodos.push(todo);
  _saveTodosToStorage();
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  const todos = gTodos.filter(function (todo) {
    return !todo.isDone;
  });
  return todos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function SetSort(sortBy) {
  gSortBy = sortBy;
}

function _saveTodosToStorage() {
  saveToStorage('todosDB', gTodos);
}

function _createTodo(txt, importance) {
  const todo = {
    id: _makeId(),
    txt,
    createTime: Date.now(),
    importance,
    isDone: false,
  };
  return todo;
}

function _createTodos() {
  var todos = loadFromStorage('todosDB');
  // Setup Demo data
  if (!todos || !todos.length) {
    todos = [
      _createTodo('Learn HTML', 1),
      _createTodo('Study CSS', 1),
      _createTodo('Master JS', 1),
    ];
  }
  gTodos = todos;
  _saveTodosToStorage();
}

function _makeId(length = 5) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
