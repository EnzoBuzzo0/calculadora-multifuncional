function somar() {
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);

    let resultado = numero1 + numero2;

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function subtrair() {
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);

    let resultado = numero1 - numero2;

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function multiplicar() {
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);

    let resultado = numero1 * numero2;

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function dividir() {
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);

    if (numero2 === 0) {
        document.getElementById("resultado").innerHTML = "Não é possível dividir por zero.";
        return;
    }

    let resultado = numero1 / numero2;

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function porcentagem() {
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);

    let resultado = (numero1 * numero2) / 100;

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado + "%";
}

// Novos métodos adicionados:

function raizQuadrada() {
    let numero1 = Number(document.getElementById("numero1").value);

    if (numero1 < 0) {
        document.getElementById("resultado").innerHTML = "Não existe raiz de número negativo no conjunto dos reais.";
        return;
    }

    let resultado = Math.sqrt(numero1);
    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function seno() {
    let numero1 = Number(document.getElementById("numero1").value);
    // Converte de graus para radianos
    let radianos = (numero1 * Math.PI) / 180;
    let resultado = Math.sin(radianos);

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado.toFixed(6);
}

function cosseno() {
    let numero1 = Number(document.getElementById("numero1").value);
    // Converte de graus para radianos
    let radianos = (numero1 * Math.PI) / 180;
    let resultado = Math.cos(radianos);

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado.toFixed(6);
}

function tangente() {
    let numero1 = Number(document.getElementById("numero1").value);
    
    if ((numero1 - 90) % 180 === 0) {
        document.getElementById("resultado").innerHTML = "Tangente indefinida para esse ângulo.";
        return;
    }

    // Converte de graus para radianos
    let radianos = (numero1 * Math.PI) / 180;
    let resultado = Math.tan(radianos);

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado.toFixed(6);
}

function logaritmo() {
    let numero1 = Number(document.getElementById("numero1").value);

    if (numero1 <= 0) {
        document.getElementById("resultado").innerHTML = "Logaritmo indefinido para valores <= 0.";
        return;
    }

    let resultado = Math.log10(numero1);
    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;
}

function adicionarVirgula() {
    let input1 = document.getElementById("numero1");
    let input2 = document.getElementById("numero2");

    if (document.activeElement === input1 && !input1.value.includes(".")) {
        input1.value += ".";
    } else if (document.activeElement === input2 && !input2.value.includes(".")) {
        input2.value += ".";
    }
}

function limpar() {
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";
    document.getElementById("resultado").innerHTML = "Resultado:";
}
