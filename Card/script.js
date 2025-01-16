const form = document.getElementById('userForm');
const cardsContainer = document.getElementById('cards');

window.onload = function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(displayCard);
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const village = document.getElementById('village').value;
    const city = document.getElementById('city').value;

    const user = { name, phone, village, city };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    displayCard(user);

    form.reset();
});

function displayCard(user) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Village:</strong> ${user.village}</p>
                <p><strong>City:</strong> ${user.city}</p>
            `;
    cardsContainer.appendChild(card);
}