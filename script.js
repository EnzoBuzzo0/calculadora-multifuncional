let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let esperandoNovoValor = false;
let ultimaExpressao = "";

const display = () => document.getElementById("display");
const expressao = () => document.getElementById("expressao");
const mensagem = () => document.getElementById("resultado");

function atualizarDisplay() {
    display().textContent = formatarNumero(valorAtual);
}

function formatarNumero(valor) {
    if (valor === "Erro") return valor;

    const numero = Number(valor);
    if (!Number.isFinite(numero)) return "Erro";

    const abs = Math.abs(numero);
    if (abs !== 0 && (abs >= 1e12 || abs < 1e-9)) {
        return numero.toExponential(8).replace(".", ",");
    }

    return Number(numero.toPrecision(12)).toString().replace(".", ",");
}

function numeroParaCalculo() {
    return Number(valorAtual);
}

function mostrarMensagem(texto = "Pronto.") {
    mensagem().textContent = texto;
}

function digitar(digito) {
    if (valorAtual === "Erro") limpar();

    if (esperandoNovoValor) {
        valorAtual = digito;
        esperandoNovoValor = false;
    } else if (valorAtual === "0") {
        valorAtual = digito;
    } else if (valorAtual.replace("-", "").replace(".", "").length < 14) {
        valorAtual += digito;
    }

    atualizarDisplay();
}

function adicionarVirgula() {
    if (esperandoNovoValor) {
        valorAtual = "0.";
        esperandoNovoValor = false;
    } else if (!valorAtual.includes(".")) {
        valorAtual += ".";
    }
    atualizarDisplay();
}

function alternarSinal() {
    if (valorAtual === "0" || valorAtual === "Erro") return;
    valorAtual = valorAtual.startsWith("-")
        ? valorAtual.slice(1)
        : "-" + valorAtual;
    atualizarDisplay();
}

function limpar() {
    valorAtual = "0";
    valorAnterior = null;
    operador = null;
    esperandoNovoValor = false;
    ultimaExpressao = "";
    expressao().textContent = "";
    atualizarDisplay();
    mostrarMensagem("Pronto.");
    limparOperadorSelecionado();
}

function escolherOperador(novoOperador) {
    if (valorAtual === "Erro") return;

    if (operador && !esperandoNovoValor) {
        calcular(false);
    }

    valorAnterior = numeroParaCalculo();
    operador = novoOperador;
    esperandoNovoValor = true;

    expressao().textContent = `${formatarNumero(valorAnterior)} ${novoOperador}`;
    mostrarMensagem("Digite o próximo número.");
    marcarOperador(novoOperador);
}

function calcular(mostrarResultado = true) {
    if (operador === null || valorAnterior === null) return;

    const atual = numeroParaCalculo();
    let resultado;

    switch (operador) {
        case "+": resultado = valorAnterior + atual; break;
        case "−": resultado = valorAnterior - atual; break;
        case "×": resultado = valorAnterior * atual; break;
        case "÷":
            if (atual === 0) {
                valorAtual = "Erro";
                expressao().textContent = "Divisão por zero";
                mostrarMensagem("Não é possível dividir por zero.");
                operador = null;
                valorAnterior = null;
                esperandoNovoValor = true;
                atualizarDisplay();
                return;
            }
            resultado = valorAnterior / atual;
            break;
    }

    if (!Number.isFinite(resultado)) {
        valorAtual = "Erro";
        mostrarMensagem("Resultado inválido.");
    } else {
        valorAtual = String(resultado);
        if (mostrarResultado) {
            expressao().textContent = `${formatarNumero(valorAnterior)} ${operador} ${formatarNumero(atual)} =`;
            mostrarMensagem("Resultado calculado.");
        }
    }

    valorAnterior = null;
    operador = null;
    esperandoNovoValor = true;
    atualizarDisplay();
    limparOperadorSelecionado();
}

