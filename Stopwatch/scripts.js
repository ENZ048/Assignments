const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const lapBtn = document.querySelector('#lapBtn');
const resetBtn = document.querySelector('#resetBtn');
const lapContainer = document.querySelector('.lap-container');
const lapBody = document.querySelector('tbody');

let startTime = 0;
let elaspedTime = 0;
let timeInterval;
let lapStartTime = 0;
let lapCount = 0;

function formatTime(time){
    const miliseconds = Math.floor((time%1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((time/1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
}

function updateTime(){
    const currTime = Date.now();
    elaspedTime = currTime - startTime;
    timerDisplay.textContent = formatTime(elaspedTime);
}

function startTimer(){
    startTime = Date.now() - elaspedTime;
    lapStartTime = elaspedTime;
    timeInterval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function pauseTimer(){
    clearInterval(timeInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

function recordLap(){
    lapCount ++;
    const lapTime = elaspedTime - lapStartTime;
    lapStartTime = elaspedTime;

    const row = document.createElement('tr');
    row.innerHTML = 
        `<td>${lapCount}</td>
        <td>${formatTime(lapTime)}</td>
        <td>${formatTime(elaspedTime)}</td>`;

    lapBody.appendChild(row);
    lapContainer.classList.remove('hide');
}

function resetTimer(){
    clearInterval(timeInterval);
    elaspedTime = 0;
    lapCount = 0;
    lapContainer.classList.add('hide');
    timerDisplay.textContent = '00:00:00:00';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);