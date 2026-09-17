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
