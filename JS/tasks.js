let selectedColor = "#000000";

document.querySelectorAll(".color-option").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll(".color-option").forEach(c => c.classList.remove("selected"));

        el.classList.add("selected");
        selectedColor = el.dataset.color;
    });
});

let filter = "all";

function setFilter(type) {
    filter = type;
    render();
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "landing.html";
}

// asegurar estructura
if (!currentUser.tasks) {
    currentUser.tasks = [];
}

// CREAR CATEGORÍA
function addCategory() {
    const name = document.getElementById("categoryInput").value;

    if (!name) return;

    currentUser.tasks.push({
        name: name,
        color: selectedColor,
        open: true,
        tasks: []
    });

    document.getElementById("categoryInput").value = "";
    selectedColor = "#000000";

    save();
    render();
}

// ABRIR / CERRAR
function toggleCategory(i) {
    currentUser.tasks[i].open = !currentUser.tasks[i].open;

    save();
    render();
}

//ELIMINAR CATEGORIAS
function deleteCategory(i) {
    const confirmDelete = confirm("¿Eliminar esta categoría?");

    if (!confirmDelete) return;

    currentUser.tasks.splice(i, 1);

    save();
    render();
}

//EDITAR CATEGORIAS 
function editCategory(i) {
    const newName = prompt("Nuevo nombre:", currentUser.tasks[i].name);

    if (!newName) return;

    currentUser.tasks[i].name = newName;

    save();
    render();
}

// AGREGAR TAREA
function addTask(catIndex) {
    const input = document.getElementById(`taskInput-${catIndex}`);
    const text = input.value;

    if (!text) return;

    currentUser.tasks[catIndex].tasks.push({
        text: text,
        done: false
    });

    input.value = "";

    save();
    render();
}

// COMPLETAR
function toggleTask(catIndex, taskIndex) {
    const task = currentUser.tasks[catIndex].tasks[taskIndex];
    task.done = !task.done;

    save();
    render();
}

// ELIMINAR
function deleteTask(catIndex, taskIndex) {
    currentUser.tasks[catIndex].tasks.splice(taskIndex, 1);

    save();
    render();
}

// RENDER
function render() {
    const container = document.getElementById("categories");
    if (!container) return;

    container.innerHTML = "";

    currentUser.tasks.forEach((cat, i) => {
        container.innerHTML += `
        <div class="category" style="border-left: 5px solid ${cat.color || '000000'}">

        <div class="category-header" onclick="toggleCategory(${i})">
            <h2>${cat.open ? "▼" : "▶"} ${cat.name}
            (${cat.tasks.filter(t => t.done).length}/${cat.tasks.length})
            </h2>
            <button onclick="event.stopPropagation(); editCategory(${i})">✏️</button>
            <button onclick="event.stopPropagation(); deleteCategory(${i})">🗑</button>
        </div>

    ${cat.open ? `
        <div class="category-content" style="
            max-height: ${cat.open ? "500px" : "0px"};
            opacity: ${cat.open ? "1" : "0"};
            ">
        </div>
        <div class="task-input">
            <input id="taskInput-${i}" placeholder="Nueva tarea">
            <button onclick="addTask(${i})">+</button>
        </div>

        <ul>
        ${(cat.tasks || [])
                    .filter(t => {
                        if (filter === "done") return t.done;
                        if (filter === "pending") return !t.done;
                        return true;
                    })
                    .map((t, j) => `
            <li>
            <span class="${t.done ? 'done' : ''}">
                ${t.text}
            </span>

            <div class="actions">
                <button onclick="toggleTask(${i}, ${j})">✅</button>
                <button onclick="deleteTask(${i}, ${j})">❌</button>
            </div>
            </li>
        `).join("")}
        </ul>
    ` : ""}

    </div>
    `;
    });
}

// GUARDAR
function save() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
        u.user === currentUser.user ? currentUser : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
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

// INICIAR
render();