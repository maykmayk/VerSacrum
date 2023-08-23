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

_app.loader = () => {
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
}
_app.hoverProductTee = () => {
	const products = document.querySelectorAll('.product');

products.forEach((product) => {
    const sliderArrowLeft = product.querySelector('.sliderArrowLeft');
    const sliderArrowRight = product.querySelector('.sliderArrowRight');
    const imgElement = product.querySelector('.imgFit');
    const frontImage = product.getAttribute('data-image');
    const backImage = product.getAttribute('data-second-image');

    sliderArrowLeft.addEventListener('click', () => {
        imgElement.src = frontImage;
    });

    sliderArrowRight.addEventListener('click', () => {
        imgElement.src = backImage;
    });
});
}
_app.redirectPageTee = () => {
	const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', () => {
          const name = product.dataset.name;
          const price = product.dataset.price;
          const stories = product.dataset.stories;
          const image = product.dataset.image;
          const secondImage = product.dataset.secondImage;
    
          const productData = {
            name: name,
            price: price,
			stories: stories,
            image: image,
            secondImage: secondImage
          };
    
          sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
        });
    });
	const productData = JSON.parse(sessionStorage.getItem('selectedProduct'));
	const productImages = [productData.image, productData.secondImage];
	let currentImageIndex = 0;
	const productImg = document.getElementById('productImg');
  
	function updateImage() {
	  productImg.src = productImages[currentImageIndex];
	}
  
	if (productData) {
		updateImage();
	
		const sliderArrowLeft = document.getElementById('sliderArrowLeft');
		const sliderArrowRight = document.getElementById('sliderArrowRight');
	
		sliderArrowLeft.addEventListener('click', () => {
		  currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
		  updateImage();
		});
	
		sliderArrowRight.addEventListener('click', () => {
		  currentImageIndex = (currentImageIndex + 1) % productImages.length;
		  updateImage();
		});	
  
	  document.getElementById('name').innerText = productData.name;
	  document.getElementById('price').innerText = productData.price;
	  document.getElementById('stories').innerText = productData.stories;
	} else {
	}
}
_app.productZoom = () => {
	const container = document.getElementById("productImg");
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
}

_app.startUp = () => {
	_app.getDate();
    window.addEventListener('load', () => {
		_app.loader();
    });
	if (window.location.href.includes('product-details.html')) {
		_app.productZoom();
	}
	_app.hoverProductTee();
	_app.redirectPageTee();
};

_app.startUp();