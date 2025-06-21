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

                          
