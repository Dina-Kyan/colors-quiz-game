
const rgbBtn = document.querySelector('.rgb');
const hexBtn = document.querySelector('.hex');
const container = document.querySelector('.color-blocks');
const createBlocksBtns = document.querySelectorAll('.btn');
const rightAnswersSpan = document.getElementById('right-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const attemptsSpan = document.getElementById('attempts');
const pointsSpan = document.getElementById('points')
const changeBlocks = document.querySelector('.next');


let colorsInBlocks = [];
let randColorIndex;
let wrongAnswers = 0;
let rightAnswers = 0;
let points = 0;
let attempts = 3;
let currentFunction;

container.addEventListener('click', checkColor);
createBlocksBtns.forEach( btn => {
    btn.addEventListener('click', startFromZero)
})
changeBlocks.addEventListener('click', deleteBlocks);

function startFromZero (event) {
    wrongAnswers = 0;
    rightAnswers = 0;
    points = 0;
    attemptsSpan.innerHTML = 'Attempts ' + attempts;
    rightAnswersSpan.innerHTML = 'Right answers ' + rightAnswers;
    wrongAnswersSpan.innerHTML = 'Wrong answers ' + wrongAnswers;
    pointsSpan.innerHTML = 'Points ' + points;
    changeBlocks.style.display = 'block';
    changeBlocks.innerText = 'Change Blocks';
    if (event.target.classList[0] == 'hex') {
        currentFunction = createHexBlocks;
    } else {
        currentFunction = createRgbBlocks;
    }
    currentFunction();
    createBlocksBtns.forEach( btn => {
        if (btn == event.target) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'block';
            document.querySelector('.buttons-other').appendChild(btn);
        }
    })
    deleteBlocks();
}

function createRgbBlocks () {

    attempts = 3;
    attemptsSpan.innerHTML = 'Attempts ' + attempts;
    colorsInBlocks = [];
    changeBlocks.innerText = 'Change Blocks';

    function generateRgbColor() {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return r + ', ' + g + ', ' + b ;
      }

      for (let i = 0; i < 6; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        container.appendChild(block);
        let newColor = generateRgbColor()
        colorsInBlocks.push(newColor.split(',').join(''))
        block.style = "background: " + 'rgb(' + newColor + ');';
    }
    
    randColorIndex = colorsInBlocks.indexOf(colorsInBlocks[ Math.floor(Math.random() * colorsInBlocks.length) ]);
    document.querySelector('.color').innerHTML = colorsInBlocks[randColorIndex];
    

}

function createHexBlocks () {

    attempts = 3;
    attemptsSpan.innerHTML = 'Attempts ' + attempts;
    colorsInBlocks = [];
    changeBlocks.innerText = 'Change Blocks';


    function generateHexColor () {        
        let hex = '#';
        for (let i = 0; i < 6; i++) {
            const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
            const index = Math.floor(Math.random() * hexValues.length)
            hex += hexValues[index];
        }
        return hex;
    }

    for (let i = 0; i < 6; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        container.appendChild(block);
        colorsInBlocks.push(generateHexColor())
        block.style = "background: " + colorsInBlocks[i] + ';';
    }
    
    randColorIndex = colorsInBlocks.indexOf(colorsInBlocks[ Math.floor(Math.random() * colorsInBlocks.length) ]);
    document.querySelector('.color').innerHTML = colorsInBlocks[randColorIndex];
}

function checkColor (event) {
    let blocks = document.querySelectorAll('.block');
    const targetblock = event.target;
    if (!attempts) return;
    attempts--;

    blocks.forEach((block, i) => {
        if (block == targetblock && i == randColorIndex) {
            let span = document.createElement('span');
            span.classList.add('right-value');
            span.innerText = colorsInBlocks[i];
            block.appendChild(span);
            rightAnswers++;
            points += attempts + 1;
            attemptsSpan.innerHTML = 'Attempts ' + attempts;
            rightAnswersSpan.innerHTML = 'Right answers ' + rightAnswers;
            pointsSpan.innerHTML = 'Points ' + points;
            changeBlocks.innerText = 'Next';
            showColors();
        } else if (block == targetblock && i != randColorIndex) {
            let span = document.createElement('span');
            span.classList.add('wrong-value');
            span.innerText = colorsInBlocks[i];
            block.appendChild(span);
            wrongAnswers++;
            attemptsSpan.innerHTML = 'Attempts ' + attempts;
            wrongAnswersSpan.innerHTML = 'Wrong answers ' + wrongAnswers;
            if (!attempts) showColors();
        }
        
    })
}

function deleteBlocks () {
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {
        block.remove();
    });
    currentFunction();
}

function showColors () {
    changeBlocks.innerText = 'Next';
    let blocks = document.querySelectorAll('.block');
    blocks.forEach((block, i) => {
        if (!block.innerHTML) {
            let span = document.createElement('span');
                if (randColorIndex == i) span.classList.add('right-value');
                else span.classList.add('wrong-value');
                span.innerText = colorsInBlocks[i];
                block.appendChild(span);
        }
    })
}
