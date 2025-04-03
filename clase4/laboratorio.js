// Variables globales
let currentPage = 1;
let allUsers = [];
let filteredUsers = [];

// Elementos del DOM
const userListElement = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfoElement = document.getElementById('pageInfo');

// Función para obtener usuarios de la API
async function fetchUsers(page) {
    try {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`);
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Función para renderizar usuarios
function renderUsers(users) {
    userListElement.innerHTML = '';
    
    if (users.length === 0) {
        userListElement.innerHTML = '<p>No se encontraron usuarios</p>';
        return;
    }
    
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        
        userCard.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name}" class="user-avatar">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        `;
        
        userListElement.appendChild(userCard);
    });
}

// Función para filtrar usuarios
function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = allUsers.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
}

// Función para cargar y mostrar una página
async function loadPage(page) {
    currentPage = page;
    pageInfoElement.textContent = `Página ${page}`;
    
    // Deshabilitar botones durante la carga
    prevPageButton.disabled = true;
    nextPageButton.disabled = true;
    
    // Obtener usuarios
    allUsers = await fetchUsers(page);
    filteredUsers = [...allUsers];
    
    // Renderizar usuarios
    renderUsers(filteredUsers);
    
    // Actualizar estado de los botones de paginación
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = allUsers.length < 6; // Asumiendo 6 por página
    
    // Habilitar botones después de cargar
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = false;
}

// Event Listeners
searchInput.addEventListener('input', filterUsers);

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        loadPage(currentPage - 1);
    }
});

nextPageButton.addEventListener('click', () => {
    loadPage(currentPage + 1);
});

// Cargar la primera página al iniciar
loadPage(1);
