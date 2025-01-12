const jokeButton = document.getElementById('joke-button');
const jokeContainer = document.getElementById('joke-container');
const loadingIndicator = document.getElementById('loading');

const fetchJoke = async () => {
    const apiKey = 'Ad8DnW0I46YY6/YFBg6Fpg==dcs7TYIcAqNEhjvH';
    const apiUrl = 'https://api.api-ninjas.com/v1/dadjokes';

    try {
        loadingIndicator.style.display = 'block';
        jokeContainer.textContent = '';

        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch a joke. Try again later!');
        }

        const data = await response.json();
        const joke = data[0].joke;

        jokeContainer.textContent = joke;
    } catch (error) {
        jokeContainer.textContent = error.message;
    } finally {
        loadingIndicator.style.display = 'none';
    }
};

jokeButton.addEventListener('click', fetchJoke);