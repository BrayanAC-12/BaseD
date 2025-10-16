// CONFIGURACIÓN JSONBIN.IO
const JSONBIN_CONFIG = {
    binId: '68f0ddebd0ea881f40a6269b',
    apiKey: '$2a$10$sVWKg80byS4NMWj81WY1FulKY.w141aBAkErH7zIDzLChIlCda12q', // Reemplaza con tu API key
    baseUrl: 'https://api.jsonbin.io/v3/b'
};

// DATOS INICIALES
const initialWeeksData = [
    { 
        id: 1, 
        title: "Diagrama y Práctica", 
        files: ["WEEK_01.DXE"], 
        status: "completed", 
        content: "Contenido completo de diagramas y prácticas de la semana 1.\n\nIncluye:\n- Diagramas conceptuales\n- Ejercicios prácticos\n- Casos de estudio\n- Material complementario",
        elements: ["COMPLETADO", "Diagrama", "Práctica"],
        fileData: [],
        customLinks: [
            {
                text: "Arquitectura de Base Datos",
                url: "https://github.com/BrayanAC-12/BasedeDatos/blob/main/Semana1/Arquitecturas%20de%20Bases%20de%20Datos%20Cliente-Servidor%20vs.%20Distribuidas.pdf",
                type: "primary"
            },
            {
                text: "Manual Git Hub",
                url: "https://github.com/BrayanAC-12/BasedeDatos/blob/main/Semana1/Manual%20para%20Crear%20una%20Cuenta%20en%20GitHub.docx",
                type: "secondary"
            },
            {
                text: "Manual Subir Git Hub",
                url: "https://github.com/BrayanAC-12/BasedeDatos/blob/main/Semana1/Manual%20para%20Subir%20una%20P%C3%A1gina%20Web%20a%20Git%20Hub.docx",
                type: "secondary"
            }
        ]
    },
    { 
        id: 2, 
        title: "Modelo Relacional", 
        files: [], 
        status: "pending", 
        content: "Contenido sobre modelos relacionales de bases de datos.\n\nTemas:\n- Conceptos fundamentales\n- Normalización\n- Claves primarias y foráneas",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 3, 
        title: "Tablas y Relaciones", 
        files: [], 
        status: "pending", 
        content: "Implementación de tablas y relaciones en bases de datos.\n\nContenido:\n- Creación de tablas\n- Definición de relaciones\n- Integridad referencial",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 4, 
        title: "SQL Básico", 
        files: [], 
        status: "pending", 
        content: "Introducción al lenguaje SQL y consultas básicas.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 5, 
        title: "Consultas Avanzadas", 
        files: [], 
        status: "pending", 
        content: "Consultas SQL avanzadas y optimización.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 6, 
        title: "Normalización", 
        files: [], 
        status: "pending", 
        content: "Procesos de normalización de bases de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 7, 
        title: "Transacciones", 
        files: [], 
        status: "pending", 
        content: "Manejo de transacciones en bases de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 8, 
        title: "Índices y Optimización", 
        files: [], 
        status: "pending", 
        content: "Creación de índices y optimización de consultas.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 9, 
        title: "Backup y Recuperación", 
        files: [], 
        status: "pending", 
        content: "Estrategias de backup y recuperación de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 10, 
        title: "Seguridad en BD", 
        files: [], 
        status: "pending", 
        content: "Medidas de seguridad y control de acceso.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 11, 
        title: "BD NoSQL", 
        files: [], 
        status: "pending", 
        content: "Introducción a bases de datos NoSQL.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 12, 
        title: "Data Warehousing", 
        files: [], 
        status: "pending", 
        content: "Conceptos de almacenes de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 13, 
        title: "Minería de Datos", 
        files: [], 
        status: "pending", 
        content: "Introducción a la minería de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 14, 
        title: "BD Distribuidas", 
        files: [], 
        status: "pending", 
        content: "Bases de datos distribuidas y replicación.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 15, 
        title: "Proyecto Final - Parte 1", 
        files: [], 
        status: "pending", 
        content: "Primera parte del proyecto final de bases de datos.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    },
    { 
        id: 16, 
        title: "Proyecto Final - Parte 2", 
        files: [], 
        status: "pending", 
        content: "Segunda parte y entrega del proyecto final.",
        elements: ["PENDIENTE"],
        fileData: [],
        customLinks: []
    }
];

// ESTADO DE LA APLICACIÓN
let currentUser = null;
let isAdmin = false;
let weeksData = [];
let currentWeekViewing = null;
let filesToUpload = [];

// INICIALIZAR APLICACIÓN
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
async function initApp() {
    await loadData();
    setupNavigation();
    setupEventListeners();
    renderWeeks();
    populateWeekSelect();
    checkAuthStatus();
    
    console.log('Sistema iniciado correctamente');
}

// CARGAR DATOS DESDE JSONBIN.IO
async function loadData() {
    try {
        console.log('🔄 Cargando datos desde JSONBin.io...');
        
        const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/${JSONBIN_CONFIG.binId}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': JSONBIN_CONFIG.apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.record && data.record.weeks) {
                weeksData = data.record.weeks;
                console.log('✅ Datos cargados desde JSONBin.io:', weeksData);
                mostrarMensaje('adminMessage', '✅ Datos sincronizados desde la nube', 'success');
            } else {
                throw new Error('Estructura de datos inválida');
            }
        } else {
            throw new Error('Error al cargar datos remotos');
        }
    } catch (error) {
        console.warn('⚠️ No se pudieron cargar datos remotos, usando datos locales:', error);
        
        // Fallback a localStorage
        const savedWeeks = localStorage.getItem('weeksData');
        if (savedWeeks) {
            weeksData = JSON.parse(savedWeeks);
            console.log('📁 Datos cargados desde localStorage');
        } else {
            weeksData = JSON.parse(JSON.stringify(initialWeeksData));
            console.log('📝 Usando datos iniciales');
        }
        
        mostrarMensaje('adminMessage', '⚠️ Usando datos locales (modo offline)', 'error');
    }
    
    // Cargar usuario
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isAdmin = currentUser.role === 'admin';
    }
}

