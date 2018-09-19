$(()=>{

    class Game {
        constructor(){      
        this.elemLetters =  $('.game-letters'),

        this.generateLetters= function(){
            const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v',  'x', 'y', 'z', 'ż', 'ź'];

            alphabet.forEach((letter)=>{
                const btn = $('<button>');
                btn.text(letter);
                btn.data('id','letter');
                this.elemLetters.append(btn);
            });
        },

        this.initBoard=function () {
            this.generateLetters();
        }
    }
    }
    const game = new Game();
    game.initBoard();
    
});