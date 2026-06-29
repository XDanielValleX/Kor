// main.js

// --- Header Color Change ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.remove('bg-transparent', 'py-4');
        header.classList.add('bg-[#111]', 'py-3');
    } else {
        header.classList.add('bg-transparent', 'py-4');
        header.classList.remove('bg-[#111]', 'py-3');
    }
});

// --- LÓGICA DE SCROLLJACKING Y VIDEOS ---
const wrapper = document.getElementById('scroll-videos-wrapper');
const videoTrack = document.getElementById('video-track');
const videos = document.querySelectorAll('.tiktok-video');

let currentIndex = -1;

window.addEventListener('scroll', () => {
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();

    if (rect.top > window.innerHeight || rect.bottom < 0) {
        if (currentIndex !== -1) {
            videos.forEach(v => v.pause());
            currentIndex = -1;
        }
        return;
    }

    const scrollableDistance = rect.height - window.innerHeight;
    let scrolled = -rect.top;

    let progress = scrolled / scrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    let newIndex = 0;
    if (progress < 0.33) {
        newIndex = 0;
    } else if (progress < 0.66) {
        newIndex = 1;
    } else {
        newIndex = 2;
    }

    if (newIndex !== currentIndex) {
        currentIndex = newIndex;

        const translateY = -(currentIndex * (100 / 3));
        videoTrack.style.transform = `translateY(${translateY}%)`;

        videos.forEach((video, i) => {
            if (i === currentIndex) {
                video.play().catch(e => console.log("Bloqueo de autoplay navegador:", e));
                video.currentTime = 0;
            } else {
                video.pause();
            }
        });
    }
});

// --- LÓGICA PARA RENDERIZAR 20 PROYECTOS DINÁMICAMENTE ---
const proyectosData = [
    { img: 'foto1.jpg', titulo: 'Casa Colonial', desc: 'Centro Histórico · 2024' },
    { img: 'foto2.jpg', titulo: 'Penthouse Bocagrande', desc: 'Cartagena · 2023' },
    { img: 'foto3.jpg', titulo: 'Villa Privada', desc: 'Islas del Rosario · 2024' },
    { img: 'foto4.jpg', titulo: 'Apto Boutique', desc: 'Getsemaní · 2023' },
    { img: 'foto5.jpg', titulo: 'Casona Restaurada', desc: 'San Diego · 2024' },
    { img: 'foto6.jpg', titulo: 'Loft Moderno', desc: 'Manga · 2022' },
    { img: 'foto7.jpg', titulo: 'Hotel Boutique', desc: 'Centro Histórico · 2024' },
    { img: 'foto8.jpg', titulo: 'Casa de Verano', desc: 'Barú · 2023' },
    { img: 'foto9.jpg', titulo: 'Estudio Bohemio', desc: 'Getsemaní · 2024' },
    { img: 'foto10.jpg', titulo: 'Mansión Republicana', desc: 'Manga · 2023' },
    { img: 'foto11.jpg', titulo: 'Dúplex Marítimo', desc: 'Castillogrande · 2024' },
    { img: 'foto12.jpg', titulo: 'Villa Coral', desc: 'Islas del Rosario · 2022' },
    { img: 'foto13.jpg', titulo: 'Apartamento Luxury', desc: 'Bocagrande · 2024' },
    { img: 'foto14.jpg', titulo: 'Palacio Histórico', desc: 'La Matuna · 2023' },
    { img: 'foto15.jpg', titulo: 'Eco-Lodge', desc: 'Tierra Bomba · 2024' },
    { img: 'foto16.jpg', titulo: 'Penthouse 360°', desc: 'Castillogrande · 2023' },
    { img: 'foto17.jpg', titulo: 'Casa Lujo Piscina', desc: 'Centro Histórico · 2024' },
    { img: 'foto18.jpg', titulo: 'Cabaña Frente al Mar', desc: 'Barú · 2022' },
    { img: 'foto19.jpg', titulo: 'Suite Romántica', desc: 'San Diego · 2024' },
    { img: 'foto20.jpg', titulo: 'Resort Privado', desc: 'Islas del Rosario · 2023' }
];

const proyectosContainer = document.getElementById('proyectos-container');

if (proyectosContainer) {
    proyectosData.forEach(proyecto => {
        const tarjetaHTML = `
            <div class="group relative overflow-hidden h-[300px] md:h-[400px] cursor-pointer">
                <img src="assets/proyectos/${proyecto.img}" alt="${proyecto.titulo}"
                    class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 text-white pr-4">
                    <h4 class="text-xl font-bold uppercase">${proyecto.titulo}</h4>
                    <p class="text-sm tracking-widest text-gray-300 mt-1">${proyecto.desc}</p>
                </div>
            </div>
        `;
        proyectosContainer.innerHTML += tarjetaHTML;
    });
}