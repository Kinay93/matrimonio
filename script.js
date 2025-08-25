// Funzione di utilità per convertire HEX in RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

// Funzione principale per applicare il tema della coppia
async function applicaTemaCoppia(coppia) {
    console.log("[Tema] Carico tema coppia:", coppia);

    // Recupero dati coppia
    const res = await fetch(`https://matrimonioapp.ew.r.appspot.com/gallery?coppia=${encodeURIComponent(coppia)}`);
    const datiCoppia = await response.json();
    console.log("[Tema] Dati coppia ricevuti:", datiCoppia);

    const sfondo = datiCoppia.sfondo;
    const sfondoSecondario = datiCoppia.sfondo_secondario;
    const font = datiCoppia.font;
    const effettoSfondo = datiCoppia.effetto_sfondo;

    // Applica font e colori
    document.body.style.color = datiCoppia.testo;
    document.body.style.fontFamily = font;

    // Applica sfondo di base
    document.body.style.background = `linear-gradient(135deg, ${sfondo}, ${sfondoSecondario})`;

    // Applica effetto sfondo (radiale ecc.)
    if (effettoSfondo === 'sfondo-radiale') {
        document.body.style.background = `radial-gradient(circle, ${sfondo}, ${sfondoSecondario})`;
    }

    // Overlay uniforme sopra l'immagine di sfondo
    let overlay = document.createElement('div');
    overlay.id = 'overlay-tema';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';
    overlay.style.backgroundColor = `rgba(${hexToRgb(sfondo)}, 0.3)`;
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.backgroundSize = 'cover';

    document.body.insertBefore(overlay, document.body.firstChild);

    console.log("[Tema] Overlay applicato");
}

// Caricamento automatico tema dalla query string
window.onload = async function () {
    console.log("[window.onload] Inizio caricamento pagina");
    const params = new URLSearchParams(window.location.search);
    const coppia = params.get('coppia');
    console.log("[window.onload] coppia:", coppia);
    if (coppia) {
        await applicaTemaCoppia(coppia);
    }
};
