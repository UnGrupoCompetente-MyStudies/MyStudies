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
    const authEmailField = document.getElementById('authEmail');
    const authPasswordField = document.getElementById('authPassword');
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
    const currentGroupList = document.querySelector('#groups .group-list');

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

    // **New constant for the event filters wrapper**
    const eventFiltersWrapper = document.getElementById('eventFiltersWrapper');
    const eventDateFilter = document.getElementById('eventDateFilter');
    const eventCategoryFilter = document.getElementById('eventCategoryFilter');
    const eventLocationFilter = document.getElementById('eventLocationFilter');
    const applyEventFiltersBtn = document.getElementById('applyEventFiltersBtn');
    const clearEventFiltersBtn = document.getElementById('clearEventFiltersBtn');

    const appModals = [
        passwordRecoveryFormContainer,
        profileEditFormContainer,
        groupCreateFormContainer,
        eventCreateFormContainer
    ];

    let events = [
        {
            name: "Charla: Oportunidades Laborales en IA",
            date: "2025-07-25",
            time: "10:00 AM",
            location: "Auditorio Principal",
            organizer: "Facultad de Ingeniería",
            description: "Una charla inspiradora sobre el futuro de la Inteligencia Artificial.",
            category: "Académico"
        },
        {
            name: "Feria de Voluntariado Universitario",
            date: "2025-08-15",
            time: "09:00 AM - 05:00 PM",
            location: "Plaza Central",
            organizer: "Bienestar Universitario",
            description: "Conoce organizaciones y cómo puedes contribuir a la comunidad.",
            category: "Social"
        },
        {
            name: "Torneo de eSports",
            date: "2025-08-20",
            time: "04:00 PM",
            location: "Sala de Cómputo B",
            organizer: "Club de Videojuegos",
            description: "Torneo de League of Legends y Valorant.",
            category: "Deportivo"
        },
        {
            name: "Concierto de la Orquesta Universitaria",
            date: "2025-09-10",
            time: "08:00 PM",
            location: "Teatro Universitario",
            organizer: "Cultura U",
            description: "Noche de música clásica y moderna.",
            category: "Cultural"
        }
    ];

    let conversations = {
        "Profesor XYZ": [
            { type: "received", text: "Hola, ¿cómo vas con el proyecto?" },
            { type: "sent", text: "¡Todo bien! Te envío los avances mañana." }
        ],
        "María Fernández": [
            { type: "received", text: "Nos vemos en la biblioteca a las 3." },
            { type: "sent", text: "Ok, ahí estaré." },
            { type: "received", text: "¿Traes los apuntes de física?" }
        ],
        "Ana López": [],
        "Pedro García": []
    };

    let currentChatRecipient = '';
    let isRegisterMode = false;

    let currentUser = {
        name: 'Estudiante Prueba',
        email: 'yo@universidad.edu.pe',
        university: 'Universidad Genérica',
        career: 'Mi Carrera Ideal',
        interests: 'Estudiar, Aprender, Conectar'
    };

    let createdGroups = [
        { name: 'Grupo de Estudio: Cálculo I', members: 8, description: 'Apoyo para ejercicios y dudas de Cálculo I.', type: 'estudio' },
        { name: 'Club de Lectura Universitario', members: 15, description: 'Reuniones semanales para discutir libros.', type: 'social' }
    ];

    function showModal(modalElement) {
        appModals.forEach(modal => {
            if (modal && modal !== modalElement && modal.classList.contains('active')) {
                hideModal(modal);
            }
        });
        if (modalElement) {
            modalElement.classList.remove('hidden');
            setTimeout(() => {
                modalElement.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            setTimeout(() => {
                modalElement.classList.add('hidden');
                const anyAppModalActive = appModals.some(modal => modal && modal.classList.contains('active'));
                if (!anyAppModalActive && authScreen.classList.contains('hidden')) {
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    }

    function showSection(id) {
        pageSections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
            pageTitle.textContent = targetSection.querySelector('h2') ? targetSection.querySelector('h2').textContent : id.charAt(0).toUpperCase() + id.slice(1);
        }

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

        if (id === 'messages') {
            messageUserList.classList.remove('hidden');
            activeChatContainer.classList.add('hidden');
            renderMessageList();
        }

        // **Handle visibility of event filters and list based on the active section**
        if (id === 'events') {
            if (eventFiltersWrapper) {
                eventFiltersWrapper.classList.remove('hidden'); // Show filters
            }
            renderEventList(); // Render events
        } else {
            if (eventFiltersWrapper) {
                eventFiltersWrapper.classList.add('hidden'); // Hide filters
            }
            if (eventList) {
                eventList.innerHTML = ''; // Clear event list when not on events page
            }
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

    function renderEventList(filteredEvents = events) {
        if (!eventList) return;
        eventList.innerHTML = '';

        if (filteredEvents.length === 0) {
            eventList.innerHTML = '<p>No se encontraron eventos con los filtros aplicados.</p>';
        } else {
            filteredEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');
                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Fecha:</strong> ${event.date}</p>
                    <p><strong>Hora:</strong> ${event.time}</p>
                    <p><strong>Lugar:</strong> ${event.location}</p>
                    <p><strong>Organizador:</strong> ${event.organizer}</p>
                    <p><strong>Categoría:</strong> ${event.category}</p>
                    <p>${event.description}</p>
                    <button class="btn-secondary join-event-btn">Inscribirme</button>
                `;
                eventList.appendChild(eventCard);
            });
        }

        document.querySelectorAll('.join-event-btn').forEach(button => {
            button.addEventListener('click', function() {
                alert('¡Inscripción simulada! Recibirás un correo de confirmación (imaginario).');
                this.textContent = 'Inscrito';
                this.disabled = true;
                this.style.opacity = 0.6;
            });
        });
    }

    function applyEventFilters() {
        const dateFilter = eventDateFilter ? eventDateFilter.value : '';
        const categoryFilter = eventCategoryFilter ? eventCategoryFilter.value : '';
        const locationFilter = eventLocationFilter ? eventLocationFilter.value.toLowerCase() : '';

        const filteredEvents = events.filter(event => {
            const matchesDate = !dateFilter || event.date === dateFilter;
            const matchesCategory = !categoryFilter || event.category === categoryFilter;
            const matchesLocation = !locationFilter || event.location.toLowerCase().includes(locationFilter);

            return matchesDate && matchesCategory && matchesLocation;
        });

        renderEventList(filteredEvents);
    }

    function clearEventFilters() {
        if (eventDateFilter) eventDateFilter.value = '';
        if (eventCategoryFilter) eventCategoryFilter.value = '';
        if (eventLocationFilter) eventLocationFilter.value = '';
        renderEventList();
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
            conversations[currentChatRecipient].push({ type: "sent", text: messageText });
            renderMessages();
            chatInput.value = '';

            setTimeout(() => {
                const simulatedResponses = [
                    "Ok, entendido.",
                    "Genial, gracias por la info.",
                    "¿Algo más en lo que pueda ayudarte?",
                    "Sí, lo reviso ahora mismo."
                ];
                const randomResponse = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
                conversations[currentChatRecipient].push({ type: "received", text: randomResponse });
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
        showModal(passwordRecoveryFormContainer);
        recoveryMessage.classList.add('hidden');
        passwordRecoveryForm.reset();
    });

    cancelRecoveryBtn.addEventListener('click', function() {
        hideModal(passwordRecoveryFormContainer);
    });

    passwordRecoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        recoveryMessage.classList.add('hidden');
        recoveryMessage.classList.remove('error', 'success');

        const recoveryEmail = document.getElementById('recoveryEmail').value;
        const universityEmailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;

        if (!recoveryEmail) {
            recoveryMessage.textContent = 'Por favor, ingresa tu correo electrónico.';
            recoveryMessage.classList.add('error');
            recoveryMessage.classList.remove('hidden');
            return;
        }

        if (!universityEmailPattern.test(recoveryEmail)) {
            recoveryMessage.textContent = 'Por favor, ingresa un correo electrónico universitario válido.';
            recoveryMessage.classList.add('error');
            recoveryMessage.classList.remove('hidden');
            return;
        }

        recoveryMessage.textContent = `Si el correo "${recoveryEmail}" está registrado, recibirás instrucciones.`;
        recoveryMessage.classList.add('success');
        recoveryMessage.classList.remove('hidden');

        setTimeout(() => {
            hideModal(passwordRecoveryFormContainer);
            recoveryMessage.classList.add('hidden');
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

        authScreen.classList.remove('hidden');
        authScreen.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideAuthScreen() {
        authScreen.classList.remove('active');
        setTimeout(() => {
            authScreen.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    const urlParams = new URLSearchParams(window.location.search);
    showAuthScreen(urlParams.get('register') === 'true' ? 'register' : 'login');

    toggleAuthLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthScreen(isRegisterMode ? 'login' : 'register');
    });

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authMessage.style.display = 'none';
        authMessage.classList.remove('success', 'error');

        const email = authEmailField.value;
        const password = authPasswordField.value;

        const universityEmailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        if (!universityEmailPattern.test(email)) {
            authMessage.textContent = 'Por favor, ingresa un correo electrónico universitario válido (ej. tu@universidad.edu.pe).';
            authMessage.classList.add('error');
            authMessage.style.display = 'block';
            return;
        }

        if (isRegisterMode) {
            const name = document.getElementById('authName').value;
            const university = document.getElementById('authUniversity').value;
            const career = document.getElementById('authCareer').value;
            const interests = document.getElementById('authInterests').value;

            if (email && password && name && university && career && interests) {
                authMessage.textContent = '¡Registro exitoso! Iniciando sesión...';
                authMessage.classList.add('success');
                authMessage.style.display = 'block';

                currentUser = { name, email, university, career, interests };

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
            // Updated login logic: accepts pre-defined user or any email with 'password123'
            if (password === '123456') {
                if (email !== currentUser.email) {
                    // Simulate dynamic user creation for non-predefined emails
                    currentUser = {
                        name: email.split('@')[0], // Use email prefix as name
                        email: email,
                        university: 'Universidad Genérica',
                        career: 'Carrera (Nueva)',
                        interests: 'Intereses (Nuevos)'
                    };
                }

                authMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
                authMessage.classList.add('success');
                authMessage.style.display = 'block';

                userNameDisplay.textContent = currentUser.name;

                setTimeout(() => {
                    hideAuthScreen();
                    showSection('dashboard');
                }, 1500);
            } else {
                authMessage.textContent = 'Correo o contraseña incorrectos.';
                authMessage.classList.add('error');
                authMessage.style.display = 'block';
            }
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        currentUser = {
            name: 'Estudiante Prueba',
            email: 'prueba@universidad.edu.pe',
            university: 'Universidad Genérica',
            career: 'Mi Carrera Ideal',
            interests: 'Estudiar, Aprender, Conectar'
        };
        userNameDisplay.textContent = 'Estudiante';
        showAuthScreen('login');
    });

    editProfileBtn.addEventListener('click', function() {
        showModal(profileEditFormContainer);
    });

    cancelEditProfileBtn.addEventListener('click', function() {
        hideModal(profileEditFormContainer);
        profileEditMessage.classList.add('hidden');
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
                hideModal(profileEditFormContainer);
                profileEditMessage.classList.add('hidden');
            }, 1500);
        } else {
            profileEditMessage.textContent = 'Por favor, completa todos los campos.';
            profileEditMessage.classList.add('error');
            profileEditMessage.classList.remove('hidden');
        }
    });

    createGroupBtn.addEventListener('click', function() {
        showModal(groupCreateFormContainer);
        groupCreateForm.reset();
    });

    cancelCreateGroupBtn.addEventListener('click', function() {
        hideModal(groupCreateFormContainer);
        groupCreateMessage.classList.add('hidden');
        groupCreateForm.reset();
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
                hideModal(groupCreateFormContainer);
                groupCreateMessage.classList.add('hidden');
            }, 1500);
        } else {
            groupCreateMessage.textContent = 'Por favor, completa todos los campos para crear el grupo.';
            groupCreateMessage.classList.add('error');
            groupCreateMessage.classList.remove('hidden');
        }
    });

    createEventBtn.addEventListener('click', function() {
        showModal(eventCreateFormContainer);
        eventCreateForm.reset();
        eventCreateMessage.classList.add('hidden');
    });

    cancelCreateEventBtn.addEventListener('click', function() {
        hideModal(eventCreateFormContainer);
        eventCreateMessage.classList.add('hidden');
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
            description: document.getElementById('eventDescription').value.trim(),
            category: document.getElementById('eventCategory').value || 'Sin Categoría'
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

        // Only re-render the event list if the 'events' section is currently active
        if (document.getElementById('events').classList.contains('active')) {
            renderEventList();
        }

        setTimeout(() => {
            hideModal(eventCreateFormContainer);
            eventCreateMessage.classList.add('hidden');
        }, 2000);
    });

    // Event listeners for filters
    if (applyEventFiltersBtn) {
        applyEventFiltersBtn.addEventListener('click', applyEventFilters);
    }
    if (clearEventFiltersBtn) {
        clearEventFiltersBtn.addEventListener('click', clearEventFilters);
    }
    if (eventDateFilter) eventDateFilter.addEventListener('change', applyEventFilters);
    if (eventCategoryFilter) eventCategoryFilter.addEventListener('change', applyEventFilters);
    if (eventLocationFilter) eventLocationFilter.addEventListener('keyup', applyEventFilters);

    // Initial setup: ensure filters are hidden when the page loads
    if (eventFiltersWrapper) {
        eventFiltersWrapper.classList.add('hidden');
    }
});