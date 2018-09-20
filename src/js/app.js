$(()=>{
   
    const $startBtn = $( '.btn-start' );
    const $prepare = $('.prepare');

    class Game {
        constructor(){ 
            this.attempts = 0;
            const passwords = [ 'Terminator',
            'Forrest gump', 'Pitch black', 'Mały książe', 'Czerwona planeta',
            'Drużyna A' ];
            let currentPass = null;
            let currentPassLetters = null;
            const $gameAttempts = $('.game-attempts');
            const $gameSentence = $('.game-sentence');
            const $elemLetters = $('.game-letters');

            this.generateLetters =function () {
                const alphabet = [ 'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'w', 'v',  'x', 'y', 'z', 'ż', 'ź' ];

                alphabet.forEach(( letter )=>{
                    const $btn = $(`<button data-id=${letter.toUpperCase()}>${letter.toUpperCase()}</button>`);
                    $btn.addClass('game-letter');
                    $elemLetters.append( $btn );                                       
                });
            }

            const isLetterExists = () =>{
                return currentPassLetters.length;
            }

            const checkLettersInPassword =  (param) =>{
                let pass = currentPass.toUpperCase();
                if (pass.toUpperCase().indexOf(param.dataset.id) !== -1){
                    for (let i = 0; i < pass.length; i++) {
                        if (pass[i] === param.dataset.id) {
                            let passbox = document.querySelectorAll('.game-letter-box')[i]; passbox.innerText = param.dataset.id; 
                        }
                    }
                    currentPassLetters = currentPassLetters.replace(new RegExp(param.dataset.id, 'g'), '');

                    if (!isLetterExists()) {
                        this.disableLetters();
                        this.gameComplete();
                    }
                }else{
                    this.attempts--;
                    this.showAttempts();
                    if(this.attempts<=0){
                        this.gameOver();
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
                
                $gameSentence.html(' ');
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
                $prepare.slideDown('vary fast');      
                this.attempts = 4;
                
                setTimeout(()=>{
                    $prepare.slideUp();          
                    this.enableLetters();
                },2000);
                this.showAttempts();
                this.randomSentence();
            }

            this.gameComplete = () =>{
                this.disableLetters();  
                $startBtn.attr('disabled', false);                                        
            }

            this.gameOver = () =>{
                this.disableLetters();  
                $startBtn.attr('disabled', false);                                    
            }
        }
    }
    $prepare.hide();  
    let game = new Game();
    game.initBoard();
    $startBtn.on( 'click', () =>{        
        
        game.startGame();
        $startBtn.attr( 'disabled', true);           
    });

});