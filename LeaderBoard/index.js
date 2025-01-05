const addBtn = document.getElementById('add-score');
const container = document.querySelector('.container');

let playerList = [];

addBtn.addEventListener('click', () =>{
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const country = document.getElementById('countries').value;
    const score = parseFloat(document.getElementById('score').value);

    if(score < 0){
        alert("Score can't be less than 0");
        return;
    }

    const inputs = document.querySelectorAll('input', 'select');

    for (const input of inputs) {
        if (!input.value) {
            alert("Please fill out all required fields!");
            input.focus();
            return;
        }
    }

    const playerData = {};

    playerData.name = firstName + ' ' + lastName;
    playerData.country = country;
    playerData.score = score;
    playerData.id = Date.now();

    playerList.push(playerData);

    sortData();
});

function sortData() {
    playerList.sort((a, b) => {
        return b.score - a.score;
    });

    console.log("Updated Player List:", playerList);

    container.innerHTML = '';

    if (playerList.length > 0) {
        container.classList.add('with-child');
    } else {
        container.classList.remove('with-child');
    }

    playerList.forEach(playerData => {
        const name = playerData.name;
        const country = playerData.country;
        const score = playerData.score;

        const playerDiv = document.createElement('div');
        playerDiv.classList.add('result-container');

        const nameTag = document.createElement('p');
        nameTag.setAttribute('class', 'name');
        const countryTag = document.createElement('p');
        const scoreTag = document.createElement('p');
        
        playerDiv.addEventListener('click', (event) => {
            const target = event.target;
            const action = target.getAttribute('action');

            if(action == 'delete'){
                container.removeChild(playerDiv);
                playerList = playerList.filter(item => item.id !== playerData.id);
            }
            else if(action == 'increase'){
                increaseValue(playerData);
            }
            else if(action == 'decrease'){
                decreseValue(playerData);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('action', 'delete');
        
        const increaseBtn = document.createElement('button');
        increaseBtn.setAttribute('action', 'increase');
        
        const decreaseBtn = document.createElement('button');
        decreaseBtn.setAttribute('action', 'decrease');

        nameTag.textContent = name;
        countryTag.textContent = country;
        scoreTag.textContent = score;
        deleteBtn.textContent = '🗑️';
        increaseBtn.textContent = '+5';
        decreaseBtn.textContent = '-5';

        playerDiv.appendChild(nameTag);
        playerDiv.appendChild(countryTag);
        playerDiv.appendChild(scoreTag);
        playerDiv.appendChild(deleteBtn);
        playerDiv.appendChild(increaseBtn);
        playerDiv.appendChild(decreaseBtn);

        container.appendChild(playerDiv);
    });
}

const increaseValue = (playerData) => {
    playerData.score += 5;
    sortData();
}
const decreseValue = (playerData) => {
    if(playerData.score < 5){
        alert("Score can't be less than 0");
    }
    else{
        playerData.score -= 5;
        sortData();
    }
    
}


