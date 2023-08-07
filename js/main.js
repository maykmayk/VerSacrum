const _app = {}

_app.getDate = () => {
    function getCurrentDateFormatted() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    const formattedDate = getCurrentDateFormatted();
    document.getElementById('date').innerText = formattedDate;
}

_app.startUp = () => {
    
    window.addEventListener('load', () => {
        // La funzione viene chiamata quando tutti gli elementi della pagina sono stati caricati
      
        // Simuliamo il caricamento della pagina per 3 secondi
        setTimeout(() => {
          // Nascondi il loader impostando l'opacità a 0
          const loader = document.getElementById('loader');
          loader.style.opacity = '0';
      
          // Nascondi il loader completamente dopo 1 secondo
          setTimeout(() => {
            loader.style.display = 'none';
          }, 1000);
          
        }, 3000);
      
        // Aggiorna il numero di caricamento da 0 a 100 con curva di Bezier
        const loader = document.getElementById('loader');
        const numLoader = document.getElementById('numLoader');
        const duration = 1000; // Tempo in millisecondi per il caricamento completo
        let startTime = null;
      
        function bezier(t) {
          return t * t * (3 - 2 * t); // Funzione di curva di Bezier
        }
      
        function updateLoader(timestamp) {
          if (!startTime) {
            startTime = timestamp;
          }
      
          const progress = Math.min(1, (timestamp - startTime) / duration); // Progresso normalizzato tra 0 e 1
          const bezierValue = bezier(progress); // Calcola la curva di Bezier
      
          numLoader.textContent = Math.floor(bezierValue * 100); // Calcola il valore del numero con curva di Bezier
      
          if (progress < 1) {
            // Ripeti la funzione per aggiornare il caricamento fino a quando non è completato
            requestAnimationFrame(updateLoader);
          } else {
            // Quando il caricamento raggiunge il 100%, nascondi il loader dopo 1 secondo impostando l'opacità a 0
            setTimeout(() => {
              loader.style.opacity = '0';
              // Nascondi il loader completamente dopo 1 secondo
              setTimeout(() => {
                loader.style.display = 'none';
              }, 1000);
            }, 1000);
          }
        }
      
        // Avvia l'aggiornamento del loader
        requestAnimationFrame(updateLoader);
    });

    _app.getDate();

    const images = document.querySelectorAll('[id^="img"]');
    const originalSrcs = [];

    for (let i = 0; i < images.length; i++) {
        originalSrcs[i] = images[i].src;

        images[i].addEventListener("mouseover", () => {
            images[i].src = `./asset/images/fullSize/tee${i + 1}Back.png`;
        });

        images[i].addEventListener("mouseout", () => {
            images[i].src = originalSrcs[i];
        });
    }
};

_app.startUp();