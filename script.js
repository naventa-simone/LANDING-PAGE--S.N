document.addEventListener('DOMContentLoaded', () => { 
     
    // 1. FUNCIONALIDAD DE NAVEGACIÓN (SPA - Single Page Application) 
    const navLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links .btn-contact'); 
    const sections = document.querySelectorAll('.content-section'); 
 
    navLinks.forEach(link => { 
        link.addEventListener('click', (e) => { 
            e.preventDefault(); 
             
            // Remover clase active de todos los enlaces del menú 
            navLinks.forEach(l => l.classList.remove('active')); 
             
            // Determinar a qué ID apunta el enlace 
            const targetId = link.getAttribute('href').substring(1); 
 
            // CASO ESPECIAL: BOTÓN DE CONTACTO 
            if (link.classList.contains('btn-contact') || targetId === 'contacto') { 
                // Forzar activar el enlace visual de "Home" en el menú 
                document.querySelector('.nav-links a[href="#home"]').classList.add('active'); 
                 
                // Ocultar todas las secciones y mostrar únicamente el Home 
                sections.forEach(section => section.classList.remove('active')); 
                const homeSection = document.getElementById('home'); 
                homeSection.classList.add('active'); 
 
                // Hacer scroll suave directo hacia el contenedor del Formulario 
                const formContainer = document.getElementById('contacto'); 
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
 
                // Colocar el cursor automáticamente en el primer input (Nombre) 
                setTimeout(() => { 
                    document.getElementById('nombre').focus(); 
                }, 600); 
 
            } else { 
                // CASO GENERAL: ENLACES NORMALES DEL MENÚ (Home, Product, Resources, Blog) 
                link.classList.add('active'); 
 
                // Ocultar todas las secciones y mostrar la seleccionada 
                sections.forEach(section => section.classList.remove('active')); 
                const targetSection = document.getElementById(targetId); 
                if (targetSection) { 
                    targetSection.classList.add('active'); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                } 
            } 
        }); 
    }); 
 
    // 2. MANEJO / VALIDACIÓN DEL FORMULARIO 
    const leadForm = document.getElementById('leadForm'); 
    if(leadForm) { 
        leadForm.addEventListener('submit', (e) => { 
            e.preventDefault(); 
            const nombre = document.getElementById('nombre').value; 
            alert(`¡Excelente ${nombre}! Te has registrado correctamente en Creenfit Nutrition.`); 
            leadForm.reset(); 
        }); 
    } 
 
    // 3. CONTADOR DE VISITAS PERSISTENTE 
    let visits = localStorage.getItem('creenfit_visits'); 
    if (!visits) { 
        visits = 1; 
    } else { 
        visits = parseInt(visits) + 1; 
    } 
    localStorage.setItem('creenfit_visits', visits); 
    document.getElementById('counter-display').textContent = visits; 
 
    // 4. RELOJ Y FECHA EN TIEMPO REAL 
    function updateClock() { 
        const now = new Date(); 
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
        const dateStr = now.toLocaleDateString('es-ES', optionsDate); 
        const timeStr = now.toLocaleTimeString('es-ES'); 
         
        document.getElementById('clock-display').textContent = `${dateStr}, ${timeStr}`; 
    } 
     
    setInterval(updateClock, 1000); 
    updateClock();  
});