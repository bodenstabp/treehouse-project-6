const overlay = document.querySelector('#overlay');
const overlayButton = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
let lives = document.querySelectorAll('#scoreboard img');
let chosen = 0
let missed = 0;
const quotes = ['The best things in life are free', 'Walk on the wild side', 'Eat and be merry', 'Go out and find your success', 'Welcome to the land of milk and honey', 'Drive fast and leave a sexy corpse'];
let hiddenPhrase = getRandomPhraseAsArray()

// Overlay Page Control
overlayButton.addEventListener ('click', () => {
    overlay.style.display = 'none';
    if (overlay.className === ('win') || overlay.className === ('lose')){
    removePhraseFromDisplay()
    }
    addPhraseToDisplay(hiddenPhrase);
});

//Phrase controls

function getRandomPhraseAsArray () {
    const quoteSelector = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteSplitter = quoteSelector.split('');
    return quoteSplitter;
}

function addPhraseToDisplay (arr) {
    for (i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        phrase.appendChild(li);
        li.textContent = arr[i];
        if (li.textContent === ' ') {
            li.className = 'space'
        } else {
            li.className = 'letter'
        }
    }
}

function removePhraseFromDisplay () {
    for (i = 0; i < 5; i++){
        lives[i].src = 'images/liveHeart.png'
    }
    missed = 0
    for (i = 0; i < hiddenPhrase.length; i++){
        li = document.querySelector('#phrase ul li');
        phrase.removeChild(li);
    }
    for (i = 0; i < chosen; i++){
        document.querySelectorAll('.chosen')[0].className = '';
    }
    chosen = 0;
    hiddenPhrase = getRandomPhraseAsArray();
}

//Letter Checker
qwerty.addEventListener('click', (event) => {
    let match = null;
    let phraseLI = phrase.childNodes
    if (event.target.tagName === 'BUTTON' && event.target.className !== 'chosen') {
        event.target.className = 'chosen';
        chosen++
        for (let i = 0; i < hiddenPhrase.length; i++){
            if (phraseLI[i].textContent.toLowerCase() === event.target.textContent){
                phraseLI[i].className += ' show';
                match = event.target.textContent;
            }
        }
        // Missed Letter Counter
        if (match === null){
            missed++;
            lives[missed-1].src = 'images/lostHeart.png';           
        }
        // Win/Lose Tracker
        if (hiddenPhrase.length === document.querySelectorAll('.show').length + document.querySelectorAll('.space').length){
            overlay.className =('win');
            overlay.style.display = 'flex';
        }else if (missed === 5){
            overlay.className =('lose');
            overlay.style.display = 'flex';
        }
    }
})




