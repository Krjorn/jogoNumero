function showTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(paragraph, 'Brazilian Portuguese Female', {rate:1.2});
}

let title;
let paragraph;
let maxNumber = 10;

function showFirstMessage() {
    title = 'Adivinhe o <span class="container__texto-azul">número secreto</span>';
    paragraph = `Escolha um número entre 1 a ${maxNumber}`;

    showTextOnScreen('h1', title);
    showTextOnScreen('p', paragraph);
}

showFirstMessage();

let rdmNumberList = [];

let rdmNumber = drawRandomNumber();
console.log(rdmNumber);

function drawRandomNumber() {
    let chosenNumber = parseInt(Math.random() * maxNumber + 1);
    let listLength = rdmNumberList.length;

    if(listLength == maxNumber) {
        rdmNumberList = [];
    }

    if(rdmNumberList.includes(chosenNumber)) {
        return drawRandomNumber();
    } else {
        rdmNumberList.push(chosenNumber);
        console.log(rdmNumberList);
        return chosenNumber;
    }
}

function clearField(tag) {
    let field = document.querySelector(tag);
    field.value = '';
}

let attempts = 1;

function verifyGuess() {
    let userGuess = document.querySelector('.container__input').value;
    
    if(userGuess == rdmNumber) {
        title = `Você <span class="container__texto-azul">acertou!</span>`;
        showTextOnScreen('h1', title);
        
        let attemptsNum = attempts > 1 ? 'tentativas' : 'tentativa';

        paragraph = `O número era ${rdmNumber}, você acertou com ${attempts} ${attemptsNum}.`;
        showTextOnScreen('p', paragraph);

        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');        
    } else {
        title = `Você <span class="container__texto-azul">errou!</span>`;
        showTextOnScreen('h1', title);

        if(userGuess > rdmNumber) {
            paragraph = `O número é menor!`;
            showTextOnScreen('p', paragraph);
        } else {
            paragraph = `O número é maior!`;
            showTextOnScreen('p', paragraph);
        }
        clearField('.container__input');
        attempts++;
    }
}

function restartGame() {
    showFirstMessage();
    attempts = 1;
    clearField('.container__input');
    rdmNumber = drawRandomNumber();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}