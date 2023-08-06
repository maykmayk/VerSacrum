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