$(()=>{
    const $gameAttempts = $( '.game-attempts' );
    const $gameSentence = $( '.game-sentence' );
    const $elemLetters = $( '.game-letters' );
    const $startBtn = $( '.game-start__btn' );
    const $prepare = $('.prepare');

    class Game {
        constructor(){ 
            this.attempts = 0;
            const passwords = [ 'Terminator',
            'Forrest gump', 'Pitch black',
            'Drużyna A' ];
            let currentPass = null;
            let currentPassLetters = null;

            this.generateLetters =function () {
                const alphabet = [ 'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v',  'x', 'y', 'z', 'ż', 'ź' ];

                alphabet.forEach(( letter )=>{
                    const $btn = $(`<button data-id=${letter.toUpperCase()}>${letter.toUpperCase()}</button>`);
                    $btn.addClass('game-letter');
                    $elemLetters.append( $btn );                                       
                });
            }

            const checkLettersInPassword =  (param) =>{
                let pass = currentPass.toUpperCase();
                if (pass.toUpperCase().indexOf(param.dataset.id) !== -1){
                    for (let i = 0; i < pass.length; i++) {
                        if (pass[i] === param.dataset.id) {
                            let cos = document.querySelectorAll('.game-letter-box')[i].innerText = param.dataset.id; 
                        }
                    }
                }
            }

            this.bindClick = () =>{
                $elemLetters.on('click', '.game-letter', function( e ){
                   checkLettersInPassword(this);
                   $( e.target ).attr( 'disabled', true );                  
                });
            }

            this.initBoard =  () =>{
                this.generateLetters();
                this.bindClick();
                this.disableLetters(); 
            }

            this.enableLetters = () =>{
                const lettersOnBoard = document.querySelectorAll( '.game-letter');
                lettersOnBoard.forEach(el => $(el).attr( 'disabled', false));
            }

            this.disableLetters = () =>{
                const lettersOnBoard = document.querySelectorAll( '.game-letter');
                lettersOnBoard.forEach(el => $(el).attr( 'disabled', true));
            }

            this.showAttempts = () =>{
                $gameAttempts.text(`Your attempts: ${this.attempts}`);
            }

            this.randomSentence = ()=>{
                currentPass = passwords[Math.floor(Math.random()*passwords.length)];
                currentPassLetters = currentPass.replace(/ /g, '').toUpperCase();
                console.log(currentPassLetters, 'obecne litery hasla');
                
                $gameSentence.innerHtml = '';
                const letters = currentPass.split('');

                letters.forEach(el =>{
                    const $div = $('<div>');
                    $div.addClass('game-letter-box');
                    if(el === ' '){
                        $div.addClass('game-letter-box--without');
                    }
                    $gameSentence.append($div);
                });
            }

            this.startGame = () =>{
                this.initBoard();
                this.attempts = 4;
                
                $prepare.fadeIn('slow');      
                setTimeout(()=>{
                    $prepare.hide();          
                    this.enableLetters();
                },2000);
                this.showAttempts();
                this.randomSentence();
            }
        }
    }
    $prepare.hide();  

    $startBtn.on( 'click', () =>{
        const game = new Game();
        game.startGame();
        $startBtn.attr( 'disabled', true);        
    });

});