// GUARDAR DATOS EN JSONBIN.IO
async function saveData() {
    const dataToSave = {
        weeks: weeksData,
        lastUpdated: new Date().toISOString(),
        version: '1.0'
    };

    // Guardar en localStorage primero
    localStorage.setItem('weeksData', JSON.stringify(weeksData));

    // Intentar guardar en JSONBin.io
    try {
        console.log('💾 Guardando datos en JSONBin.io...');
        
        const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/${JSONBIN_CONFIG.binId}`, {
            method: 'PUT',
            headers: {
                'X-Master-Key': JSONBIN_CONFIG.apiKey,
                'Content-Type': 'application/json',
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify(dataToSave)
        });

        if (response.ok) {
            console.log('✅ Datos guardados en JSONBin.io');
            mostrarMensaje('adminMessage', '✅ Datos guardados y sincronizados en la nube', 'success');
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.warn('⚠️ No se pudo guardar en JSONBin.io, solo se guardó localmente:', error);
        mostrarMensaje('adminMessage', '⚠️ Datos guardados localmente (sin conexión)', 'error');
    }
}

// SINCRONIZAR DATOS
async function syncData() {
    console.log('🔄 Sincronizando datos...');
    mostrarMensaje('adminMessage', '🔄 Sincronizando con JSONBin.io...', 'success');
    
    await loadData();
    renderWeeks();
    populateWeekSelect();
}

// CONFIGURAR NAVEGACIÓN
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            mostrarSeccion(targetId);
        });
    });
    
    // Mostrar sección inicial
    mostrarSeccion('inicio');
}

// CONFIGURAR EVENT LISTENERS
function setupEventListeners() {
    // Botones de navegación
    const verTrabajosBtn = document.getElementById('verTrabajosBtn');
    const volverTrabajosBtn = document.getElementById('volverTrabajosBtn');
    
    if (verTrabajosBtn) {
        verTrabajosBtn.addEventListener('click', function() {
            mostrarSeccion('trabajos');
        });
    }
    
    if (volverTrabajosBtn) {
        volverTrabajosBtn.addEventListener('click', function() {
            mostrarSeccion('trabajos');
        });
    }
    
    // Botones de login/logout
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            abrirModal('loginModal');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Formularios
    const loginForm = document.getElementById('loginForm');
    const adminForm = document.getElementById('adminForm');
    const contactForm = document.getElementById('contactForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (adminForm) {
        adminForm.addEventListener('submit', handleSaveContent);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            mostrarMensaje('adminMessage', '📧 Mensaje enviado correctamente (simulado)', 'success');
            this.reset();
        });
    }
    
    // Botones admin
    const deleteContentBtn = document.getElementById('deleteContent');
    const clearFormBtn = document.getElementById('clearForm');
    
    if (deleteContentBtn) {
        deleteContentBtn.addEventListener('click', handleDeleteContent);
    }
    
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', clearAdminForm);
    }
    
    // Upload de archivos
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileSelect);
    }
    
    // Cerrar modales
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                cerrarModal(modal.id);
            }
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            cerrarModal(e.target.id);
        }
    });
}

// MOSTRAR SECCIÓN
function mostrarSeccion(sectionId) {
    console.log('Mostrando sección:', sectionId);
    
    // Oculta todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remueve active de todos los links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Muestra la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activa el link correspondiente
    const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Scroll suave a la sección
    if (targetSection) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// RENDERIZAR SEMANAS
function renderWeeks() {
    const weeksContainer = document.getElementById('weeksContainer');
    if (!weeksContainer) return;
    
    weeksContainer.innerHTML = '';
    
    weeksData.forEach(week => {
        const card = document.createElement('div');
        card.className = 'trabajo-card';
        
        const statusClass = week.status === 'completed' ? 'status-completed' : 'status-pending';
        const statusText = week.status === 'completed' ? 'COMPLETADO' : 'PENDIENTE';
        
        card.innerHTML = `
            <div class="trabajo-header">
                <div class="week-number">${week.id.toString().padStart(2, '0')}</div>
                <div class="status ${statusClass}">${statusText}</div>
            </div>
            
            <div class="week-title">${week.title}</div>
            
            ${week.elements.length > 0 ? `
                <ul class="week-files">
                    ${week.elements.map(element => `<li>${element}</li>`).join('')}
                </ul>
            ` : '<p style="color: #6c757d; font-style: italic;">No hay contenido disponible</p>'}
            
            <div class="trabajo-actions">
                <button class="btn-primary ver-trabajo" data-week="${week.id}">
                    👁️ Ver Trabajo
                </button>
                ${isAdmin ? `
                    <button class="btn-secondary editar-trabajo" data-week="${week.id}">
                    ✏️ Editar
                    </button>
                ` : ''}
            </div>
        `;
        
        weeksContainer.appendChild(card);
    });
    
    // Event listeners para botones dinámicos
    document.querySelectorAll('.ver-trabajo').forEach(btn => {
        btn.addEventListener('click', function() {
            const weekId = parseInt(this.getAttribute('data-week'));
            verTrabajo(weekId);
        });
    });
    
    if (isAdmin) {
        document.querySelectorAll('.editar-trabajo').forEach(btn => {
            btn.addEventListener('click', function() {
                const weekId = parseInt(this.getAttribute('data-week'));
                editarTrabajo(weekId);
            });
        });
    }
}

// LLENAR SELECTOR DE SEMANAS
function populateWeekSelect() {
    const weekSelect = document.getElementById('weekSelect');
    if (!weekSelect) return;
    
    weekSelect.innerHTML = '<option value="">-- Elegir semana --</option>';
    weeksData.forEach(week => {
        const option = document.createElement('option');
        option.value = week.id;
        option.textContent = `Semana ${week.id.toString().padStart(2, '0')} - ${week.title}`;
        weekSelect.appendChild(option);
    });
}

// VERIFICAR AUTENTICACIÓN
function checkAuthStatus() {
    updateUI();
}

// ACTUALIZAR INTERFAZ
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminNavLink = document.getElementById('adminNavLink');
    
    if (!loginBtn || !logoutBtn || !adminNavLink) return;
    
    if (isAdmin) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        adminNavLink.classList.remove('hidden');
    } else if (currentUser) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        adminNavLink.classList.add('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        adminNavLink.classList.add('hidden');
    }
    
    renderWeeks();
}

// MANEJAR LOGIN
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let message = '';
    let type = 'success';
    
    if (username === 'admin' && password === 'admin123') {
        currentUser = { username: 'admin', role: 'admin' };
        isAdmin = true;
        message = '✅ Login exitoso como administrador';
    } else if (username === 'usuario' && password === 'user123') {
        currentUser = { username: 'usuario', role: 'user' };
        isAdmin = false;
        message = '✅ Login exitoso como usuario';
    } else {
        message = '❌ Credenciales incorrectas';
        type = 'error';
    }
    
    if (type === 'success') {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUI();
        cerrarModal('loginModal');
        mostrarSeccion('trabajos');
    }
    
    mostrarMensaje('loginMessage', message, type);
}

// CERRAR SESIÓN
function logout() {
    currentUser = null;
    isAdmin = false;
    localStorage.removeItem('currentUser');
    updateUI();
    mostrarSeccion('inicio');
    mostrarMensaje('loginMessage', '👋 Sesión cerrada correctamente', 'success');
}

// ABRIR MODAL
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// CERRAR MODAL
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// VER TRABAJO COMPLETO
function verTrabajo(weekId) {
    const week = weeksData.find(w => w.id === weekId);
    
    if (!week || week.status === 'pending') {
        mostrarMensaje('loginMessage', '📭 Esta semana no tiene contenido disponible', 'error');
        return;
    }
    
    currentWeekViewing = weekId;
    document.getElementById('modalTitle').textContent = `Semana ${weekId.toString().padStart(2, '0')} - ${week.title}`;
    
    let contentHTML = `
        <div class="contenido-semana">
            <h4>📋 Descripción del trabajo:</h4>
            <div class="contenido-texto">
                ${week.content.replace(/\n/g, '<br>')}
            </div>
    `;
    
    // AGREGAR BOTONES PERSONALIZADOS
    if (week.customLinks && week.customLinks.length > 0) {
        contentHTML += `
            <h4>🔗 Enlaces del trabajo:</h4>
            <div class="button-group cyber-buttons" style="margin: 15px 0;">
                ${week.customLinks.map(link => 
                    `<a href="${link.url}" class="custom-button cyber-btn ${link.type || 'primary'}" target="_blank" rel="noopener">${link.text}</a>`
                ).join('')}
            </div>
        `;
    }
    
    if (week.files.length > 0) {
        contentHTML += `
            <h4>📁 Archivos adjuntos:</h4>
            <ul>
                ${week.files.map(file => `<li>${file}</li>`).join('')}
            </ul>
        `;
    }
    
    contentHTML += `</div>`;
    
    document.getElementById('modalBody').innerHTML = contentHTML;
    
    // Configurar descargas
    setupDownloadOptions(week);
    
    abrirModal('contentModal');
}

// CONFIGURAR OPCIONES DE DESCARGA
function setupDownloadOptions(week) {
    const fileDownloads = document.getElementById('fileDownloads');
    if (!fileDownloads) return;
    
    fileDownloads.innerHTML = '';
    
    if (week.files.length > 0) {
        week.files.forEach(fileName => {
            const downloadLink = document.createElement('a');
            downloadLink.href = '#';
            downloadLink.className = 'download-link';
            downloadLink.textContent = `📥 ${fileName}`;
            downloadLink.onclick = (e) => {
                e.preventDefault();
                descargarArchivoSimulado(fileName, week.content);
            };
            fileDownloads.appendChild(downloadLink);
        });
    }
}

// DESCARGAR ARCHIVO SIMULADO
function descargarArchivoSimulado(fileName, content) {
    const contenido = `Archivo: ${fileName}\n\nDescripción:\n${content}\n\nGenerado automáticamente por el sistema.`;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// MANEJAR SELECCIÓN DE ARCHIVOS
function handleFileSelect(e) {
    filesToUpload = Array.from(e.target.files);
    updateFilePreview();
}

// ACTUALIZAR VISTA PREVIA DE ARCHIVOS
function updateFilePreview() {
    const fileList = document.getElementById('fileList');
    const uploadPreview = document.getElementById('uploadPreview');
    
    if (!fileList || !uploadPreview) return;
    
    fileList.innerHTML = '';
    
    if (filesToUpload.length > 0) {
        uploadPreview.classList.remove('hidden');
        filesToUpload.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>📄 ${file.name}</span>
                <button onclick="removeFile(${index})" class="btn-danger" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;">×</button>
            `;
            fileList.appendChild(fileItem);
        });
    } else {
        uploadPreview.classList.add('hidden');
    }
}

