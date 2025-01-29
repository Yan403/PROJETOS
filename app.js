// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt((Math.random() * numeroLimite) + 1);
    let quantidadeDeElementos = listasNumerosSorteados.length;

    if(quantidadeDeElementos == numeroLimite) {
        listasNumerosSorteados = []
    }
    
    if(listasNumerosSorteados.includes(numeroEscolhido)) {
        return geraNumeroAleatorio();
    }
    else {
        listasNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Descobriu com ${tentativas} ${palavraTentativa}!`;
        
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }
        else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciar() {
    let numeroSecreto = geraNumeroAleatorio();
    let tentativas = 1
    
    limparCampo();
    exibirMensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

listasNumerosSorteados = [];
let numeroLimite = 10;

let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;

exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');