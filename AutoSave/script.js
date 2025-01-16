const textarea = document.getElementById('userInput');

const savedText = localStorage.getItem('userText');
if (savedText) {
    textarea.value = savedText;
}

textarea.addEventListener('input', () => {
    localStorage.setItem('userText', textarea.value);
});