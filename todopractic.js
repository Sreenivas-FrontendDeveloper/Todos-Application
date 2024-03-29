let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifideTodoList = localStorage.getItem("todoList")

    let parsedTodoList = JSON.parse(stringifideTodoList)
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList
    }
}

let todoList = getTodoListFromLocalStorage();

// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueNo: 3
//     }
// ];

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId)
    let labelElement = document.getElementById(labelId)

    labelElement.classList.toggle("checked")

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false
    } else {
        todoObject.isChecked = true
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId)
    todoItemsContainer.removeChild(todoElement)

    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    });
    todoList.splice(deleteIndex, 1)
    console.log(todoList)
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo
    let checkboxId = "checkbox" + todo.uniqueNo
    let labelId = "label" + todo.uniqueNo

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId)
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked")
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId)
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value
    console.log(userInputValue)
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    let todosCount = todoList.length;
    todosCount = todosCount + 1

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    }
    todoList.push(newTodo)

    createAndAppendTodo(newTodo)
    userInputElement.value = ""
}

addTodoButton.onclick = function() {
    onAddTodo()
}