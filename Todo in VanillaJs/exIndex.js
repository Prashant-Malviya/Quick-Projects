const todos = [];

const todosContainer = document.querySelector('.todos-container'); 
const todoInput = document.getElementById('title'); 
const addTodoButton = document.querySelector('#my-form button'); 

// Render the todos to the DOM
const renderTodo = (todos) => {
  todosContainer.innerHTML = ''; 

  if (todos.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'No Todo Yet';
    todosContainer.appendChild(placeholder);
  }

  todos.forEach((todo) => {
    const todoElement = generateTodoItem(todo.title, todo.isCompleted, todo.id);
    todosContainer.appendChild(todoElement);
  });
};

// Generate individual todo item
const generateTodoItem = (title, isCompleted, id) => {
  const todoContainer = document.createElement('div');
  todoContainer.className = 'todos-and-checkbox';
  todoContainer.setAttribute('data-id', id);

  // Todo item and checkbox container
  const todoItem = document.createElement('div');
  todoItem.className = 'todos-items';

  // Create a checkbox
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.className = 'checkbox';
  checkBox.checked = isCompleted;

  // Create a paragraph for the title
  const paragraph = document.createElement('p');
  paragraph.className = 'todo';
  paragraph.innerText = title;


  // Event listener for checkbox
  checkBox.addEventListener('change', () => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].isCompleted = checkBox.checked;

      // Add or remove the 'textCut' class based on checkbox state
      if (checkBox.checked) {
        paragraph.classList.add('textCut');
      } else {
        paragraph.classList.remove('textCut');
      }
    }
  });

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.className = 'delete';

  // Event listener for delete button
  deleteButton.addEventListener('click', () => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      renderTodo(todos);
    }
  });

  // Append elements to the containers
  todoItem.appendChild(checkBox);
  todoItem.appendChild(paragraph);
  todoContainer.appendChild(todoItem);
  todoContainer.appendChild(deleteButton);

  return todoContainer;
};

// Add todo on button click
addTodoButton.addEventListener('click', () => {
  const title = todoInput.value; 

  if (title) {
    const newTodo = {
      title: title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 1000) + 1),
      
    };
    
    todos.push(newTodo);
    todoInput.value = ''; 
    renderTodo(todos); 
  }
  // console.log(Math.floor(Math.random() * 1000) + 1);
});

// Initial render
renderTodo(todos);
