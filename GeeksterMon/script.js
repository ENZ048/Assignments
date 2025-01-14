const uniqueTypes = new Set();
let arr, currentData = [];

const createTypes = () => {
    const selectTypeTag = document.querySelector('#type');

    const optionTag = document.createElement('option');
    optionTag.value = 'All';
    optionTag.textContent = 'All';
    selectTypeTag.appendChild(optionTag);

    uniqueTypes.forEach(type => {
        const optionTag = document.createElement('option');
        optionTag.value = type;
        optionTag.textContent = type;

        selectTypeTag.appendChild(optionTag);
    });
}

const renderData = (dataList) => {
    const container = document.querySelector('.output-container');
    container.innerHTML = '';

    dataList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemContent = document.createElement('div');
        itemContent.classList.add('item-content');
        
        const frontSide = document.createElement('div');
        frontSide.classList.add('front');

        const idTag = document.createElement('h3');
        idTag.textContent = `# ${item.id}`;
        idTag.classList.add('pokemon-id');

        const imgTag = document.createElement('img');
        imgTag.src = item.front_default;

        const frontName = document.createElement('h2');
        let pokemonName = item.name;
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        frontName.textContent = pokemonName;

        const type = document.createElement('h3');
        type.classList.add('type');
        let pokemonType = item.type;
        pokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
        type.textContent = pokemonType;

        itemContent.classList.add(`${pokemonType.toLowerCase()}`);

        frontSide.appendChild(idTag);
        frontSide.appendChild(imgTag);
        frontSide.appendChild(frontName);
        frontSide.appendChild(type)

        const backSide = document.createElement('div');
        backSide.classList.add('back');

        const backName = document.createElement('h2');
        let pokemonBackName = item.name;
        pokemonBackName = pokemonBackName.charAt(0).toUpperCase() + pokemonBackName.slice(1);
        backName.textContent = pokemonBackName;

        const abilities = document.createElement('p');
        abilities.textContent = `Abilities : ${item.abilities.join(', ')}`;


        backSide.appendChild(backName);
        backSide.appendChild(abilities);

        itemContent.appendChild(frontSide);
        itemContent.appendChild(backSide);

        itemDiv.appendChild(itemContent);

        container.appendChild(itemDiv);
    });
};

const filterByName = (currentData, input) => {
    return currentData = currentData.filter(data => data.name.toLowerCase().includes(input.toLowerCase()));
};

const dropdowntag = document.querySelector('#type');
const filterBtn = document.querySelector('.filter-btn');
const searchTag = document.querySelector('#name');

filterBtn.addEventListener('click', () => {
    if (dropdowntag.value == 'All') {
        currentData = arr;
    }
    else {
        currentData = arr.filter(item => item.type.toLowerCase() == dropdowntag.value.toLowerCase());
    }
    renderData(filterByName(currentData, searchTag.value));
})

// dropdowntag.addEventListener('change', () => {
//     if(dropdowntag.value == 'All'){
//         currentData = arr;
//     }
//     else{
//         currentData = arr.filter(item => item.type.toLowerCase() == dropdowntag.value.toLowerCase());
//     }
//     renderData(currentData);
// });

const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener('click', () => {
    window.location.reload();
});



searchTag.addEventListener('input', () => {
    const inputData = searchTag.value;
    let filteredData = filterByName(arr, inputData);
    renderData(filteredData);
});

const fetchData = async () => {
    const promisArray = [];
    for (let i = 1; i <= 151; i++) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        promisArray.push(promise);
    }

    const responseArray = await Promise.all(promisArray);

    const dataPromiseArray = [];
    for (let i = 0; i < responseArray.length; i++) {
        const dataPromise = responseArray[i].json();
        dataPromiseArray.push(dataPromise);
    }

    arr = await Promise.all(dataPromiseArray);

    arr = arr.map((data) => {
        uniqueTypes.add(data.types[0].type.name);

        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);

        return {
            id: data.id,
            name: data.name,
            front_default: data.sprites['front_default'],
            type: data.types[0].type.name,
            abilities: abilities,
            species_url: data.species.url,
        }
    });


    createTypes();
    renderData(arr);
}

fetchData();