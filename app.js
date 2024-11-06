//h1 titulo da pagina do html

// let titulo = document.querySelector('h1'); //seleciona o h1
// titulo.innerHTML = 'Jogo de advinhar o número secreto'; //altera o conteudo do h1

// let paragrafo = document.querySelector('p'); //seleciona o p
// paragrafo.innerHTML = 'Tente advinhar o número secreto entre 0 e 10: '; //altera o conteudo do p

let listaDeNumerosSorteados = [];
let numMax = 10;
let numeroSecreto = gerarNumeroAleatorio(numMax);
let tentativas = 1

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInical(){
    exibirTexto('h1', 'Jogo de advinhar o número secreto');
    exibirTexto('p', `Tente advinhar o número secreto entre 0 e ${numMax}: `);
}

function gerarNumeroAleatorio(numMax){
    let numeroEscolhido = parseInt(Math.random() * numMax + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeElementosNaLista == numMax){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(numMax);
    } else {    
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

exibirMensagemInical();

function limparCampo(){
    document.querySelector('input').value = '';
}

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    if (isNaN(chute)) {
        exibirTexto('p', 'Apenas números são validos! Tente novamente:'); 
        limparCampo()
    } else if (chute == numeroSecreto) {
        exibirTexto('h1', 'Parabens! Você acertou o número secreto!'); 
        let mensagemTentativas = `Voce descobriu o número secreto com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}: `;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < 0 || chute > 10) {
        exibirTexto('p', `Digite apenas numeros entra 0 e ${numMax}`);
        limparCampo() 
    } else if (chute == "") {
        exibirTexto('p', 'Sem palpiltes? Chute algum número:'); 
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'Que pena, tente novamente!' + '\n' + `O número secreto é menor que ${chute}!`);
            limparCampo()
        } else {
            exibirTexto('p', 'Que pena, tente novamente!' + '\n' + `O número secreto é maior que ${chute}!`); 
            limparCampo()           
        }
        tentativas++;
    }
}    

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio(numMax);
    tentativas = 1;
    limparCampo()
    exibirMensagemInical();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}