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
    const body = document.body;
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
                    body.classList.remove('overflow-hidden'); // Abilita lo scroll rimuovendo la classe
                    body.classList.add('overflow-x-hidden'); // Abilita lo scroll rimuovendo la classe
                }, 1000);
            }, 1000);
        }
    }

    body.classList.add('overflow-hidden');

    requestAnimationFrame(updateLoader);
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
	if (productData) {
		console.log(productData)
		document.getElementById('name').innerText = productData.name;
		document.getElementById('price').innerText = productData.price;
		document.getElementById('stories').innerText = productData.stories;
		document.getElementById('productImg1').src = productData.image;
		document.getElementById('productImg2').src = productData.secondImage;
	} else {
	}
}

_app.startUp = () => {
	_app.getDate();
    window.addEventListener('load', () => {
		_app.loader();
    });

	for (let i = 1; i <= 9; i++) {
		var swiper = new Swiper(`.mySwiper${i}`, {
			loop: true,
		});
	}
	_app.redirectPageTee();
};

_app.startUp();