// ELIMINAR ARCHIVO DE LA LISTA
function removeFile(index) {
    filesToUpload.splice(index, 1);
    document.getElementById('fileUpload').value = '';
    updateFilePreview();
}

// EDITAR TRABAJO
function editarTrabajo(weekId) {
    const week = weeksData.find(w => w.id === weekId);
    if (!week) return;
    
    document.getElementById('weekSelect').value = week.id;
    document.getElementById('contentTitle').value = week.title;
    document.getElementById('contentDescription').value = week.content;
    
    filesToUpload = [];
    updateFilePreview();
    
    // CARGAR ENLACES PERSONALIZADOS
    loadCustomLinksToForm(week.customLinks || []);
    
    if (week.status === 'completed') {
        document.getElementById('deleteContent').classList.remove('hidden');
    } else {
        document.getElementById('deleteContent').classList.add('hidden');
    }
    
    mostrarSeccion('admin');
}

// GUARDAR CONTENIDO
async function handleSaveContent(e) {
    e.preventDefault();
    
    const weekId = parseInt(document.getElementById('weekSelect').value);
    const title = document.getElementById('contentTitle').value;
    const description = document.getElementById('contentDescription').value;
    
    if (!weekId || !title) {
        mostrarMensaje('adminMessage', '❌ Completa todos los campos obligatorios', 'error');
        return;
    }
    
    const weekIndex = weeksData.findIndex(w => w.id === weekId);
    if (weekIndex === -1) return;
    
    // OBTENER ENLACES PERSONALIZADOS
    const customLinks = getCustomLinksFromForm();
    
    // Actualizar datos
    weeksData[weekIndex].title = title;
    weeksData[weekIndex].content = description;
    weeksData[weekIndex].status = 'completed';
    weeksData[weekIndex].customLinks = customLinks;
    
    // Procesar archivos
    if (filesToUpload.length > 0) {
        const newFiles = filesToUpload.map(file => file.name);
        weeksData[weekIndex].files = [...weeksData[weekIndex].files, ...newFiles];
        weeksData[weekIndex].elements = ["COMPLETADO", ...newFiles.map(f => f.split('.')[0]), "Práctica"];
    }
    
    await saveData();
    renderWeeks();
    populateWeekSelect();
    document.getElementById('deleteContent').classList.remove('hidden');
    
    mostrarMensaje('adminMessage', '✅ Contenido guardado exitosamente', 'success');
    
    // Limpiar después de guardar
    setTimeout(() => {
        clearAdminForm();
        mostrarSeccion('trabajos');
    }, 2000);
}

