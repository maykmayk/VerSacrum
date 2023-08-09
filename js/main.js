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
            requestAnimationFrame(updateLoader);
          } else {
            // Quando il caricamento raggiunge il 100%, nascondi il loader dopo 1 secondo impostando l'opacità a 0
            setTimeout(() => {
              loader.style.opacity = '0';
              setTimeout(() => {
                loader.style.display = 'none';
              }, 1000);
            }, 1000);
          }
        }
      
        // Avvia l'aggiornamento del loader
        requestAnimationFrame(updateLoader);
    });

    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', () => {
          const name = product.dataset.name;
          const price = product.dataset.price;
          const image = product.dataset.image;
          const secondImage = product.dataset.secondImage;
    
          const productData = {
            name: name,
            price: price,
            image: image,
            secondImage: secondImage
          };
    
          sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
        });
    });

    // Recupera i dati del prodotto memorizzati nella sessionStorage
    const productData = JSON.parse(sessionStorage.getItem('selectedProduct'));

    // Inserisci i dati nelle rispettive posizioni
    if (productData) {
        document.getElementById('productImg').src = productData.image;
        document.getElementById('name').innerText = productData.name;
        document.getElementById('price').innerText = productData.price;
        document.getElementById('secondProductImg').src = productData.secondImage;

        document.getElementById('secondProductImg').addEventListener('click', () => {
            // Scambia i percorsi delle immagini
            const temp = productData.image;
            productData.image = productData.secondImage;
            productData.secondImage = temp;
      
            // Aggiorna le immagini nella pagina
            document.getElementById('productImg').src = productData.image;
            document.getElementById('secondProductImg').src = productData.secondImage;
      
            // Aggiorna i dati salvati nella sessionStorage
            sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
          });
    } else {
    }

    const container = document.getElementById("imgDetail");
    const img = document.getElementById("productImg");
    container.addEventListener("mousemove", onZoom);
    container.addEventListener("mouseover", onZoom);
    container.addEventListener("mouseleave", offZoom);
    function onZoom(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = "scale(2.5)";
    }
    function offZoom(e) {
        img.style.transformOrigin = `center center`;
        img.style.transform = "scale(1)";
    }

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