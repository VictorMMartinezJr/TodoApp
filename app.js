"use strict";

const form = document.querySelector(".form");
const addInput = document.querySelector(".add-input");
const todosContainer = document.querySelector(".todos-container");

// Grab todo list from local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

const showTodos = () => {
  if (!todos) return;

  let todoHTML = "";
  todos.forEach((todo, i) => {
    todoHTML = `<div class="single-todo">
            <label for="${i}">
              <input type="radio" id=${i} class="radio-input"/>
              <p class="label-text">${todo.name}</p>
            </label>
            <i class="fa-solid fa-trash-can trash-icon"></i>
            </div>`;
    // Add todos from local storage to ui
    todosContainer.insertAdjacentHTML("afterbegin", todoHTML);
  });
};
showTodos();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userTodo = addInput.value.trim();

  if (!userTodo) return;

  // Create empty array if local storage is empty
  if (!todos) {
    todos = [];
  }

  // Clear input
  addInput.value = "";

  // Todolist data being pushed to todos array
  let todoInfo = { name: userTodo, status: "pending" };
  todos.push(todoInfo);

  // Save todos to local storage
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // Show new todos
  let todoHTML = "";
  todos.forEach((todo, i) => {
    todoHTML = `<div class="single-todo">
            <label for="${i}">
              <input type="radio" id=${i} class="radio-input"/>
              <p class="label-text">${todo.name}</p>
            </label>
            <i class="fa-solid fa-trash-can trash-icon"></i>
          </div>`;
  });
  // Add todos from local storage to ui
  todosContainer.insertAdjacentHTML("afterbegin", todoHTML);
});
