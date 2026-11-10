// REGALO PARA DANNA — Página principal V1
const openButton = document.getElementById("openButton");
const cover = document.getElementById("cover");
const music = document.getElementById("songAudio");
const musicToggle = document.getElementById("musicToggle");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");
const videoPlaceholder = document.getElementById("videoPlaceholder");


// Scroll continuo y a velocidad constante hasta el video.
let autoScrollFrame = null;
let autoScrollActive = false;

function stopAutoScroll() {
  if (!autoScrollActive) return;

  autoScrollActive = false;

  if (autoScrollFrame !== null) {
    cancelAnimationFrame(autoScrollFrame);
    autoScrollFrame = null;
  }

  document.body.classList.remove("auto-scrolling");

  // Restaurar el comportamiento original del navegador.
  document.documentElement.style.scrollBehavior = "";
  document.documentElement.style.scrollSnapType = "";

  const hint = document.getElementById("stopScrollHint");
  hint?.classList.remove("visible");
}

function startAutoScroll() {
  stopAutoScroll();

    const video = document.getElementById("video");

  if (!video) {
    console.error("No se encontró video.");
    return;
  }

  const startY = window.scrollY;

  // El video queda visible al finalizar.
  const targetY = Math.max(
    0,
    video.getBoundingClientRect().top +
    window.scrollY -
    window.innerHeight * 0.22
  );

  const distance = targetY - startY;

  if (distance <= 0) return;

  // Desactivar animaciones y ajustes automáticos del navegador.
  document.documentElement.style.scrollBehavior = "auto";
  document.documentElement.style.scrollSnapType = "none";

  autoScrollActive = true;
  document.body.classList.add("auto-scrolling");

  const hint = document.getElementById("stopScrollHint");
  hint?.classList.add("visible");

  // Velocidad constante: 40 píxeles por segundo.
  const speed = 40;
  const duration = (distance / speed) * 1000;
  const startTime = performance.now();

  function animate(now) {
    if (!autoScrollActive) return;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Movimiento lineal: sin aceleración ni desaceleración.
    const currentY = startY + distance * progress;

    window.scrollTo(0, currentY);

    if (progress < 1) {
      autoScrollFrame = requestAnimationFrame(animate);
    } else {
      stopAutoScroll();
    }
  }

  // Comienza en el siguiente cuadro de animación.
  autoScrollFrame = requestAnimationFrame(animate);
}

// Detener el recorrido ante cualquier interacción.
["wheel", "touchstart", "touchmove", "mousedown", "keydown"].forEach(event => {
  window.addEventListener(event, stopAutoScroll, { passive: true });
});

// Botón de bienvenida.
openButton?.addEventListener("click", () => {
  startAutoScroll();

  // Los detalles visuales ya no retrasan el inicio del recorrido.
  createHearts(7);

  if (music) {
    music.play().catch(() => {});
  }
});


// Aparición progresiva de secciones al entrar en pantalla.
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

// Control manual de música.
function updateMusicButton() {
  const playing = !music.paused;
  musicToggle.classList.toggle("playing", playing);
  musicToggle.setAttribute("aria-label", playing ? "Pausar música" : "Activar música");
  musicToggle.querySelector(".music-label").textContent = playing ? "Pausar" : "Música";
}
musicToggle?.addEventListener("click", async () => {
  if (!music) return;
  if (music.paused) {
    try { await music.play(); } catch (error) {
      musicToggle.querySelector(".music-label").textContent = "Añade audio";
    }
  } else {
    music.pause();
  }
  updateMusicButton();
});
music?.addEventListener("play", updateMusicButton);
music?.addEventListener("pause", updateMusicButton);

// Revelación final.
surpriseButton?.addEventListener("click", () => {
  surpriseMessage.classList.add("show");
  surpriseButton.textContent = "♡";
  surpriseButton.disabled = true;
  createHearts(24);
});

// Si más adelante se reemplaza el placeholder por un video, pausar música al iniciar.
videoPlaceholder?.addEventListener("click", () => {
  // Este bloque es intencionalmente un placeholder. Al insertar un iframe de YouTube,
  // conectar aquí el evento de reproducción del video para pausar la música.
});

