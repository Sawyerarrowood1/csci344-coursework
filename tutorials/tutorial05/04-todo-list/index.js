function addTodo() {
    const input = document.getElementById("todoInput");
    const todoText = input.value;
    if (todoText.trim() === "") {
        return;
    }
    const todoList = document.getElementById("todoList");
    todoList.insertAdjacentHTML(
        "beforeend",
        `<li>${todoText}</li>`
    );
    input.value = "";
}
