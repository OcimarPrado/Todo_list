document.addEventListener('DOMContentLoaded', () => {
    loadLists();
});

// 🔄 Carrega todas as listas e tarefas
function loadLists() {
    fetch('/lists')
        .then(response => response.json())
        .then(lists => {
            const container = document.getElementById('lists-container');
            container.innerHTML = '';

            lists.forEach(list => {
                const listDiv = document.createElement('div');
                listDiv.className = 'list';

                // Cabeçalho da lista
                const header = document.createElement('div');
                header.className = 'list-header';

                const title = document.createElement('div');
                title.innerHTML = `<div class="list-title">${list.title}</div><div class="list-date">${formatDate(list.created_at)}</div>`;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '🗑';
                deleteBtn.onclick = () => deleteList(list.id);

                header.appendChild(title);
                header.appendChild(deleteBtn);
                listDiv.appendChild(header);

                // Campo para adicionar tarefa
                const inputGroup = document.createElement('div');
                inputGroup.className = 'input-group';
                inputGroup.innerHTML = `
                    <input type="text" id="task-input-${list.id}" placeholder="Digite uma tarefa">
                    <button class="btn green" onclick="addTask(${list.id})">+ Adicionar Item</button>
                `;
                listDiv.appendChild(inputGroup);

                // Lista de tarefas
                list.tasks.forEach(task => {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';

                    const taskTitle = document.createElement('span');
                    taskTitle.textContent = task.title;
                    if (task.done) taskTitle.classList.add('done');

                    taskTitle.onclick = () => toggleTask(task.id, !task.done);

                    const deleteTaskBtn = document.createElement('button');
                    deleteTaskBtn.className = 'delete-btn';
                    deleteTaskBtn.innerHTML = '🗑';
                    deleteTaskBtn.onclick = () => deleteTask(task.id);

                    taskItem.appendChild(taskTitle);
                    taskItem.appendChild(deleteTaskBtn);
                    listDiv.appendChild(taskItem);
                });

                container.appendChild(listDiv);
            });
        });
}

// ➕ Adiciona nova lista
function addList() {
    const title = document.getElementById('list-input').value;
    if (title.trim() === '') return;

    fetch('/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(() => {
        document.getElementById('list-input').value = '';
        loadLists();
    });
}

// ➕ Adiciona nova tarefa
function addTask(listId) {
    const input = document.getElementById(`task-input-${listId}`);
    const title = input.value;
    if (title.trim() === '') return;

    fetch(`/lists/${listId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(() => {
        input.value = '';
        loadLists();
    });
}

// ✅ Marca/desmarca tarefa
function toggleTask(id, newStatus) {
    fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: newStatus })
    }).then(() => loadLists());
}

// 🗑 Deleta lista inteira
function deleteList(id) {
    fetch(`/lists/${id}`, { method: 'DELETE' }).then(() => loadLists());
}

// 🗑 Deleta tarefa
function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: 'DELETE' }).then(() => loadLists());
}

// 📆 Formata data
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}