function createHearts(amount = 10) {
  const symbols = ["♡", "♥", "✧"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${55 + Math.random() * 35}vh`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDelay = `${Math.random() * .8}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 4500);
  }
}

// =====================================
// LETRA BILINGÜE — A THOUSAND YEARS
// =====================================

// =====================================
// LETRA BILINGÜE — A THOUSAND YEARS
// =====================================

const lyrics = [
  // Primera estrofa
  {
    start: 8.64,
    original: "I was a kid looking for love, full of hope inside",
    translation: "Yo era un niño buscando el amor, lleno de esperanza por dentro"
  },
  {
    start: 12.52,
    original: "But time was never kind to me, my heart grew cold as ice",
    translation: "Pero el tiempo nunca fue amable conmigo, mi corazón se enfrió como el hielo"
  },
  {
    start: 16.76,
    original: "All out of luck, thought I was stuck, alone for all my life",
    translation: "Sin suerte, pensé que estaba estancado, solo por el resto de mi vida"
  },
  {
    start: 20.87,
    original: "But I was proven wrong the moment I looked in your eyes",
    translation: "Pero me equivoqué en el momento en que te miré a los ojos"
  },

  // Primer estribillo
  {
    start: 25.10,
    original: "It's true, until I'm in the grave",
    translation: "Es verdad, hasta que esté en la tumba"
  },
  {
    start: 29.39,
    original: "Darling, I'll love you",
    translation: "Mi amor, te amaré"
  },
  {
    start: 31.60,
    original: "For a thousand years, dear",
    translation: "Por mil años, mi amor"
  },
  {
    start: 35.77,
    original: "Time is nothing when I'm here with you, oh-oh-ooh",
    translation: "El tiempo no es nada cuando estoy aquí contigo, oh-oh-ooh"
  },
  {
    start: 41.04,
    original: "All my fears, tears, those memories, they disappear with you, oh-oh-ooh",
    translation: "Todos mis miedos, lágrimas, esos recuerdos, desaparecen contigo, oh-oh-ooh"
  },
  {
    start: 49.40,
    original: "Till I turn into dust, I'll carry this love, my dear",
    translation: "Hasta que me convierta en polvo, llevaré este amor, querida mía"
  },
  {
    start: 56.87,
    original: "For a thousand years",
    translation: "Por mil años"
  },

  // Segunda estrofa
  {
    start: 67.30,
    original: "Saw very soon, something will bloom, like a lotus flower",
    translation: "Vi que muy pronto algo florecerá, como una flor de loto"
  },
  {
    start: 71.25,
    original: "The bluest Moon will soon be Sun and turn to golden hour",
    translation: "La luna más azul pronto se convertirá en sol y llegará la hora dorada"
  },
  {
    start: 74.92,
    original: "Hours and days, lost in your gaze, losing track of time",
    translation: "Horas y días, perdidos en tu mirada, perdiendo la noción del tiempo"
  },
  {
    start: 79.63,
    original: "Learning how to slow it down, appreciate our lives",
    translation: "Aprendiendo a ir más despacio y a apreciar nuestras vidas"
  },

  // Segundo estribillo
  {
    start: 83.60,
    original: "Just know, until I'm in the grave",
    translation: "Solo sé que, hasta que esté en la tumba"
  },
  {
    start: 87.84,
    original: "Darling, I'll love you",
    translation: "Mi amor, te amaré"
  },
  {
    start: 89.98,
    original: "For a thousand years, dear",
    translation: "Por mil años, mi amor"
  },
  {
    start: 94.31,
    original: "Time is nothing when I'm here with you, oh-oh-ooh",
    translation: "El tiempo no es nada cuando estoy aquí contigo, oh-oh-ooh"
  },
  {
    start: 99.46,
    original: "All my fears, tears, those memories, they disappear with you, oh-oh-ooh",
    translation: "Todos mis miedos, lágrimas, esos recuerdos, desaparecen contigo, oh-oh-ooh"
  },
  {
    start: 107.99,
    original: "Till I turn into dust, I'll carry this love, my dear",
    translation: "Hasta que me convierta en polvo, llevaré este amor, querida mía"
  },
  {
    start: 115.33,
    original: "For a thousand years",
    translation: "Por mil años"
  },

  // Puente musical
  {
    start: 120.53,
    original: "Oh-ooh, ayy",
    translation: "Oh-ooh, ayy"
  },
  {
    start: 121.82,
    original: "Set it all on fire (ay, ay, ay)",
    translation: "Préndelo todo en llamas (ay, ay, ay)"
  },
  {
    start: 123.81,
    original: "Set it all on fire (ay, ay, ay)",
    translation: "Préndelo todo en llamas (ay, ay, ay)"
  },

  {
    start: 125.60,
    original: "Set it all on fire, let it burn up brighter",
    translation: "Préndelo todo en llamas, deja que arda con más intensidad"
  },

  

  {
    start: 129.87,
    original: "Love is a flame, and it's dancing away, to David playing on a lyre",
    translation: "El amor es una llama que baila al son de David tocando una lira"
  },
  
  {
    start: 134.00,
    original: "Set it all on fire, let the smoke go higher",
    translation: "Préndelo todo en llamas, deja que el humo suba más alto"
  },

  // Estribillo final
  {
    start: 138.24,
    original: "'Cause darling, I'll love you",
    translation: "Porque, mi amor, te amaré"
  },
  {
    start: 140.37,
    original: "For a thousand years, dear",
    translation: "Por mil años, mi amor"
  },
  {
    start: 144.46,
    original: "Time is nothing when I'm here with you, oh-oh-ooh",
    translation: "El tiempo no es nada cuando estoy aquí contigo, oh-oh-ooh"
  },
  {
    start: 149.64,
    original: "All my fears, tears, those memories, they disappear with you, oh-oh-ooh",
    translation: "Todos mis miedos, lágrimas, esos recuerdos, desaparecen contigo, oh-oh-ooh"
  },
  {
    start: 158.32,
    original: "Till the air leaves my lungs, with each breath, I'll hold you near",
    translation: "Hasta que el aire abandone mis pulmones, con cada respiración te mantendré cerca"
  },
  {
    start: 166.81,
    original: "Till I turn into dust, I'll carry this love, my dear",
    translation: "Hasta que me convierta en polvo, llevaré este amor, querida mía"
  },
  {
    start: 174.24,
    original: "For a thousand years",
    translation: "Por mil años"
  }
];

