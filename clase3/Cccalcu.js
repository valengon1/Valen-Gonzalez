function realizarOperacion(operacion) {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);

    if (isNaN(numero1) || isNaN(numero2)) {
        document.getElementById("resultado").textContent = "Entrada inválida";
        return;
    }

    let resultado;

    switch (operacion) {
        case "sumar":
            resultado = numero1 + numero2;
            break;
        case "restar":
            resultado = numero1 - numero2;
            break;
        case "multiplicar":
            resultado = numero1 * numero2;
            break;
        case "dividir":
            if (numero2 === 0) {
                document.getElementById("resultado").textContent = "No se puede dividir por cero";
                return;
            }
            resultado = numero1 / numero2;
            break;
        default:
            document.getElementById("resultado").textContent = "Operación no válida";
            return;
    }

    document.getElementById("resultado").textContent = resultado.toFixed(2);

}


document.getElementById("sumar").addEventListener("click", function() {
    realizarOperacion("sumar");
});

document.getElementById("restar").addEventListener("click", function() {
    realizarOperacion("restar");
});

document.getElementById("multiplicar").addEventListener("click", function() {
    realizarOperacion("multiplicar");
});
document.getElementById("dividir").addEventListener("click", function() {
    realizarOperacion("dividir");
});