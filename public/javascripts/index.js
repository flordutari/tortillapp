'use-strict';

const main = () => {
  const formElement = document.querySelector('form#search-tortilla');
  formElement.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit (event) {
    event.preventDefault();
    const inputElement = event.target.querySelector('input');
    const inputValue = inputElement.value;

    searchTortillas(inputValue);
  }

  const searchTortillas = async (tortillaOwner) => {
    try {
      const tortillasRequest = await fetch(`/api/tortillas?username=${tortillaOwner}`);
      if (tortillasRequest.status === 404) {
        const innerError = document.createElement('p');
        const divError = document.querySelector('.error-div');
        innerError.innerText = 'This user has no tortillas yet';
        divError.appendChild(innerError);
      }
      const tortillas = await tortillasRequest.json();
      showTortillas(tortillas);
    } catch (error) {
      console.error(error);
    }
  };

  const showTortillas = (tortillas) => {
    tortillas.forEach(tortilla => {
      const divError = document.querySelector('.error-div');
      const tagName = document.createElement('p');
      tagName.innerText = tortilla.name;
      divError.appendChild(tagName);
    });
  };
};

window.addEventListener('load', main);
