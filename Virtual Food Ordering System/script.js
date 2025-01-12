const orderButton = document.getElementById('order-button');
const loadingMessage = document.getElementById('loading');
const foodImage = document.getElementById('food-image');
const orderIdDisplay = document.getElementById('order-id');
const foodCheckboxes = document.querySelectorAll('.food-items input[type="checkbox"]');

loadingMessage.style.display = 'none';

orderButton.addEventListener('click', () => {
    const selectedFoods = Array.from(foodCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedFoods.length === 0) {
        alert('Please select at least one food item!');
        return;
    }

    orderButton.disabled = true;
    loadingMessage.style.display = 'block';
    foodImage.style.display = 'none';
    orderIdDisplay.style.display = 'none';

    const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const preparationTime = Math.floor(Math.random() * 5 + 2) * 1000;

    new Promise((resolve) => {
        setTimeout(() => resolve(), preparationTime);
    }).then(() => {
        const foodImages = {
            'Burger': 'assets/burger.jpg',
            'Fries': 'assets/fries.jpg',
            'Coke': 'assets/coke.jpg',
            'Nuggets': 'assets/nuggets.jpg',
        };

        const randomFood = selectedFoods[Math.floor(Math.random() * selectedFoods.length)];
        foodImage.src = foodImages[randomFood];
        foodImage.style.display = 'block';
        orderIdDisplay.textContent = `Order ID: ${orderId}`;
        orderIdDisplay.style.display = 'block';

        loadingMessage.style.display = 'none';
        orderButton.disabled = false;
    });
});