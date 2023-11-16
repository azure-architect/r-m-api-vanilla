let currentPage = 1;
const characterContainer = document.getElementById('character-list');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

function fetchCharacters(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed');
    })
    .then((data) => {
      // Use map to create an array of HTML elements for each character
      const characterElements = data.results.map((character) => {
        const characterElement = document.createElement('card');
        characterElement.innerHTML = `
          <h2>${character.name}</h2>
          <img src=${character.image} />
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>Gender: ${character.gender}</p>
          <!-- Add more properties as needed -->
        `;
        return characterElement;
      });

      // Clear the character container before appending new characters
      characterContainer.innerHTML = '';

      // Append all the character elements to the container
      characterElements.forEach((element) => {
        characterContainer.appendChild(element);
      });

      // Update the current page
      currentPage = data.info.next ? currentPage + 1 : currentPage;

      // Enable or disable pagination buttons based on available pages
      prevButton.disabled = currentPage <= 2;
      nextButton.disabled = currentPage >= data.info.pages;

      // Attach event listeners to pagination buttons
      prevButton.addEventListener('click', () => navigatePage(-1));
      nextButton.addEventListener('click', () => navigatePage(1));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function navigatePage(direction) {
  const nextPage = currentPage + direction;
  fetchCharacters(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
}

// Initial call to fetch the first page of characters
fetchCharacters(
  `https://rickandmortyapi.com/api/character?page=${currentPage}`
);
