document.addEventListener('DOMContentLoaded', function(){

let score = 0;
const div = document.createElement('div');
const prepare = document.querySelector('.prepare');
const inputVal = document.querySelector('.gameWriting');
const scorDiv = document.querySelector('.score');
const body = document.querySelector('body');
const startBtn = document.querySelector('.startGame');
const pauseBtn = document.querySelector('.pauseGame');
const table = ["alfa", 'beta', 'gamma', 'delta', 'omega', 'chrząszcz', 'Szczebrzeszyn'];   
function randomWord(arr){
    return arr[Math.floor(Math.random()*arr.length)];
} 

startBtn.addEventListener('click', function(){
    let counter = 10;
    const prepareInfo = setInterval(function(){ 
        prepare.innerText = "Gra się rozpocznie za: " + counter;
        counter--;
        if (counter<=0){
            clearInterval(prepareInfo);
            prepare.classList.add('invisible');
        } 
    },1000);
    this.gameId = setInterval(function () {
        
        let pos = 0;
        body.appendChild(div);
        div.innerText = randomWord(table);
        div.style.position = "absolute";
        div.style.left = 0;
        this.wordMoveId = setInterval(function () {
            pos += 40
            div.style.left = pos + 'px';
            if (inputVal.value == div.innerText) {
                clearInterval(this.wordMoveId);
                body.removeChild(div);
                score++;
                inputVal.value = '';
                scorDiv.innerText = 'Twój wynik: ' + score;
            } else if (pos > 1850) {
                clearInterval(this.wordMoveId);
                body.removeChild(div);
                score--;
                scorDiv.innerText = 'Twój wynik: ' + score;
            }
        }, 500);
    }, 20000);
});

    pauseBtn.addEventListener('click', function(){

    });


});