// =====================================
// REPRODUCTOR MUSICAL — DANNA
// =====================================

const songAudio = document.getElementById("songAudio");
const songPlayButton = document.getElementById("songPlayButton");
const songPlayIcon = document.getElementById("songPlayIcon");

const songProgress = document.getElementById("songProgress");
const songCurrentTime = document.getElementById("songCurrentTime");
const songDuration = document.getElementById("songDuration");

const lyricOriginal = document.getElementById("lyricOriginal");
const lyricTranslation = document.getElementById("lyricTranslation");
const lyricDisplay = document.querySelector(".lyric-display");

// =====================================
// SINCRONIZACIÓN DE LA LETRA
// =====================================

let currentLyricIndex = -1;

function updateSynchronizedLyrics() {
    if (!songAudio || !lyrics.length) return;

    const currentTime = songAudio.currentTime;

    // Buscar el último verso cuyo tiempo de inicio ya haya llegado.
    let activeIndex = -1;

    for (let i = 0; i < lyrics.length; i++) {
        if (
            lyrics[i].start !== null &&
            currentTime >= lyrics[i].start
        ) {
            activeIndex = i;
        }
    }

    // No actualizar si todavía no corresponde mostrar otro verso.
    if (activeIndex === -1 || activeIndex === currentLyricIndex) {
        return;
    }

    currentLyricIndex = activeIndex;

    const activeLyric = lyrics[activeIndex];

    // Transición suave entre versos.
    lyricDisplay.classList.add("changing");

    window.setTimeout(() => {
        lyricOriginal.textContent = activeLyric.original;
        lyricTranslation.textContent = activeLyric.translation;

        lyricDisplay.classList.remove("changing");
    }, 250);
}

// Formato de tiempo: minutos y segundos.
function formatSongTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Reproducir y pausar.
songPlayButton?.addEventListener("click", async () => {
    if (!songAudio) return;

    if (songAudio.paused) {
        try {
            await songAudio.play();
        } catch (error) {
            console.error("No se pudo reproducir la canción:", error);
        }
    } else {
        songAudio.pause();
    }
});

