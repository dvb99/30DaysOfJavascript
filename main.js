
import { countries_data } from "./countries_data.js";

const allcountries = countries_data;


let filteredCountries = [];

// domcontentloaded
document.addEventListener('DOMContentLoaded', () => {
  dotheGrid(allcountries);
  populationChart([]);
});


// iterate through countries array of objects and calculate the sum of population of all countries
let total_population = 0;
for (let i = 0; i < allcountries.length; i++) {
  total_population += allcountries[i].population;
}

function dotheGrid(countriesData) {
  const container = document.getElementById('search-result');
  container.style.display = 'flex';

  container.style.flexWrap = 'wrap';
  container.style.padding = '10px';
  container.style.fontSize = 'normal';  // 1em
  container.style.gap = '10px';

  container.innerHTML = '';



  countriesData.forEach(country => {
    const card = document.createElement('div');
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'center';
    card.style.alignItems = 'center';
    card.style.textAlign = 'center';
    card.style.padding = '5px';
    card.style.border = '1px solid black';
    card.style.borderRadius = '10px';
    card.style.margin = '5px';


    card.style.width = '150px';
    card.style.minHeight = '100px';


    const flgimg = document.createElement('img');
    flgimg.src = country.flag;
    flgimg.style.width = '50px';
    flgimg.style.height = '50px';
    card.appendChild(flgimg);

    const cntname = document.createElement('h3');
    cntname.textContent = country.name;
    cntname.style.textOverflow = 'ellipsis';
    cntname.style.margin = '1px';
    cntname.style.fontWeight = 'bold';
    card.appendChild(cntname);

    const cntcap = document.createElement('p');
    cntcap.textContent = country.capital;
    cntcap.style.margin = '1px';
    card.appendChild(cntcap);

    const cntpop = document.createElement('p');
    cntpop.textContent = country.population;
    cntpop.style.margin = '1px';
    card.appendChild(cntpop);


    const cntlang = document.createElement('p');
    cntlang.textContent = country.languages.toString();
    cntlang.style.textWrap = 'pretty';
    cntlang.style.wordBreak = 'break-word';
    cntlang.style.margin = '1px';
    card.appendChild(cntlang);



    container.appendChild(card);

  });


  document.getElementById('itmcount').textContent = filteredCountries.length;


}


const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('input', () => {

  const searchValue = searchInput.value;

  if (searchValue !== '') {

    filteredCountries = allcountries.filter(country => {

      // return country if the name, capital or languages includes the search value
      return country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (country.capital && country.capital.toLowerCase().includes(searchValue.toLowerCase())) ||
        country.languages.some(language => language.toLowerCase().includes(searchValue.toLowerCase()));

    });
    dotheGrid(filteredCountries);
    populationChart(filteredCountries);
  }
  else {
    filteredCountries = [];
    dotheGrid(filteredCountries);
    populationChart([]);
  }
}
);


