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

    _app.img1 = document.getElementById('img1');
    const originalSrc = img1.src;

    img1.addEventListener("mouseover", () => {
        img1.src = "./asset/images/fullSize/tee1Back.png";
    });

    img1.addEventListener("mouseout", () => {
        img1.src = originalSrc; 
    });
};

_app.startUp();