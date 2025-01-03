const container = document.querySelector('.container');
const element = document.querySelectorAll('.element');
const sendBtn = document.getElementById('send-btn');
let value = null;

element.forEach(icon => {
    icon.addEventListener('click', () => {
        
        element.forEach(i => i.classList.remove('clicked'));

        icon.classList.add('clicked');
        
        value = icon.getAttribute('data-value');
        
    });
});

sendBtn.addEventListener('click', () => {
    container.innerHTML = '';

    function createAndAppend(tag, text, parent) {
        const element = document.createElement(tag);

        element.textContent = text;

        parent.appendChild(element);

        return element;
    }

    const output = document.createElement('div');
    output.classList.add('output');

    createAndAppend('h2', 'Thank You!', output);
    createAndAppend('h2', `Feedback: ${value}`, output);
    createAndAppend('h2', "We'll use your feedback to improve our customer support.", output);

    container.appendChild(output);

});