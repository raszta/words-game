$(()=>{
    const $gameAttempts = $('.game-attempts');
    const $gameSentence = $('.game-sentence');
    const $elemLetters = $('.game-letters');
    const $startBtn = $( '.btn-start' );
    const $prepare = $('.prepare');
    const $timeCount = $('.game-time');

    class Game {
        constructor(){ 
            this.attempts = 0;
            const passwords = [ 'Terminator', 'Alice in wonderland', 'Resident evil', 'Her',
            'Forrest gump', 'Pitch black', 'Little prince', 'Red fraction', 'Enchanted', 'Lord of the rings', 'The little', 'The world is not enough', 'Team A', 'Zombieland', 'The last samurai', 'Mission impossible', 'John Carter' ];
            let currentPass = null;
            let currentPassLetters = null;
            let seconds = null;

            this.generateLetters =function () {
                const alphabet = [ 'a', 'b', 'c',  'd', 'e',  'f', 'g', 'h', 'i', 'j', 'k', 'l',  'm', 'n',  'o',  'p', 'q', 'r', 's', 't', 'u', 'w', 'v',  'x', 'y', 'z' ];

                alphabet.forEach(( letter )=>{
                    const $btn = $(`<button data-id=${letter.toUpperCase()}>${letter.toUpperCase()}</button>`);
                    $btn.addClass('game-letter');
                    $elemLetters.append( $btn );                                       
                });
            }

            const time = () =>{
                this.idGame = setInterval( () => {
                    seconds--;
                    $timeCount.text(`Time left: ${seconds} seconds`);
                    if (seconds <=0){
                        this.gameOver();
                        clearInterval(this.idGame);
                    }
                   
                    
                },1000);
            }

            const isLetterExists = () =>{
                return currentPassLetters.length;
            }

            const checkLettersInPassword =  (param) =>{
                let pass = currentPass.toUpperCase();
                if (pass.toUpperCase().indexOf(param) !== -1){
                    for (let i = 0; i < pass.length; i++) {
                        if (pass[i] === param) {
                            let passbox = document.querySelectorAll('.game-letter-box')[i]; passbox.innerText = param; 
                        }
                    }
                    currentPassLetters = currentPassLetters.replace(new RegExp(param, 'g'), '');

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
                   checkLettersInPassword(this.dataset.id);
                   $( e.target ).attr( 'disabled', true );                  
                });
                document.addEventListener('keydown', function (e) {
                    checkLettersInPassword(e.key.toUpperCase());
                    const elem = document.querySelectorAll('.game-letter');
                    
                    elem.forEach(el=>{
                        if (el.dataset.id === e.key.toUpperCase())
                            el.disabled = true;
                    })
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
                infoScreen('Prepare! Game will start in 2 seconds!!')      
                this.attempts = 4;
                seconds = 122;
                
                setTimeout(()=>{
                    $prepare.slideUp();          
                    this.enableLetters();
                },2000);
                this.showAttempts();
                this.randomSentence();
                time();
            }

            const infoScreen = (param, bck = '../img/evening.png' ) =>{
                $prepare.fadeIn();
                $prepare.find('.prepare-text').text( param ).css('color', 'yellow').css('border', '10px solid yellow');
                $prepare.css('background', `url(${bck}) center/cover no-repeat` );
                setTimeout(() =>{
                    $prepare.hide();
                },2000);
            }

            this.gameComplete = () =>{
                this.disableLetters();  
                infoScreen('Congratulations!! You won!!', '../img/smile.jpeg');
                $startBtn.attr('disabled', false);
                $startBtn.text( 'New Game' );                                      
            }

            this.gameOver = () =>{
                this.disableLetters(); 
                infoScreen(`What a pity!! You fail!! \n The password was : ${currentPass}`); 
                $startBtn.attr('disabled', false);
                $startBtn.text('New Game');                                         
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