"use strict";

const form = document.querySelector(".form");
const addInput = document.querySelector(".add-input");
const todosContainer = document.querySelector(".todos-container");
const error = document.querySelector(".error");

// Grab todo list from local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

const showTodos = () => {
  if (!todos) return;

  let todoHTML = "";

  todos.forEach((todo, i) => {
    let isComplete = todo.status === "completed" ? "checked" : "";

    todoHTML += `<div class="single-todo">
            <label for="${i}">
              <input type="checkbox" id=${i} class="radio-input" onclick="completeTodo(this)" ${isComplete}/>
              <p class="label-text ${isComplete}">${todo.name}</p>
            </label>
            <span>
            <i class="fa-solid fa-trash-can trash-icon" onclick="deleteTodo(${i})"></i>
            <i class="fa-solid fa-pen-to-square edit-icon" onclick="handleEdit(${i}, '${todo.name}')"></i>
            </span>
            </div>`;
  });
  // Add todos from local storage to ui
  todosContainer.innerHTML = todoHTML;
};

showTodos();

// Handle complete todo
const completeTodo = (todo) => {
  if (!todo) return;
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todos[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todos[todo.id].status = "pending";
  }

  localStorage.setItem("todo-list", JSON.stringify(todos));
};
completeTodo();

// Handle delete a todo
const deleteTodo = (todoId) => {
  todos.splice(todoId, 1);
  // Save todos to local storage
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // Show new todos
  showTodos();
};

// Handle editing a todo
let editId;
let isEditedTask = false;

const handleEdit = (id, todoName) => {
  isEditedTask = true;
  editId = id;
  addInput.value = todoName;
};

// Handle form submit
const handleFormSubmit = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let userTodo = addInput.value.trim();

    if (!userTodo) {
      error.classList.add("error-active");
      return;
    }

    if (isEditedTask) {
      todos[editId].name = userTodo;
      isEditedTask = false;
    } else {
      // Create empty array if local storage is empty
      if (!todos) {
        todos = [];
      }
      // Todolist data being pushed to todos array
      let todoInfo = { name: userTodo, status: "pending" };
      todos.push(todoInfo);
    }

    // Clear input
    addInput.value = "";

    // Clear error
    error.classList.remove("error-active");

    // Save todos to local storage
    localStorage.setItem("todo-list", JSON.stringify(todos));

    // Show new todos
    showTodos();
  });
};
handleFormSubmit();
