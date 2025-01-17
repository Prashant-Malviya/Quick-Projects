const todos = [];

const todosContainer = document.querySelector(".todos-container");
const todoInput = document.getElementById("title");

const addTodoButton = document.querySelector("#my-form button");

addTodoButton.addEventListener("click", () => {
  const title = todoInput.value;

  if (title) {
    const newTodo = {
      title: title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 1000) + 1),
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodo(todos);
  }
});

const renderTodo = (todos) => {
  todosContainer.innerHTML = "";

  if (todos.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.className = "placeholder";
    placeholder.textContent = "No Todo Yet";
    todosContainer.appendChild(placeholder);
  }

  todos.forEach((todo) => {
    const todoElement = generateTodoItem(todo.title, todo.isCompleted, todo.id);
    todosContainer.appendChild(todoElement);
  });
};

const generateTodoItem = (title, isCompleted, id) => {
  const todoContainer = document.createElement("div");
  todoContainer.className = "todos-and-checkbox";

  todoContainer.setAttribute("data-id", id);

  const todoItem = document.createElement("div");
  todoItem.className = "todos-items";

  //creating checkbox

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "checkbox";
  checkBox.checked = isCompleted;

  //create a paragraph for the title

  const paragraph = document.createElement("p");

  paragraph.className = "todo";

  paragraph.innerText = title;

  checkBox.addEventListener("change", () => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].isCompleted = checkBox.checked;
    }

    if (checkBox.checked) {
      paragraph.classList.add("textCut");
    } else {
      paragraph.classList.remove("textCut");
    }
  });

  //creating delete button

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";

  deleteButton.className = "delete";

  deleteButton.addEventListener("click", () => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    console.log("Todo ID: ", todos[todoIndex].id);
    console.log("Provided ID: ", id);

    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      renderTodo(todos);
    }
  });

  todoItem.appendChild(checkBox);
  todoItem.appendChild(paragraph);
  todoContainer.appendChild(todoItem);
  todoContainer.appendChild(deleteButton);

  return todoContainer;
};

renderTodo(todos);