// var currentValue = 0;
window.handleClick = function (myRadio) {
  // alert('Old value: ' + currentValue);
  // alert('New value: ' + myRadio.value);
  // currentValue = myRadio.value;


  const sortCountries = (key, ascending) => {
    filteredCountries.sort((a, b) => {
      if (key === 'population') {
        return ascending ? a[key] - b[key] : b[key] - a[key];
      } else {
        return ascending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });
  };

  switch (myRadio.value) {
    case 'name':
    case 'capital':
    case 'population':
      const ascending = myRadio.classList.contains('ascending');
      sortCountries(myRadio.value, ascending);
      myRadio.classList.toggle('ascending', !ascending);
      dotheGrid(filteredCountries);
      populationChart(filteredCountries);
      break;
    default:
      break;
  }

};



const populationChart = function (countries) {

  const chartsubheading = document.getElementById("chartsubheading");

  if (countries.length === 0) {

    // get top 20 countries with highest population
    const top_10_countries = allcountries.reduce((acc, country) => {
      if (acc.length < 10) {
        acc.push(country);
        acc.sort((a, b) => b.population - a.population);
      } else if (country.population > acc[9].population) {
        acc[9] = country;
        acc.sort((a, b) => b.population - a.population);
      }
      return acc;
    }, []);

    chartsubheading.textContent = "Top 10 most populous countries";

   makePopulationChart(top_10_countries);

  } else {

    chartsubheading.textContent = "Population of countries matching search";  
    makePopulationChart(countries);

  }


}




// // get top 10 mostly spoken languages
// const languages = allcountries.reduce((acc, country) => {
//   country.languages.forEach(language => {
//     if (acc[language]) {
//       acc[language]++;
//     } else {
//       acc[language] = 1;
//     }
//   });
//   return acc;
// }, {});

// const top_10_languages = Object.keys(languages)
//   .sort((a, b) => languages[b] - languages[a])
//   .slice(0, 10)
//   .map(language => ({ language, count: languages[language] }));

// console.log(top_10_languages);

// add listeners to the buttons

function makePopulationChart (countries) {
  // find the div with class DataContainer
  const PopulationContainer = document.querySelector(".DataContainer");

  PopulationContainer.innerHTML = "";

  // create a div element for the world population
  const headerbar = document.createElement("div");
  headerbar.setAttribute("class", "bar");

  // create a div element for the country name and set the text content to the name of the country
  const countryName = document.createElement("div");
  countryName.setAttribute("class", "bar-country");
  countryName.textContent = "World";
  headerbar.appendChild(countryName);

  // create a div element for the population ratio and set the text content to the name of the country
  const popratio = document.createElement("div");
  popratio.setAttribute("class", "bar-size");
  headerbar.appendChild(popratio);

  // create a div element for the population and set the text content to the population of the country
  const popValue = document.createElement("div");
  popValue.setAttribute("class", "bar-value");
  popValue.textContent = total_population;
  headerbar.appendChild(popValue);

  PopulationContainer.appendChild(headerbar);

  countries.forEach(country => {
    // create a div element for the world population
    const dataEle = document.createElement("div");
    dataEle.setAttribute("class", "bar");

    // create a div element for the country name and set the text content to the name of the country
    const countryName = document.createElement("div");
    countryName.setAttribute("class", "bar-country");
    countryName.textContent = country.name;
    dataEle.appendChild(countryName);

    // create a div element for the population ratio and set the text content to the name of the country
    const popratio = document.createElement("div");
    popratio.setAttribute("class", "bar-size");
    popratio.style.width = `${(country.population / total_population) * 100}%`;
    dataEle.appendChild(popratio);

    // create a div element for the population and set the text content to the population of the country
    const popValue = document.createElement("div");
    popValue.setAttribute("class", "bar-value");
    popValue.textContent = country.population;
    dataEle.appendChild(popValue);

    PopulationContainer.appendChild(dataEle);
  });
}


// document.getElementById("Population").addEventListener("mouseover", makePopulationChart);


// document.getElementById("Languages").addEventListener("mouseover", function () {

//   // find the div with class DataContainer
//   const langContainer = document.querySelector(".DataContainer");

//   langContainer.innerHTML = "";


//   const headerbar = document.createElement("div");
//   headerbar.setAttribute("class", "bar");
//   // headerbar.style.backgroundColor = "blue";


//   const langName = document.createElement("div");
//   langName.setAttribute("class", "bar-country");
//   langName.textContent = "World";
//   headerbar.appendChild(langName);


//   // create a div element for the population ratio and set the text content to the name of the country
//   const popratio = document.createElement("div");
//   popratio.setAttribute("class", "bar-size");
//   headerbar.appendChild(popratio);



//   // create a div element for the population and set the text content to the population of the country
//   const cnt = document.createElement("div");
//   cnt.setAttribute("class", "bar-value");
//   cnt.textContent = countries.length;
//   headerbar.appendChild(cnt);


//   langContainer.appendChild(headerbar);


//   top_10_languages.forEach(lang => {


//     // create a div element for the world population
//     const dataEle = document.createElement("div");
//     dataEle.setAttribute("class", "bar");
//     // dataEle.style.backgroundColor = "blue";


//     const langName = document.createElement("div");
//     langName.setAttribute("class", "bar-country");
//     langName.textContent = lang.language;
//     dataEle.appendChild(langName);


//     const popratio = document.createElement("div");
//     popratio.setAttribute("class", "bar-size");
//     popratio.style.width = `${(lang.count / 230) * 100}%`;
//     dataEle.appendChild(popratio);


//     const popValue = document.createElement("div");
//     popValue.setAttribute("class", "bar-value");
//     popValue.textContent = lang.count;
//     dataEle.appendChild(popValue);


//     langContainer.appendChild(dataEle);

//   });


// });

document.getElementById('country-count').textContent = allcountries.length;