// ELIMINAR CONTENIDO
async function handleDeleteContent() {
    const weekId = parseInt(document.getElementById('weekSelect').value);
    const weekIndex = weeksData.findIndex(w => w.id === weekId);
    
    if (weekIndex !== -1 && confirm('¿Estás seguro de eliminar el contenido de esta semana?')) {
        weeksData[weekIndex] = {
            ...weeksData[weekIndex],
            files: [],
            fileData: [],
            status: 'pending',
            content: '',
            elements: [],
            customLinks: []
        };
        
        await saveData();
        renderWeeks();
        populateWeekSelect();
        clearAdminForm();
        
        mostrarMensaje('adminMessage', '✅ Contenido eliminado correctamente', 'success');
    }
}

// LIMPIAR FORMULARIO
function clearAdminForm() {
    document.getElementById('adminForm').reset();
    filesToUpload = [];
    updateFilePreview();
    document.getElementById('customLinksContainer').innerHTML = '';
    document.getElementById('deleteContent').classList.add('hidden');
}

// MOSTRAR MENSAJES
function mostrarMensaje(elementId, mensaje, tipo) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div style="padding: 10px; border-radius: 5px; margin: 10px 0; background: ${tipo === 'success' ? '#d4edda' : '#f8d7da'}; color: ${tipo === 'success' ? '#155724' : '#721c24'}; border: 1px solid ${tipo === 'success' ? '#c3e6cb' : '#f5c6cb'};">${mensaje}</div>`;
        setTimeout(() => {
            if (element) element.innerHTML = '';
        }, 3000);
    }
}

// FUNCIONES PARA MANEJAR ENLACES PERSONALIZADOS
function addCustomLink() {
    const container = document.getElementById('customLinksContainer');
    const linkId = Date.now();
    
    const linkHTML = `
        <div class="custom-link-item" data-id="${linkId}">
            <div class="form-row">
                <div class="form-group">
                    <label>Texto del botón:</label>
                    <input type="text" class="link-text" placeholder="Ej: Tabla comparativo" value="">
                </div>
                <div class="form-group">
                    <label>URL:</label>
                    <input type="url" class="link-url" placeholder="https://..." value="">
                </div>
            </div>
            <div class="form-group">
                <label>Tipo de botón:</label>
                <select class="link-type">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="accent">Accent</option>
                </select>
            </div>
            <button type="button" class="btn-danger remove-link-btn" data-id="${linkId}">
                Eliminar Enlace
            </button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', linkHTML);
    
    const removeBtn = container.querySelector(`[data-id="${linkId}"] .remove-link-btn`);
    removeBtn.addEventListener('click', function() {
        removeCustomLink(linkId);
    });
}

