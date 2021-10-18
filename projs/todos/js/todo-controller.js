'use strict';

function renderTodos() {
  const todos = getTodosForDisplay();
  if (!todos.length) {
    document.querySelector(
      '.todos-box .todo-list'
    ).innerHTML = `no ${(gFilterBy =
      gFilterBy === 'ALL' ? '' : gFilterBy)} Todos`;
    return;
  } else {
    const strHtmls = todos.map(function (todo) {
      return `<li onclick="onToggleTodo('${
        todo.id
      }')" ><span class="${todo.isDone ? 'done' : ''}" >${todo.txt}</span>  
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            <span>Created At: ${todo.createTime}</span>
            </li>`;
    });
    document.querySelector('.todo-list').innerHTML = strHtmls.join('');
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();
  }
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  console.log('Removing todo', todoId);
  removeTodo(todoId);
  renderTodos();
}

function onToggleTodo(todoId) {
  console.log('Toggling todo', todoId);
  toggleTodo(todoId);
  renderTodos();
}

function onAddTodo() {
  const elTxt = document.querySelector('input');
  const txt = elTxt.value;
  var elImportance = document.querySelector('.importance');
  var importance = +elImportance.value;
  if (txt === '' || importance === '' || importance > 3) return;
  addTodo(txt, importance);
  renderTodos();
  elTxt.value = '';
  elImportance.value = '';
}

function onSetFilter(filterBy) {
  console.log('Filtering By:', filterBy);
  setFilter(filterBy);
  renderTodos();
}

function onSetSort(sortBy) {
  SetSort(sortBy);
  renderTodos();
}
