const addBtn = document.getElementById("addBtn");
const inputField = document.getElementById("inputField");
const addList = document.getElementById("addList");

let toDoId = 0;  

// Loading to the local storage
function loadToDO() {
  const savedToDo = JSON.parse(localStorage.getItem("todos")) || [];
  return savedToDo;
}

// saving to the local storage
function saveToDo(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//  retriving ToDo to the local storage
function renderTodo() {
  const todos = loadToDO();
  addList.innerHTML = "";

  todos.forEach((toDoItem) => {
    const toDoList = document.createElement("li");
    toDoList.innerText = toDoItem.text;
    toDoList.id = toDoItem.id;
    addList.appendChild(toDoList);

    toDoList.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      if (e.target.tagName === "LI") {
        const clickedToDo = Number(e.target.id);
        const todos = loadToDO();
        const updatedToDos = todos.filter((todo) => todo.id !== clickedToDo);
        saveToDo(updatedToDos);
        renderTodo();
      }
    });

    toDoList.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.style.textDecoration = "line-through";
    });
  });
}

addBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  const toDos = loadToDO();
  if (inputField.value.trim() !== "") {
    const todos = loadToDO();
    todos.push({ id: toDoId++, text: inputField.value });
    saveToDo(todos);
    renderTodo();
    inputField.value = "";
  }
});

// Initial rendering of todos when the page loads
renderTodo();
