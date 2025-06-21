document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.main-nav a');
    const pageTitle = document.getElementById('pageTitle');
    const userNameDisplay = document.getElementById('userName');

    
    const authScreen = document.getElementById('auth-screen');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const passwordField = document.getElementById('passwordField');
    const nameUniversityCareerFields = document.getElementById('nameUniversityCareerFields');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const toggleAuthLink = document.getElementById('toggleAuthLink');
    const toggleAuthText = document.getElementById('toggleAuthText');
    const authMessage = document.getElementById('authMessage');
       const editProfileBtn = document.getElementById('editProfileBtn');
    const profileEditFormContainer = document.getElementById('profileEditFormContainer');
    const profileEditForm = document.getElementById('profileEditForm');
    const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');
    const profileEditMessage = document.getElementById('profileEditMessage');

        const createGroupBtn = document.getElementById('createGroupBtn');
    const groupCreateFormContainer = document.getElementById('groupCreateFormContainer');
    const groupCreateForm = document.getElementById('groupCreateForm');
    const cancelCreateGroupBtn = document.getElementById('cancelCreateGroupBtn');
    const groupCreateMessage = document.getElementById('groupCreateMessage');
    const currentGroupList = document.getElementById('currentGroupList'); 

    let isRegisterMode = false;

    let currentUser = {
        name: 'Estudiante Prueba',
        email: 'prueba@universidad.edu.pe',
        university: 'Universidad Genérica',
        career: 'Mi Carrera Ideal',
        interests: 'Estudiar, Aprender, Conectar'
    };

    let createdGroups = [
        { name: 'Grupo de Estudio: Cálculo I', members: 8, description: 'Apoyo para ejercicios y dudas de Cálculo I.', type: 'estudio' },
        { name: 'Club de Lectura Universitario', members: 15, description: 'Reuniones semanales para discutir libros.', type: 'social' }
    ];
      function showSection(id) {
        pageSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
        pageTitle.textContent = document.getElementById(id).querySelector('h2') ? document.getElementById(id).querySelector('h2').textContent : id.charAt(0).toUpperCase() + id.slice(1);

        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.querySelector('.app-container').classList.remove('sidebar-open');
        }

        if (id === 'profile') {
            updateProfileDisplay();
        }
        if (id === 'groups') {
            renderGroupList(); 
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === id) {
                link.classList.add('active');
            }
        });
    }
    
    function updateProfileDisplay() {
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileUniversity').textContent = currentUser.university;
        document.getElementById('profileCareer').textContent = currentUser.career;
        document.getElementById('profileInterests').textContent = currentUser.interests;

        document.getElementById('editName').value = currentUser.name;
        document.getElementById('editUniversity').value = currentUser.university;
        document.getElementById('editCareer').value = currentUser.career;
        document.getElementById('editInterests').value = currentUser.interests;
    }
        function renderGroupList() {
        if (currentGroupList) { 
            currentGroupList.innerHTML = ''; 
            createdGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.classList.add('group-card');
                groupCard.innerHTML = `
                    <h3>${group.name}</h3>
                    <p><strong>Tipo:</strong> ${group.type.charAt(0).toUpperCase() + group.type.slice(1)}</p>
                    <p><strong>Descripción:</strong> ${group.description}</p>
                    <p><strong>Miembros:</strong> ${group.members}</p>
                    <button class="btn-secondary">Ver Detalles (Simulado)</button>
                `;
                currentGroupList.appendChild(groupCard);
            });
        } else {
            console.error("Elemento 'currentGroupList' no encontrado. Asegúrate de que el ID es correcto en app.html.");
        }
    }
    

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    document.querySelectorAll('[data-section-btn]').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.sectionBtn;
            showSection(sectionId);
        });
    });
 menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        document.querySelector('.app-container').classList.toggle('sidebar-open');
    });
    
       function showAuthScreen(mode) {
        isRegisterMode = (mode === 'register');
        if (isRegisterMode) {
            authTitle.textContent = 'Regístrate';
            passwordField.classList.remove('hidden');
            nameUniversityCareerFields.classList.remove('hidden');
            authSubmitBtn.textContent = 'Crear Cuenta';
            toggleAuthText.textContent = '¿Ya tienes cuenta?';
            toggleAuthLink.textContent = 'Iniciar Sesión';
        } else {
            authTitle.textContent = 'Iniciar Sesión';
            passwordField.classList.remove('hidden');
            nameUniversityCareerFields.classList.add('hidden');
            authSubmitBtn.textContent = 'Ingresar';
            toggleAuthText.textContent = '¿No tienes cuenta?';
            toggleAuthLink.textContent = 'Regístrate';
        }
        authMessage.style.display = 'none';
        authMessage.classList.remove('success', 'error');
        authForm.reset();
        authScreen.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }



                          
