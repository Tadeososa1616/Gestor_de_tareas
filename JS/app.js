
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

//asegurar que exista tasks
if (!currentUser.tasks) {
    currentUser.tasks = [];
}

//mostrar tareas al cargar 
window.onload = renderTasks;

//agregar tareas
function addTask() {
    const text = document.getElementById("taskInput").value;

    if (!text) return;

    currentUser.tasks.push({
        text: text,
        done: false
    });

    save();
    renderTasks();
}

// MOSTRAR TAREAS
function renderTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    currentUser.tasks.forEach((task, i) => {
        list.innerHTML += `
        <li>
            <span class="task-text ${task.done ? 'done' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button onclick="toggleTask(${i})">✅</button>
                <button onclick="deleteTask(${i})">🗑</button>
            </div>
        </li>
        `;
    });
}
// COMPLETAR / DESMARCAR
function toggleTask(i) {
    currentUser.tasks[i].done = !currentUser.tasks[i].done;
    save();
    renderTasks();
}

// ELIMINAR
function deleteTask(i) {
    currentUser.tasks.splice(i, 1);
    save();
    renderTasks();
}

// GUARDAR
function save() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
        u.user === currentUser.user ? currentUser : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // refresca datos
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}
// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");

    const isGithub = window.location.hostname.includes("github.io");

    if (isGithub){
        window.location.href = "/Gestor_de_tareas/index.html";
    } else {
        window.location.href = "./index.html";
    }   
}