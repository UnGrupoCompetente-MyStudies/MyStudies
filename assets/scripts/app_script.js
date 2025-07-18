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
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const passwordRecoveryFormContainer = document.getElementById('passwordRecoveryFormContainer');
    const passwordRecoveryForm = document.getElementById('passwordRecoveryForm');
    const cancelRecoveryBtn = document.getElementById('cancelRecoveryBtn');
    const recoveryMessage = document.getElementById('recoveryMessage');
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
    const messageUserList = document.getElementById('messageUserList');
    const activeChatContainer = document.getElementById('activeChatContainer');
    const chatWithName = document.getElementById('chatWithName');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const backToMessageListBtn = document.getElementById('backToMessageListBtn');
    const messageStudentBtns = document.querySelectorAll('.message-student-btn');
    const createEventBtn = document.getElementById('createEventBtn');
    const eventCreateFormContainer = document.getElementById('eventCreateFormContainer');
    const eventCreateForm = document.getElementById('eventCreateForm');
    const cancelCreateEventBtn = document.getElementById('cancelCreateEventBtn');
    const eventCreateMessage = document.getElementById('eventCreateMessage');
    const eventList = document.getElementById('eventList');
    const joinEventBtns = document.querySelectorAll('.join-event-btn');
    const createResourceBtn = document.getElementById('createResourceBtn');
    const resourceCreateFormContainer = document.getElementById('resourceCreateFormContainer');
    const resourceCreateForm = document.getElementById('resourceCreateForm');
    const cancelCreateResourceBtn = document.getElementById('cancelCreateResourceBtn');
    const resourceCreateMessage = document.getElementById('resourceCreateMessage');
    const resourceList = document.getElementById('resourceList');

    let resources = [{
        name: "Guía de Trámites Universitarios",
        description: "Todo lo que necesitas saber sobre matrículas, becas y documentos."
    }, {
        name: "Consejos para el Primer Ciclo",
        description: "Supera los desafíos iniciales con estas recomendaciones clave."
    }];

    let events = [{
        name: "Charla: Oportunidades Laborales en IA",
        date: "2025-07-25",
        time: "10:00",
        location: "Auditorio Principal",
        organizer: "Facultad de Ingeniería",
        description: "Una charla inspiradora sobre el futuro de la Inteligencia Artificial."
    }, {
        name: "Feria de Voluntariado Universitario",
        date: "2025-08-15",
        time: "09:00",
        location: "Plaza Central",
        organizer: "Bienestar Universitario",
        description: "Conoce organizaciones y cómo puedes contribuir a la comunidad."
    }];

    let conversations = {
        "Profesor XYZ": [{
            type: "received",
            text: "Hola, ¿cómo vas con el proyecto?"
        }, {
            type: "sent",
            text: "¡Todo bien! Te envío los avances mañana."
        }],
        "María Fernández": [{
            type: "received",
            text: "Nos vemos en la biblioteca a las 3."
        }, {
            type: "sent",
            text: "Ok, ahí estaré."
        }, {
            type: "received",
            text: "¿Traes los apuntes de física?"
        }],
        "Ana López": [],
        "Pedro García": []
    };

    let createdGroups = [{
        name: 'Grupo de Estudio: Cálculo I',
        members: 8,
        description: 'Apoyo para ejercicios y dudas de Cálculo I.',
        type: 'estudio'
    }, {
        name: 'Club de Lectura Universitario',
        members: 15,
        description: 'Reuniones semanales para discutir libros.',
        type: 'social'
    }];

    let currentChatRecipient = '';
    let isRegisterMode = false;

    let currentUser = {
        name: 'Estudiante Prueba',
        email: 'prueba@universidad.edu.pe',
        role: 'alumno',
        university: 'Universidad Genérica',
        career: 'Mi Carrera Ideal',
        interests: 'Estudiar, Aprender, Conectar'
    };

    const teacherUser = {
        name: 'Docente Ejemplo',
        email: 'docente@universidad.edu.pe',
        role: 'docente',
        university: 'Universidad Genérica',
        career: 'Ciencia de la Computación',
        interests: 'Inteligencia Artificial, Enseñanza, Investigación'
    };

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

        if (id === 'profile') updateProfileDisplay();
        if (id === 'groups') renderGroupList();
        if (id === 'messages') renderMessageList();
        if (id === 'events') renderEventList();
        if (id === 'resources') renderResourceList();

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === id) {
                link.classList.add('active');
            }
        });
    }

    function updateUIForRole() {
        if (currentUser.role === 'docente') {
            createEventBtn.classList.remove('hidden');
            createResourceBtn.classList.remove('hidden');
        } else {
            createEventBtn.classList.add('hidden');
            createResourceBtn.classList.add('hidden');
        }
        renderGroupList();
        renderResourceList();
        renderEventList();
        updateProfileDisplay();
    }

    function updateProfileDisplay() {
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        document.getElementById('profileUniversity').textContent = currentUser.university;
        document.getElementById('profileCareer').textContent = currentUser.career;
        document.getElementById('profileInterests').textContent = currentUser.interests;
        document.getElementById('editName').value = currentUser.name;
        document.getElementById('editUniversity').value = currentUser.university;
        document.getElementById('editCareer').value = currentUser.career;
        document.getElementById('editInterests').value = currentUser.interests;
    }

    function renderGroupList() {
        const groupListContainer = document.getElementById('groupList');
        if (groupListContainer) {
            groupListContainer.innerHTML = '';
            createdGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.classList.add('group-card');
                let buttonsHTML = '<button class="btn-secondary">Ver Detalles</button>';
                if (currentUser.role === 'docente') {
                    buttonsHTML += `<button class="btn-secondary announcement-btn" data-group-name="${group.name}">Enviar Anuncio</button>`;
                }
                groupCard.innerHTML = `
                    <h3>${group.name}</h3>
                    <p><strong>Descripción:</strong> ${group.description}</p>
                    <p><strong>Miembros:</strong> ${group.members}</p>
                    <div class="card-buttons">${buttonsHTML}</div>
                `;
                groupListContainer.appendChild(groupCard);
            });
            groupListContainer.querySelectorAll('.announcement-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const groupName = this.dataset.groupName;
                    alert(`(Simulación) Anuncio enviado al grupo: ${groupName}.`);
                });
            });
        } else {
            console.error("Elemento 'groupList' no encontrado.");
        }
    }

    function renderResourceList() {
        resourceList.innerHTML = '';
        resources.forEach(resource => {
            const resourceItem = document.createElement('div');
            resourceItem.classList.add('resource-item');
            resourceItem.innerHTML = `
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <a href="#" class="btn-secondary">Leer Guía</a>
            `;
            resourceList.appendChild(resourceItem);
        });
    }

    function renderEventList() {
        eventList.innerHTML = '';
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            const eventDate = new Date(event.date + 'T00:00:00');
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Fecha:</strong> ${eventDate.toLocaleDateString("es-ES", options)}</p>
                <p><strong>Hora:</strong> ${event.time}</p>
                <p><strong>Lugar:</strong> ${event.location}</p>
                <p><strong>Organizador:</strong> ${event.organizer}</p>
                <p>${event.description}</p>
                <button class="btn-secondary join-event-btn">Inscribirme</button>
            `;
            eventList.appendChild(eventCard);
        });
        const smallText = document.createElement('p');
        smallText.classList.add('small-text');
        smallText.textContent = '*(Eventos simulados)*';
        eventList.appendChild(smallText);
        eventList.querySelectorAll('.join-event-btn').forEach(button => {
            button.addEventListener('click', function() {
                alert('¡Inscripción simulada! Recibirás un correo de confirmación.');
                this.textContent = 'Inscrito';
                this.disabled = true;
                this.style.opacity = 0.6;
            });
        });
    }

    function openChat(recipientName) {
        currentChatRecipient = recipientName;
        chatWithName.textContent = recipientName;
        messageUserList.classList.add('hidden');
        activeChatContainer.classList.remove('hidden');
        renderMessages();
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.focus();
    }

    function renderMessages() {
        chatMessages.innerHTML = '';
        if (!conversations[currentChatRecipient]) {
            conversations[currentChatRecipient] = [];
        }
        conversations[currentChatRecipient].forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', msg.type);
            messageDiv.textContent = msg.text;
            chatMessages.appendChild(messageDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderMessageList() {
        messageUserList.innerHTML = '<h3>Tus Conversaciones</h3>';
        for (const recipient in conversations) {
            const lastMessage = conversations[recipient].length > 0 ? conversations[recipient][conversations[recipient].length - 1].text : "No hay mensajes";
            const messageCard = document.createElement('div');
            messageCard.classList.add('message-preview-card');
            messageCard.dataset.chatWith = recipient;
            messageCard.innerHTML = `
                <span class="message-preview-name">${recipient}</span>
                <span class="message-preview-last-msg">${lastMessage}</span>
            `;
            messageUserList.appendChild(messageCard);
            messageCard.addEventListener('click', () => openChat(recipient));
        }
    }

    messageStudentBtns.forEach(button => {
        button.addEventListener('click', function() {
            const studentName = this.dataset.studentName;
            showSection('messages');
            openChat(studentName);
        });
    });

    sendMessageBtn.addEventListener('click', function() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            if (!conversations[currentChatRecipient]) {
                conversations[currentChatRecipient] = [];
            }
            conversations[currentChatRecipient].push({
                type: "sent",
                text: messageText
            });
            renderMessages();
            chatInput.value = '';
            setTimeout(() => {
                const simulatedResponses = ["Ok, entendido.", "Genial, gracias por la info.", "¿Algo más en lo que pueda ayudarte?", "Sí, lo reviso ahora mismo."];
                const randomResponse = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
                conversations[currentChatRecipient].push({
                    type: "received",
                    text: randomResponse
                });
                renderMessages();
            }, 1000 + Math.random() * 1500);
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });

    backToMessageListBtn.addEventListener('click', function() {
        activeChatContainer.classList.add('hidden');
        messageUserList.classList.remove('hidden');
        renderMessageList();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        passwordRecoveryFormContainer.classList.remove('hidden');
        passwordRecoveryFormContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
        recoveryMessage.classList.add('hidden');
        passwordRecoveryForm.reset();
    });

    cancelRecoveryBtn.addEventListener("click", () => {
        passwordRecoveryFormContainer.classList.remove("active");
        setTimeout(() => {
            passwordRecoveryFormContainer.classList.add("hidden");
            document.body.style.overflow = "auto";
        }, 300);
    });

    passwordRecoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        recoveryMessage.classList.add('hidden');
        recoveryMessage.classList.remove('error', 'success');
        const recoveryEmail = document.getElementById('recoveryEmail').value;
        const universityEmailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        if (!recoveryEmail || !universityEmailPattern.test(recoveryEmail)) {
            recoveryMessage.textContent = 'Por favor, ingresa un correo electrónico universitario válido.';
            recoveryMessage.classList.add('error');
            recoveryMessage.classList.remove('hidden');
            return;
        }
        recoveryMessage.textContent = `Si el correo "${recoveryEmail}" está registrado, recibirás instrucciones.`;
        recoveryMessage.classList.add('success');
        recoveryMessage.classList.remove('hidden');
        setTimeout(() => {
            passwordRecoveryFormContainer.classList.remove('active');
            recoveryMessage.classList.add('hidden');
            setTimeout(() => {
                passwordRecoveryFormContainer.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }, 3000);
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
            forgotPasswordLink.classList.add("hidden");
            nameUniversityCareerFields.classList.remove('hidden');
            authSubmitBtn.textContent = 'Crear Cuenta';
            toggleAuthText.textContent = '¿Ya tienes cuenta?';
            toggleAuthLink.textContent = 'Iniciar Sesión';
        } else {
            authTitle.textContent = 'Iniciar Sesión';
            passwordField.classList.remove('hidden');
            nameUniversityCareerFields.classList.add('hidden');
            authSubmitBtn.textContent = 'Ingresar';
            forgotPasswordLink.classList.remove("hidden");
            toggleAuthText.textContent = '¿No tienes cuenta?';
            toggleAuthLink.textContent = 'Regístrate';
        }
        authMessage.style.display = 'none';
        authMessage.classList.remove('success', 'error');
        authForm.reset();
        authScreen.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideAuthScreen() {
        authScreen.style.display = 'none';
        document.getElementById("passwordRecoveryFormContainer").classList.add("hidden");
        document.getElementById("passwordRecoveryFormContainer").classList.remove("active");
        document.body.style.overflow = "auto";
        updateUIForRole();
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('register') === 'true') {
        showAuthScreen('register');
    } else {
        showAuthScreen('login');
    }

    toggleAuthLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthScreen(isRegisterMode ? 'login' : 'register');
    });

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authMessage.style.display = 'none';
        authMessage.classList.remove('success', 'error');
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const universityEmailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        if (!universityEmailPattern.test(email)) {
            authMessage.textContent = 'Por favor, ingresa un correo electrónico válido (ej. tu@universidad.edu.pe).';
            authMessage.classList.add('error');
            authMessage.style.display = 'block';
            return;
        }

        if (!isRegisterMode && email.toLowerCase() === teacherUser.email) {
            currentUser = { ...teacherUser
            };
            authMessage.textContent = `Bienvenido, ${currentUser.name}. Redirigiendo...`;
            authMessage.classList.add('success');
            authMessage.style.display = 'block';
            userNameDisplay.textContent = currentUser.name;
            setTimeout(() => {
                hideAuthScreen();
                showSection('dashboard');
            }, 1500);
            return;
        }

        if (isRegisterMode) {
            const name = document.getElementById('authName').value;
            const university = document.getElementById('authUniversity').value;
            const career = document.getElementById('authCareer').value;
            const interests = document.getElementById('authInterests').value;
            const role = document.querySelector('input[name="authRole"]:checked').value;
            if (email && password && name && university && career) {
                authMessage.textContent = '¡Registro exitoso! Iniciando sesión...';
                authMessage.classList.add('success');
                authMessage.style.display = 'block';
                currentUser = {
                    name,
                    email,
                    university,
                    career,
                    interests,
                    role
                };
                setTimeout(() => {
                    hideAuthScreen();
                    userNameDisplay.textContent = currentUser.name;
                    showSection('dashboard');
                }, 1500);
            } else {
                authMessage.textContent = 'Por favor, completa todos los campos para registrarte.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
            }
        } else {
            if (email && password) {
                authMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
                authMessage.classList.add('success');
                authMessage.style.display = 'block';
                currentUser.email = email;
                currentUser.role = 'alumno';
                userNameDisplay.textContent = currentUser.name;
                setTimeout(() => {
                    hideAuthScreen();
                    showSection('dashboard');
                }, 1500);
            } else {
                authMessage.textContent = 'Por favor, ingresa tu correo y contraseña.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
            }
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        currentUser = {
            name: 'Estudiante',
            email: '',
            role: 'alumno',
            university: '',
            career: '',
            interests: ''
        };
        userNameDisplay.textContent = 'Estudiante';
        showAuthScreen('login');
        updateUIForRole();
    });

    editProfileBtn.addEventListener('click', function() {
        profileEditFormContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    cancelEditProfileBtn.addEventListener('click', function() {
        profileEditFormContainer.classList.add('hidden');
        profileEditMessage.classList.add('hidden');
        document.body.style.overflow = '';
    });

    profileEditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        profileEditMessage.classList.add('hidden');
        profileEditMessage.classList.remove('error', 'success');
        const newName = document.getElementById('editName').value;
        const newUniversity = document.getElementById('editUniversity').value;
        const newCareer = document.getElementById('editCareer').value;
        const newInterests = document.getElementById('editInterests').value;
        if (newName && newUniversity && newCareer && newInterests) {
            currentUser.name = newName;
            currentUser.university = newUniversity;
            currentUser.career = newCareer;
            currentUser.interests = newInterests;
            updateProfileDisplay();
            profileEditMessage.textContent = '¡Perfil actualizado con éxito!';
            profileEditMessage.classList.add('success');
            profileEditMessage.classList.remove('hidden');
            setTimeout(() => {
                profileEditFormContainer.classList.add('hidden');
                profileEditMessage.classList.add('hidden');
                document.body.style.overflow = '';
            }, 1500);
        } else {
            profileEditMessage.textContent = 'Por favor, completa todos los campos.';
            profileEditMessage.classList.add('error');
            profileEditMessage.classList.remove('hidden');
        }
    });

    createGroupBtn.addEventListener('click', function() {
        groupCreateFormContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    cancelCreateGroupBtn.addEventListener('click', function() {
        groupCreateFormContainer.classList.add('hidden');
        groupCreateMessage.classList.add('hidden');
        groupCreateForm.reset();
        document.body.style.overflow = '';
    });

    groupCreateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        groupCreateMessage.classList.add('hidden');
        groupCreateMessage.classList.remove('error', 'success');
        const groupName = document.getElementById('groupName').value;
        const groupType = document.getElementById('groupType').value;
        const groupDescription = document.getElementById('groupDescription').value;
        if (groupName && groupType && groupDescription) {
            const newGroup = {
                name: groupName,
                type: groupType,
                description: groupDescription,
                members: 1
            };
            createdGroups.push(newGroup);
            renderGroupList();
            groupCreateMessage.textContent = `¡Grupo "${groupName}" creado con éxito!`;
            groupCreateMessage.classList.add('success');
            groupCreateMessage.classList.remove('hidden');
            groupCreateForm.reset();
            setTimeout(() => {
                groupCreateFormContainer.classList.add('hidden');
                groupCreateMessage.classList.add('hidden');
                document.body.style.overflow = '';
            }, 1500);
        } else {
            groupCreateMessage.textContent = 'Por favor, completa todos los campos para crear el grupo.';
            groupCreateMessage.classList.add('error');
            groupCreateMessage.classList.remove('hidden');
        }
    });

    createEventBtn.addEventListener('click', function() {
        eventCreateFormContainer.classList.remove('hidden');
        eventCreateFormContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
        eventCreateMessage.classList.add('hidden');
        eventCreateForm.reset();
    });

    cancelCreateEventBtn.addEventListener('click', function() {
        eventCreateFormContainer.classList.remove('active');
        setTimeout(() => {
            eventCreateFormContainer.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    });

    eventCreateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        eventCreateMessage.classList.add('hidden');
        eventCreateMessage.classList.remove('error', 'success');
        const newEvent = {
            name: document.getElementById('eventName').value.trim(),
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value.trim(),
            organizer: document.getElementById('eventOrganizer').value.trim(),
            description: document.getElementById('eventDescription').value.trim()
        };
        if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location) {
            eventCreateMessage.textContent = 'Por favor, completa los campos requeridos (Nombre, Fecha, Hora, Lugar).';
            eventCreateMessage.classList.add('error');
            eventCreateMessage.classList.remove('hidden');
            return;
        }
        events.push(newEvent);
        eventCreateMessage.textContent = '¡Evento creado con éxito (simulado)!';
        eventCreateMessage.classList.add('success');
        eventCreateMessage.classList.remove('hidden');
        renderEventList();
        setTimeout(() => {
            eventCreateFormContainer.classList.remove('active');
            eventCreateMessage.classList.add('hidden');
            setTimeout(() => {
                eventCreateFormContainer.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }, 2000);
    });

    createResourceBtn.addEventListener('click', function() {
        resourceCreateFormContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    cancelCreateResourceBtn.addEventListener('click', function() {
        resourceCreateFormContainer.classList.add('hidden');
        document.body.style.overflow = '';
        resourceCreateForm.reset();
    });

    resourceCreateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const resourceName = document.getElementById('resourceName').value.trim();
        const resourceDescription = document.getElementById('resourceDescription').value.trim();
        if (resourceName && resourceDescription) {
            resources.push({
                name: resourceName,
                description: resourceDescription
            });
            renderResourceList();
            resourceCreateMessage.textContent = '¡Recurso creado con éxito!';
            resourceCreateMessage.classList.add('success');
            resourceCreateMessage.classList.remove('hidden');
            resourceCreateForm.reset();
            setTimeout(() => {
                resourceCreateFormContainer.classList.add('hidden');
                resourceCreateMessage.classList.add('hidden');
                document.body.style.overflow = '';
            }, 1500);
        } else {
            resourceCreateMessage.textContent = 'Por favor, completa todos los campos.';
            resourceCreateMessage.classList.add('error');
            resourceCreateMessage.classList.remove('hidden');
        }
    });

    showAuthScreen(urlParams.get('register') === 'true' ? 'register' : 'login');
    updateUIForRole();
});