// Actualizar ambos controles cuando comienza la canción.
songAudio?.addEventListener("play", () => {
    songPlayIcon.textContent = "Ⅱ";
    songPlayButton.setAttribute("aria-label", "Pausar canción");

    updateMusicButton();
});

// Actualizar ambos controles cuando se pausa la canción.
songAudio?.addEventListener("pause", () => {
    songPlayIcon.textContent = "▶";
    songPlayButton.setAttribute("aria-label", "Reproducir canción");

    updateMusicButton();
});

// Cargar duración.
songAudio?.addEventListener("loadedmetadata", () => {
    songDuration.textContent = formatSongTime(songAudio.duration);
});

// Actualizar barra y tiempo.
songAudio?.addEventListener("timeupdate", () => {
    if (!songAudio.duration) return;

    const progress = (songAudio.currentTime / songAudio.duration) * 100;

    songProgress.value = progress;
    songCurrentTime.textContent = formatSongTime(songAudio.currentTime);

    updateSynchronizedLyrics();
});
// Permitir adelantar o retroceder.
songProgress?.addEventListener("input", () => {
    if (!songAudio.duration) return;

    songAudio.currentTime =
        (Number(songProgress.value) / 100) * songAudio.duration;
});

// Reiniciar barra al terminar.
songAudio?.addEventListener("ended", () => {
    songProgress.value = 0;
    songCurrentTime.textContent = "0:00";
});


// GALERÍA DE MENSAJES
let wasMusicPlayingBeforeVideo = false;
const giftVideoCards = document.querySelectorAll(".gift-video-card");
const giftVideoModal = document.getElementById("giftVideoModal");
const giftVideoPlayer = document.getElementById("giftVideoPlayer");
const giftVideoClose = document.getElementById("giftVideoClose");
const giftVideoTitle = document.getElementById("giftVideoTitle");

giftVideoCards.forEach(card => {
  card.addEventListener("click", () => {
    const videoSource = card.dataset.video;

    giftVideoTitle.textContent = card.dataset.name;
    wasMusicPlayingBeforeVideo = !music.paused;

if (wasMusicPlayingBeforeVideo) {
  music.pause();
  updateMusicButton();
}

    giftVideoPlayer.src = videoSource;
    giftVideoModal.classList.add("active");
    giftVideoModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    giftVideoPlayer.load();
    giftVideoPlayer.play().catch(() => {});
  });
});

function closeGiftVideo() {
  giftVideoPlayer.pause();
  giftVideoPlayer.removeAttribute("src");
  giftVideoPlayer.load();

  giftVideoModal.classList.remove("active");
  giftVideoModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
  if (wasMusicPlayingBeforeVideo) {
  music.play().catch(() => {});
  updateMusicButton();
  wasMusicPlayingBeforeVideo = false;
}
}

giftVideoClose.addEventListener("click", closeGiftVideo);

giftVideoModal.addEventListener("click", event => {
  if (event.target === giftVideoModal) {
    closeGiftVideo();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && giftVideoModal.classList.contains("active")) {
    closeGiftVideo();
  }
});

// FADE OUT DE LA MÚSICA AL LLEGAR A LOS VIDEOS

let musicFadeTimer = null;

function fadeOutMusic() {
  if (!music || music.paused || musicFadeTimer) return;

  const initialVolume = music.volume;
  const duration = 3000;
  const steps = 30;
  const interval = duration / steps;
  let currentStep = 0;

  musicFadeTimer = setInterval(() => {
    currentStep++;

    music.volume = Math.max(
      0,
      initialVolume * (1 - currentStep / steps)
    );

    if (currentStep >= steps) {
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;

      music.pause();
      music.volume = initialVolume;
    }
  }, interval);
}

// Detectar cuándo llegamos a la galería de videos
const videoSection = document.getElementById("video");

if (videoSection) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fadeOutMusic();
        videoObserver.disconnect();
      }
    });
  }, {
    threshold: 0.25
  });

  videoObserver.observe(videoSection);
}