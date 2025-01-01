const startContainer = document.getElementById('start-container');
const outputContainer = document.getElementById('output-container');
const keyOutput = document.getElementById('key-output');
const keyCode =  document.getElementById('key-code');
const keyCodetext = document.getElementById('key-code-text');
const reset = document.getElementById('reset-btn');

document.addEventListener('keydown', function(event){
    startContainer.classList.add('hidden');

    outputContainer.classList.remove('hidden');
    keyCode.classList.remove('hidden');
    reset.classList.remove('hidden');

    const keyPressed = event.key === ' ' ? 'Spacebar' : event.key;

    keyOutput.innerText = keyPressed;
    keyCodetext.innerText = event.keyCode;
});

reset.addEventListener('click', function(){
    outputContainer.classList.add('hidden');
    keyCode.classList.add('hidden');
    reset.classList.add('hidden');

    startContainer.classList.remove('hidden');
});