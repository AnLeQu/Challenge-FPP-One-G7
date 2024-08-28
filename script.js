function encriptar(texto) {
    const teclado = "qwertyuiopasdfghjklñzxcvbnm";
    const vocales = "aeiou";
    let resultado = "";
    let contadorVocal = 0;
    let usarDesplazamiento2 = true; // Alternar entre +2 y +4

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i].toLowerCase();

        if (teclado.includes(char)) {
            // 
            let indice = teclado.indexOf(char);
            let desplazamiento = usarDesplazamiento2 ? 2 : 4;
            let nuevoChar = teclado[(indice + desplazamiento) % teclado.length];
            resultado += nuevoChar;
            // Alternar el desplazamiento entre +2 y +4
            usarDesplazamiento2 = !usarDesplazamiento2;

            // Añadir vocal solo si no es el último carácter de la palabra
            if (i < texto.length - 1 && teclado.includes(texto[i + 1].toLowerCase())) {
            resultado += vocales[contadorVocal % 5];
            contadorVocal++;
            }
        } else if (char === " ") {
            // Mantener el espacio y reiniciar la secuencia de desplazamiento
            resultado += char;
            usarDesplazamiento2 = true; // Reiniciar secuencia después de un espacio
        } else {
            // Si no es una letra ni un espacio, mantenerlo igual
            resultado += char;
        }
    }

    return resultado;
}
function desencriptar(textoEncriptado) {
    const teclado = "qwertyuiopasdfghjklñzxcvbnm";
    let resultado = "";
    let usarDesplazamiento2 = true; // Alternar entre -2 y -4

    for (let i = 0; i < textoEncriptado.length;) {
        let char = textoEncriptado[i];

        if (teclado.includes(char)) {
            let indice = teclado.indexOf(char);
            let desplazamiento = usarDesplazamiento2 ? -2 : -4;
            let charOriginal = teclado[(indice + desplazamiento + teclado.length) % teclado.length];
            resultado += charOriginal;

            // Alternar el desplazamiento entre -2 y -4
            usarDesplazamiento2 = !usarDesplazamiento2;

            // Verificar si el siguiente carácter es una vocal y saltarlo
            if (i + 1 < textoEncriptado.length && "aeiou".includes(textoEncriptado[i + 1])) {
                i += 2; // Saltar la vocal y pasar al siguiente carácter
            } else {
                i++; // No hay vocal, pasar al siguiente carácter
            }
        } else if (char === " ") {
            // Mantener el espacio y reiniciar la secuencia de desplazamiento
            resultado += char;
            usarDesplazamiento2 = true; // Reiniciar secuencia después de un espacio
            i++;
        } else {
            // Mantener caracteres que no están en el teclado
            resultado += char;
            i++;
    }
}
    return resultado;
}


document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const copyBtn = document.getElementById('copyBtn');

    encryptBtn.addEventListener('click', function() {
        const texto = inputText.value;
        const textoEncriptado = encriptar(texto);
        outputText.value = textoEncriptado;
    });

    decryptBtn.addEventListener('click', function() {
        const textoEncriptado = inputText.value;
        const textoDesencriptado = desencriptar(textoEncriptado);
        outputText.value = textoDesencriptado;
    });

    copyBtn.addEventListener('click', function() {
        outputText.select();
        document.execCommand('copy');
        alert('Texto copiado al portapapeles');
    });
});
