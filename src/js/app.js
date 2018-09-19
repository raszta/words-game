$(()=>{
    const $gameAttempts = $('.game-attempts');
    const $gameSentence = $('.game-sentence');


    class Game {
        constructor(){  
            this.elemLetters = $('.game-letters');

            this.attempts = 5;
            const passwords = [ 'Terminator',
            'Harry Potter i kamień filozoficzny',
            'Drużyna A'];
            this.currentPass = null;

            this.generateLetters =function () {
                const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v',  'x', 'y', 'z', 'ż', 'ź'];

                alphabet.forEach(( letter )=>{
                    const $btn = $( '<button>' );
                    $btn.text( letter );
                    $btn.data( 'id', letter );
                    
                    this.elemLetters.append( $btn );
                                       
                });
            },

            this.bindClick = () =>{
                this.elemLetters.on( 'click', function(e){
                    const letter = e.target;
                    console.log(letter);
                   
                    
                });
            }

            this.initBoard =  () =>{
                this.generateLetters();
                this.bindClick();
            }
        }
    }
   
    const $startBtn = $( '.game-start__btn' );
    
    $startBtn.on( 'click', () =>{
        const game = new Game();
        game.initBoard();
        
    });

});