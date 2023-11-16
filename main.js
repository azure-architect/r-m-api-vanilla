const url = 'https://rickandmortyapi.com/api/character';

// Fetch data from the API
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed');
  })
  .then((data) => {
    // Access the container where you want to display the data
    const characterContainer = document.getElementById('root');

    // Loop through the retrieved characters and create HTML elements to display them
    data.results.forEach((character) => {
      const characterElement = document.createElement('card');
      characterElement.innerHTML = `
      <img src=${character.image} alt=${character.name}/>
      <h2>${character.name}</h2>
      <p>Gender: ${character.gender} </p>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
        <!-- Add more properties as needed -->
      `;
      characterContainer.appendChild(characterElement);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
