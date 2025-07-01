const inp = document.querySelector('#qrInput');
const genBtn = document.querySelector('#generateBtn');
const qrPopup = document.querySelector('#qrPopup');
const qrImg = document.querySelector('#qrImg');  // This ID was missing in HTML
const downloadBtn = document.querySelector('#downloadBtn');
const closeBtn = document.querySelector('#closeBtn');
const mainContainer = document.querySelector('#mainContainer');

const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

genBtn.addEventListener('click', () => {
    if (!inp.value) {
        alert("Enter text or URL first!");
    } else {
        const imgUrl = url + encodeURIComponent(inp.value); // encodeURIComponent is safer
        qrImg.setAttribute('src', imgUrl);
        setTimeout(() => {
            qrPopup.classList.add('show');
            mainContainer.classList.add('opacity');
        }, 1000);
    }
});

downloadBtn.addEventListener('click', () => {
    const imgUrl = url + encodeURIComponent(inp.value);
    fetch(imgUrl)
        .then((res) => res.blob())
        .then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Fix: should be URL not url
            link.download = 'qr.jpg';
            document.body.appendChild(link);  // safer to append first
            link.click();
            document.body.removeChild(link);  // clean up
        });
});

closeBtn.addEventListener('click', () => {
    qrPopup.classList.remove('show');
    mainContainer.classList.remove('opacity');
});
