import { countries_data } from "./countries_data.js";

const countries = countries_data;

// iterate through countries array of objects and calculate the sum of population of all countries
let total_population = 0;
for (let i = 0; i < countries.length; i++) {
  total_population += countries[i].population;
}

// console.log(total_population); // 7757980095

// get top 20 countries with highest population
const top_20_countries = countries.reduce((acc, country) => {
  if (acc.length < 20) {
    acc.push(country);
    acc.sort((a, b) => b.population - a.population);
  } else if (country.population > acc[19].population) {
    acc[19] = country;
    acc.sort((a, b) => b.population - a.population);
  }
  return acc;
}, []);

// console.log(top_20_countries);


// get top 10 mostly spoken languages
const languages = countries.reduce((acc, country) => {
  country.languages.forEach(language => {
    if (acc[language]) {
      acc[language]++;
    } else {
      acc[language] = 1;
    }
  });
  return acc;
}, {});

const top_10_languages = Object.keys(languages)
  .sort((a, b) => languages[b] - languages[a])
  .slice(0, 10)
  .map(language => ({ language, count: languages[language] }));

console.log(top_10_languages);

// add listeners to the buttons

document.getElementById("Population").addEventListener("mouseover", function () {

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

  top_20_countries.forEach(country => {
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
});


document.getElementById("Languages").addEventListener("mouseover", function () {

  // find the div with class DataContainer
  const langContainer = document.querySelector(".DataContainer");

  langContainer.innerHTML = "";


  const headerbar = document.createElement("div");
  headerbar.setAttribute("class", "bar");
  // headerbar.style.backgroundColor = "blue";


  const langName = document.createElement("div");
  langName.setAttribute("class", "bar-country");
  langName.textContent = "World";
  headerbar.appendChild(langName);


  // create a div element for the population ratio and set the text content to the name of the country
  const popratio = document.createElement("div");
  popratio.setAttribute("class", "bar-size");
  headerbar.appendChild(popratio);



  // create a div element for the population and set the text content to the population of the country
  const cnt = document.createElement("div");
  cnt.setAttribute("class", "bar-value");
  cnt.textContent = countries.length;
  headerbar.appendChild(cnt);


  langContainer.appendChild(headerbar);


  top_10_languages.forEach(lang => {


    // create a div element for the world population
    const dataEle = document.createElement("div");
    dataEle.setAttribute("class", "bar");
    // dataEle.style.backgroundColor = "blue";


    const langName = document.createElement("div");
    langName.setAttribute("class", "bar-country");
    langName.textContent = lang.language;
    dataEle.appendChild(langName);


    const popratio = document.createElement("div");
    popratio.setAttribute("class", "bar-size");
    popratio.style.width = `${(lang.count / 230) * 100}%`;
    dataEle.appendChild(popratio);


    const popValue = document.createElement("div");
    popValue.setAttribute("class", "bar-value");
    popValue.textContent = lang.count;
    dataEle.appendChild(popValue);


    langContainer.appendChild(dataEle);

  });


});





