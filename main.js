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
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782881895/Aimg14_kauomk.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782881897/Aimg4_cqw85r.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782881898/Aimg2_wxisj2.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782881898/Aimg3_fn4sug.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882510/Aimg1_sg3az9.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882511/Aimg6_klxnzx.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882512/Aimg7_iyqm31.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882513/Aimg8_zrjghf.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882515/Aimg9_knkdl8.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882517/Aimg10_ifuogh.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882518/Aimg11_u6mjfn.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882520/Aimg12_zjkgms.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882522/Aimg13_yeqncm.jpg'
        ]
    },
    {
        titulo: 'Airbnb',
        descripcion: 'Estancias pensadas para conversiones y reservas.',
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882984/Bimg11_eohcoe.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882984/Bimg1_ihr30d.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882985/Bimg4_tqo1kx.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882986/Bimg5_dgblhr.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882988/Bimg6_i4zsok.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882990/Bimg7_fch0mp.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882991/Bimg8_gpojwl.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882993/Bimg10_izfvke.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882995/Bimg9_vuxm3l.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882996/Bimg3_ontfdg.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782882998/Bimg2_brbovb.jpg'
        ]
    },
    {
        titulo: 'Hotel Intercontinental',
        descripcion: 'Escenas amplias, elegantes y de alto impacto visual.',
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883395/Cimg2_ndutlf.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883396/Cimg4_dmpupu.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883409/Cimg1_h5habh.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883410/Cimg6_pxlhok.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883413/Cimg7_yumv0w.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883415/Cimg8_mmfncm.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883416/Cimg9_hloyaw.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883419/Cimg10_t9cdvq.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883421/Cimg13_p1ic52.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883423/Cimg14_q1wwuk.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883425/Cimg5_unck8j.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883426/Cimg11_u6kmsh.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883428/Cimg12_fr8cua.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883431/Cimg3_tsa3ek.jpg'
        ]
    },
    {
        titulo: 'Apartamento en Zona Norte',
        descripcion: 'Interiores luminosos con enfoque residencial moderno.',
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884352/Dimg8_cqd3ok.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884353/Dimg9_vh7zza.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884355/Dimg10_mbsw1i.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884357/Dimg11_fbqisi.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884360/Dimg12_rbyjah.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884363/Dimg13_gqr9vh.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884365/Dimg1_aiszex.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884368/Dimg3_tvumok.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884370/Dimg4_lbokqq.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884373/Dimg6_wotn9r.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884375/Dimg7_ovhf2q.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884378/Dimg2_fk6psm.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782884380/Dimg5_s0wndx.jpg'
        ]
    },
    {
        titulo: 'Pent House',
        descripcion: 'Vistas altas, acabados premium y sensación de lujo.',
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883861/Eimg3_zv52nl.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883862/Eimg6_auhtuk.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883865/Eimg5_oh9lmc.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883867/Eimg7_rvxcvr.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883870/Eimg8_vfpzk3.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883872/Eimg9_bs0nas.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883874/Eimg10_c4py8b.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883876/Eimg11_uotxl9.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883878/Eimg2_b8rhvm.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883881/Eimg1_nygoik.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883882/Eimg4_pju87k.jpg'
        ]
    },
    {
        titulo: 'Lotes',
        descripcion: 'Tomas amplias para terreno, proyección y desarrollo.',
        imagenes: [
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883885/Fimg1_wudtfo.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883888/Fimg2_dfdihw.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883890/Fimg3_hz1kdg.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883892/Fimg4_rwktt9.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883895/Fimg6_w9dbkj.jpg',
            'https://res.cloudinary.com/diedip2so/image/upload/v1782883897/Fimg5_wml2gm.jpg'
        ]
    }
];

const proyectosContainer = document.getElementById('proyectos-container');

if (proyectosContainer) {
    proyectosContainer.innerHTML = proyectosData.map((proyecto, index) => `
        <div class="group relative overflow-hidden h-[320px] md:h-[420px] rounded-[2rem] bg-neutral-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] isolate" data-project-card data-project-index="${index}" data-image-index="0">
            <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}"
                data-project-image
                class="absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ease-in-out opacity-100 scale-100 group-hover:scale-105 will-change-[opacity,transform]">
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

        image.classList.add('opacity-0', 'scale-95');

        window.setTimeout(() => {
            image.src = project.imagenes[nextIndex];
            image.alt = `${project.titulo} ${nextIndex + 1}`;
            counter.textContent = `${nextIndex + 1}/${project.imagenes.length}`;

            requestAnimationFrame(() => {
                image.classList.remove('opacity-0', 'scale-95');
            });
        }, 220);
    });
}