function removeCustomLink(linkId) {
    const linkElement = document.querySelector(`[data-id="${linkId}"]`);
    if (linkElement) {
        linkElement.remove();
    }
}

function getCustomLinksFromForm() {
    const links = [];
    const linkItems = document.querySelectorAll('.custom-link-item');
    
    linkItems.forEach(item => {
        const text = item.querySelector('.link-text').value;
        const url = item.querySelector('.link-url').value;
        const type = item.querySelector('.link-type').value;
        
        if (text && url) {
            links.push({ text, url, type });
        }
    });
    
    return links;
}

function loadCustomLinksToForm(links) {
    const container = document.getElementById('customLinksContainer');
    container.innerHTML = '';
    
    if (links && links.length > 0) {
        links.forEach(link => {
            addCustomLink();
            const lastItem = container.lastElementChild;
            if (lastItem) {
                lastItem.querySelector('.link-text').value = link.text;
                lastItem.querySelector('.link-url').value = link.url;
                lastItem.querySelector('.link-type').value = link.type || 'primary';
            }
        });
    }
}

// Hacer funciones globales para HTML
window.mostrarSeccion = mostrarSeccion;
window.cerrarModal = cerrarModal;
window.removeFile = removeFile;
window.abrirModal = abrirModal;
window.addCustomLink = addCustomLink;
window.removeCustomLink = removeCustomLink;

window.syncData = syncData;
