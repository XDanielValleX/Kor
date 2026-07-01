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

// --- LÓGICA PARA RENDERIZAR 3 CATEGORÍAS CON CARRUSEL INTERNO ---
const proyectosData = [
    {
        titulo: 'Casa Centro Histórico',
        descripcion: 'Ambientes coloniales, patios y detalles con carácter.',
        imagenes: ['foto1.jpg', 'foto5.jpg', 'foto7.jpg', 'foto14.jpg', 'foto17.jpg']
    },
    {
        titulo: 'Airbnb',
        descripcion: 'Estancias pensadas para conversiones y reservas.',
        imagenes: ['foto2.jpg', 'foto4.jpg', 'foto6.jpg', 'foto8.jpg', 'foto9.jpeg', 'foto10.jpg', 'foto13.jpg']
    },
    {
        titulo: 'Hotel Intercontinental',
        descripcion: 'Escenas amplias, elegantes y de alto impacto visual.',
        imagenes: ['foto3.jpg', 'foto11.jpg', 'foto12.jpg', 'foto15.jpg', 'foto16.jpg', 'foto18.jpg', 'foto19.jpg', 'foto20.jpg']
    }
];

const proyectosContainer = document.getElementById('proyectos-container');

if (proyectosContainer) {
    proyectosContainer.innerHTML = proyectosData.map((proyecto, index) => `
        <div class="group relative overflow-hidden h-[320px] md:h-[420px] rounded-[2rem] bg-neutral-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] isolate" data-project-card data-project-index="${index}" data-image-index="0">
            <img src="assets/proyectos/${proyecto.imagenes[0]}" alt="${proyecto.titulo}"
                data-project-image
                class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"></div>

            <button type="button"
                data-project-action="prev"
                aria-label="Foto anterior de ${proyecto.titulo}"
                class="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition hover:bg-white/25 hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="w-5 h-5 md:w-6 md:h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button type="button"
                data-project-action="next"
                aria-label="Foto siguiente de ${proyecto.titulo}"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition hover:bg-white/25 hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="w-5 h-5 md:w-6 md:h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
                </svg>
            </button>

            <div class="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 text-white">
                <div class="flex items-end justify-between gap-4">
                    <div>
                        <h4 class="text-2xl md:text-3xl font-bold uppercase tracking-wide">${proyecto.titulo}</h4>
                        <p class="mt-2 max-w-xs text-sm md:text-base text-white/80 leading-relaxed">${proyecto.descripcion}</p>
                    </div>
                    <div class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/90 backdrop-blur-md">
                        <span data-project-counter>1/${proyecto.imagenes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    proyectosContainer.addEventListener('click', (event) => {
        const button = event.target.closest('[data-project-action]');
        if (!button) return;

        const card = button.closest('[data-project-card]');
        if (!card) return;

        const projectIndex = Number(card.dataset.projectIndex);
        const project = proyectosData[projectIndex];
        const image = card.querySelector('[data-project-image]');
        const counter = card.querySelector('[data-project-counter]');
        if (!project || !image || !counter) return;

        const currentIndex = Number(card.dataset.imageIndex || '0');
        const direction = button.dataset.projectAction === 'next' ? 1 : -1;
        const nextIndex = (currentIndex + direction + project.imagenes.length) % project.imagenes.length;

        card.dataset.imageIndex = String(nextIndex);
        image.src = `assets/proyectos/${project.imagenes[nextIndex]}`;
        image.alt = `${project.titulo} ${nextIndex + 1}`;
        counter.textContent = `${nextIndex + 1}/${project.imagenes.length}`;
    });
}