function porcentagem() {
    const numero = numeroParaCalculo();

    if (valorAnterior !== null && operador) {
        valorAtual = String((valorAnterior * numero) / 100);
    } else {
        valorAtual = String(numero / 100);
    }

    atualizarDisplay();
    mostrarMensagem("Porcentagem aplicada.");
}

function aplicarFuncao(funcao) {
    if (valorAtual === "Erro") return;

    const entrada = numeroParaCalculo();
    const resultado = funcao(entrada);

    if (resultado === null || !Number.isFinite(resultado)) {
        valorAtual = "Erro";
        mostrarMensagem("Operação inválida para este valor.");
    } else {
        valorAtual = String(resultado);
        mostrarMensagem("Função científica aplicada.");
    }

    esperandoNovoValor = true;
    atualizarDisplay();
}

function raizQuadrada(numero = numeroParaCalculo()) {
    if (numero < 0) return null;
    return Math.sqrt(numero);
}

function seno(numero = numeroParaCalculo()) {
    return Math.sin((numero * Math.PI) / 180);
}

function cosseno(numero = numeroParaCalculo()) {
    return Math.cos((numero * Math.PI) / 180);
}

function tangente(numero = numeroParaCalculo()) {
    const radianos = (numero * Math.PI) / 180;
    const cossenoValor = Math.cos(radianos);

    if (Math.abs(cossenoValor) < 1e-12) return null;
    return Math.tan(radianos);
}

function logaritmo(numero = numeroParaCalculo()) {
    if (numero <= 0) return null;
    return Math.log10(numero);
}

function logNatural(numero = numeroParaCalculo()) {
    if (numero <= 0) return null;
    return Math.log(numero);
}

function quadrado(numero = numeroParaCalculo()) {
    return numero ** 2;
}

function inverso(numero = numeroParaCalculo()) {
    if (numero === 0) return null;
    return 1 / numero;
}

function aplicarConstante(constante) {
    valorAtual = String(constante);
    esperandoNovoValor = true;
    atualizarDisplay();
    mostrarMensagem("Constante inserida.");
}

function alternarCientifica() {
    const painel = document.getElementById("cientifica");
    const botao = document.getElementById("btnCientifica");
    const aberto = painel.hidden;

    painel.hidden = !aberto;
    botao.classList.toggle("ativo", aberto);
    botao.textContent = aberto
        ? "Ocultar científica"
        : "Calculadora científica";
}

function marcarOperador(op) {
    limparOperadorSelecionado();
    const botoes = document.querySelectorAll(".operador");
    botoes.forEach(botao => {
        if (botao.textContent === op) botao.classList.add("selecionado");
    });
}

function limparOperadorSelecionado() {
    document.querySelectorAll(".operador").forEach(botao => {
        botao.classList.remove("selecionado");
    });
}

// Mantém compatibilidade com os nomes das funções da versão original.
function somar() {
    escolherOperador("+");
}

function subtrair() {
    escolherOperador("−");
}

function multiplicar() {
    escolherOperador("×");
}

function dividir() {
    escolherOperador("÷");
}

// Teclado físico
document.addEventListener("keydown", (evento) => {
    const tecla = evento.key;

    if (/^[0-9]$/.test(tecla)) digitar(tecla);
    else if (tecla === "." || tecla === ",") adicionarVirgula();
    else if (tecla === "+") escolherOperador("+");
    else if (tecla === "-") escolherOperador("−");
    else if (tecla === "*") escolherOperador("×");
    else if (tecla === "/") {
        evento.preventDefault();
        escolherOperador("÷");
    }
    else if (tecla === "%") porcentagem();
    else if (tecla === "Enter" || tecla === "=") calcular();
    else if (tecla === "Escape") limpar();
    else if (tecla === "Backspace") {
        if (!esperandoNovoValor && valorAtual !== "0" && valorAtual !== "Erro") {
            valorAtual = valorAtual.length > 1 ? valorAtual.slice(0, -1) : "0";
            atualizarDisplay();
        }
    }
});

atualizarDisplay();
