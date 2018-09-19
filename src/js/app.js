$(()=>{
    const $gameAttempts = $('.game-attempts');
    const $gameSentence = $('.game-sentence');
    const $elemLetters = $('.game-letters');

    class Game {
        constructor(){ 
            this.attempts = 5;
            const passwords = [ 'Terminator',
            'Harry Potter i kamień filozoficzny',
            'Drużyna A'];
            this.currentPass = null;

            this.generateLetters =function () {
                const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v',  'x', 'y', 'z', 'ż', 'ź'];

                alphabet.forEach(( letter )=>{
                    const $btn = $(`<button data-id=${letter}>${letter}</button>`);
                    $btn.addClass('game-letter');
                    $elemLetters.append( $btn );
                                       
                });
            },

            this.bindClick = () =>{
               $elemLetters.on( 'click', function(e){
                   const letter = $(e.target).data('id');
                    console.log(letter);
                   $(e.target).attr('disabled', true );
                   
                    
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
        $startBtn.attr('disabled', true);
    });

});