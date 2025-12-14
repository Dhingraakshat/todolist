const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let allTasks = [];
let allUsers = [];
let currentFilter = 'all';

const loginScreen = document.getElementById('loginScreen');
const registerScreen = document.getElementById('registerScreen');
const appScreen = document.getElementById('appScreen');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const newTaskBtn = document.getElementById('newTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const cancelTask = document.getElementById('cancelTask');
const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');

showRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'flex';
});

showLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerScreen.style.display = 'none';
  loginScreen.style.display = 'flex';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      currentUser = data.user;
      showApp();
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    alert('Login failed. Please try again.');
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const full_name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const team = document.getElementById('registerTeam').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, team })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      currentUser = data.user;
      showApp();
    } else {
      alert(data.error || 'Registration failed');
    }
  } catch (error) {
    alert('Registration failed. Please try again.');
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser = null;
  appScreen.style.display = 'none';
  loginScreen.style.display = 'flex';
  loginForm.reset();
});

function showApp() {
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'none';
  appScreen.style.display = 'flex';

  document.getElementById('userName').textContent = currentUser.full_name;
  document.getElementById('userEmail').textContent = currentUser.email;
  document.getElementById('userAvatar').textContent = currentUser.full_name.charAt(0).toUpperCase();

  loadUsers();
  loadTasks();
}

async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      allUsers = await response.json();
      populateUserDropdown();
    }
  } catch (error) {
    console.error('Failed to load users:', error);
  }
}

function populateUserDropdown() {
  const select = document.getElementById('taskAssignedTo');
  select.innerHTML = '<option value="">Select user...</option>';
  
  allUsers.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = `${user.full_name} (${user.email})`;
    select.appendChild(option);
  });
}

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      allTasks = await response.json();
      renderTasks();
    }
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}

function renderTasks() {
  const filteredTasks = currentFilter === 'all' 
    ? allTasks 
    : allTasks.filter(task => task.status === currentFilter);

  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started</p>
      </div>
    `;
    return;
  }

  tasksContainer.innerHTML = filteredTasks.map(task => `
    <div class="task-card" data-id="${task.id}">
      <div class="task-header">
        <div style="flex: 1;">
          <div class="task-title">${escapeHtml(task.title)}</div>
          ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        </div>
        <div class="task-actions">
          <button class="btn-icon edit-task" data-id="${task.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button class="btn-icon delete delete-task" data-id="${task.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="task-meta">
        <span class="task-badge status-${task.status}">${formatStatus(task.status)}</span>
        <span class="task-badge priority-${task.priority}">${formatPriority(task.priority)}</span>
        ${task.assigned_to_name ? `
          <span class="task-assigned">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            ${escapeHtml(task.assigned_to_name)}
          </span>
        ` : ''}
        ${task.due_date ? `
          <span class="task-due">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ${formatDate(task.due_date)}
          </span>
        ` : ''}
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.edit-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      editTask(btn.dataset.id);
    });
  });

  document.querySelectorAll('.delete-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(btn.dataset.id);
    });
  });
}

newTaskBtn.addEventListener('click', () => {
  document.getElementById('modalTitle').textContent = 'New Task';
  document.getElementById('taskId').value = '';
  taskForm.reset();
  document.getElementById('taskStatus').value = 'todo';
  taskModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
  taskModal.classList.remove('active');
});

cancelTask.addEventListener('click', () => {
  taskModal.classList.remove('active');
});

taskModal.addEventListener('click', (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove('active');
  }
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskId = document.getElementById('taskId').value;
  const taskData = {
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDescription').value,
    priority: document.getElementById('taskPriority').value,
    status: document.getElementById('taskStatus').value,
    due_date: document.getElementById('taskDueDate').value || null,
    assigned_to: document.getElementById('taskAssignedTo').value || null
  };

  try {
    const url = taskId ? `${API_URL}/tasks/${taskId}` : `${API_URL}/tasks`;
    const method = taskId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(taskData)
    });

    if (response.ok) {
      taskModal.classList.remove('active');
      loadTasks();
    } else {
      const data = await response.json();
      alert(data.error || 'Failed to save task');
    }
  } catch (error) {
    alert('Failed to save task. Please try again.');
  }
});

function editTask(id) {
  const task = allTasks.find(t => t.id == id);
  if (!task) return;

  document.getElementById('modalTitle').textContent = 'Edit Task';
  document.getElementById('taskId').value = task.id;
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description || '';
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskStatus').value = task.status;
  document.getElementById('taskDueDate').value = task.due_date || '';
  document.getElementById('taskAssignedTo').value = task.assigned_to || '';

  taskModal.classList.add('active');
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      loadTasks();
    } else {
      alert('Failed to delete task');
    }
  } catch (error) {
    alert('Failed to delete task. Please try again.');
  }
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    currentFilter = item.dataset.filter;
    pageTitle.textContent = item.textContent.trim();
    renderTasks();
  });
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatStatus(status) {
  const map = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'done': 'Done'
  };
  return map[status] || status;
}

function formatPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  currentUser = JSON.parse(user);
  showApp();
}