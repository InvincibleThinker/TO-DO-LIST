//selectors
const todoInputs = document.querySelector(".todo-inputs");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
    event.preventDefault();

    //todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInputs.value;
    todoDiv.appendChild(newTodo);
    //add to localstorage
    saveLocalStorage(todoInputs.value);

    //checked button
    const compleatedButton = document.createElement('button');
    compleatedButton.innerHTML = '<i class="fas fa-check"><i>';
    compleatedButton.classList.add("complete-btn");
    todoDiv.appendChild(compleatedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append list
    todoList.appendChild(todoDiv);
    todoInputs.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        //removelocalstorage
        removeLocal(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }
    //checked
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalStorage(todo) {
    //check
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
     //check
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
         //todoDiv
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        //checked button
        const compleatedButton = document.createElement('button');
        compleatedButton.innerHTML = '<i class="fas fa-check"><i>';
        compleatedButton.classList.add("complete-btn");
        todoDiv.appendChild(compleatedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append list
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo) {
     //check
        let todos;
        if(localStorage.getItem("todos")=== null) {
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
}