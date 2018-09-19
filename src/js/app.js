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
            this.currentPass = null;
            this.currentPassLetters = null;

            this.generateLetters =function () {
                const alphabet = [ 'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v',  'x', 'y', 'z', 'ż', 'ź' ];

                alphabet.forEach(( letter )=>{
                    const $btn = $(`<button data-id=${letter}>${letter}</button>`);
                    $btn.addClass('game-letter');
                    $elemLetters.append( $btn );                                       
                });
            },

            this.bindClick = () =>{
               $elemLetters.on( 'click', function( e ){
                   const letter = $(e.target).data('id');
                   $( e.target ).attr( 'disabled', true );                  
                    
                });
            }

            this.initBoard =  () =>{
                this.generateLetters();
                this.bindClick();
                this.disableLetters();               
            }

            this.enableLetters = () =>{
                const letters = document.querySelectorAll( '.game-letter');
                letters.forEach(el => $(el).attr( 'disabled', false));
            }

            this.disableLetters = () =>{
                const letters = document.querySelectorAll( '.game-letter');
                letters.forEach(el => $(el).attr( 'disabled', true));
            }

            this.showAttempts = () =>{
                $gameAttempts.text(`Your attempts: ${this.attempts}`);
            }

            this.randomSentence = ()=>{
                this.currentPass = passwords[Math.floor(Math.random()*passwords.length)];
                this.currentPassLetters = this.currentPass.replace(/ /g, '');
                console.log(this.currentPass);
                
                $gameSentence.innerHtml = '';
                const letters = this.currentPass.split('');

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
                
                $prepare.show();      
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