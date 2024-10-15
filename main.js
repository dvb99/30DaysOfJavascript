import { countries } from "./countries.js";

const allcountries = countries;

// console.log(allcountries);



document.getElementById('country-count').textContent = allcountries.length;


function dotheGrid(countriesData) {
    const container = document.getElementById('search-result');
    container.style.display = 'grid';
    container.style.gap = '5px';
    container.style.padding = '20px';
    container.innerHTML = '';

    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';


    countriesData.forEach(country => {
        const number = document.createElement('div');
        number.style.display = 'flex';
        number.style.justifyContent = 'center';
        number.style.alignItems = 'center';
        // number.style.width = '150px';
        number.style.height = '100px';
        // number.style.backgroundColor = '#f0f0f0';
        number.style.border = '1px solid #ddd';
        number.style.fontSize = '1rem';
        // number.style.fontWeight = 'bold';
        number.style.padding = '10px';
        number.style.margin = '5px';
        number.style.borderRadius = '5px';
        number.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        
      
        // number.style.color = '#333';
        
        
        number.textContent = country;

        container.appendChild(number);

      });

}



const startingWordBtn = document.getElementById('starting-word-btn');
const anyWordBtn = document.getElementById('any-word-btn');
const sortBtn = document.getElementById('sort-btn');
let activeButton = sortBtn;

const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('input', () => {
  if (activeButton === startingWordBtn) {
  const searchValue = searchInput.value;
  const filteredCountries = allcountries.filter(country => {
    return country.toLowerCase().startsWith(searchValue.toLowerCase());
    
  });
    dotheGrid(filteredCountries);
  } else if (activeButton === anyWordBtn) {
    const searchValue = searchInput.value;
    const filteredCountries = allcountries.filter(country => {
      return country.toLowerCase().includes(searchValue.toLowerCase());
    });
    dotheGrid(filteredCountries);
    } 
  console.log(activeButton.textContent);
});



startingWordBtn.addEventListener('click', () => {
  startingWordBtn.classList.toggle('pressed');
  anyWordBtn.classList.remove('pressed');
  sortBtn.classList.remove('pressed');
  activeButton = startingWordBtn;
});

anyWordBtn.addEventListener('click', () => {
  anyWordBtn.classList.toggle('pressed');
  startingWordBtn.classList.remove('pressed');
  sortBtn.classList.remove('pressed');
  activeButton = anyWordBtn;
});

sortBtn.addEventListener('click', () => {
  sortBtn.classList.toggle('pressed');
  startingWordBtn.classList.remove('pressed');
  anyWordBtn.classList.remove('pressed');
  activeButton = sortBtn;


  if (sortBtn.classList.contains('ascending')) {
    allcountries.sort((a, b) => b.localeCompare(a));
    sortBtn.classList.remove('ascending');
    sortBtn.classList.add('descending');
  } else {
    allcountries.sort((a, b) => a.localeCompare(b));
    sortBtn.classList.remove('descending');
    sortBtn.classList.add('ascending');
  }
  dotheGrid(allcountries);
});


