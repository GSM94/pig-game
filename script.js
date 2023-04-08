'use strict';

// Elemets selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // для id существует getElementById как querySelector
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');


// Game initial conditions

let totalScores, currentScore, activePlayer, isPlaying;

const initGame = function () { // создание функции для начальных данных. используется в самом начале и при нажатии на новая игра
    totalScores = [0, 0];
    currentScore = 0;
    activePlayer = 0; //даная переменная нужна, чтобы присвоить 0 к дному игроку, 1 к другому игроку
    isPlaying = true; // переменная для того, чтобы знать продолжать ли игру

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
    diceElement.classList.add('hidden'); // сперва в css создаем класс hidden, который display: none; и здесь мы включаем невидимый класс для кубика
}

initGame();

const switchActivePlayer = function () {
    // помещаем в функцию потому что она будет несколько раз вызываться
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore // динамический выбор по id 
    activePlayer = activePlayer === 0 ? 1 : 0 // если было 0, то ставим 1 и игрок менятся
    player0Element.classList.toggle('player--active'); // с помощью toggle можно или добавлять, или удалять
    player1Element.classList.toggle('player--active');
}

// Roll the dice
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        //1. Generate a random number (снегерировать случайное число) 
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNumber);
        // 2. Display number on the dice (показать на кубике)
        diceElement.classList.remove('hidden');
        diceElement.src = `./img/dice${diceNumber}.png`; // здесь через атрибут src фотографии присваиваем к рандомному числу
        // 3. If the number is 1, swith to the next player, if not - add number to the score
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore // динамический выбор по id 
        } else {
            switchActivePlayer();
        }
    }
})

btnHold.addEventListener('click', function () { // кнопка оставить 
    if (isPlaying) {

        // 1. Add current score to active player total score (добавить счет к активному игроку)
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

        // 2. If total score of active player >= 100, active player won, if not - switch active player 

        if (totalScores[activePlayer] >= 20) {
            isPlaying = false; // когда выполнится условие, то isPlaying станет false и две кнопки перестанут работь
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); // при выигрыше изобразится данный класс
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // при выигрыше удалится данный класс
            diceElement.classList.toggle('hidden');
        } else {
            switchActivePlayer();
        }
    }
})

btnNew.addEventListener('click', initGame);