const countries = document.getElementById('countries-container');
const filterCountries = document.getElementById('regionFilter');
const CountriesTotal = document.getElementById('totalCountries');
const searchCountry = document.getElementById('search-country');
const sortPopulation = document.getElementById('sort');
const checkbox = document.getElementById('themeswitch');
const body = document.body;
const loadMore = document.getElementById('load-more-btn');

let allCountries;
let html = '';


fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,population`)
    .then((res) => res.json())
    .then((data) => {
        allCountries = data;
        showCountries();
    }).catch((err) => {
        console.error(err);
    });

let startingIndex = 0;
let endingIndex = 8;

const showCountries = () => {
    let countryLength;
    html = '';

    const filterData = allCountries.filter(
        (country) => country.region === filterCountries.value
    );
    const filteredDataLoadMore = filterData.slice(startingIndex, endingIndex);
    const allCountriesWithLoadMore = allCountries.slice(startingIndex, endingIndex);

    if (filterCountries.value === 'Show All') {
        countryLength = allCountries.length;
        CountriesTotal.textContent = '';
        allCountriesWithLoadMore.forEach((country) => {
            html += buildCountryCard(country);
        });
        CountriesTotal.textContent = `All regions of world contain ${countryLength} Countries`;
    } else {
        countryLength = filterData.length;
        CountriesTotal.textContent = '';
        filteredDataLoadMore.forEach((country) => {
            html += buildCountryCard(country);
        });
        CountriesTotal.textContent = `${filterCountries.value} contains ${countryLength} Countries`;
    }

    countries.innerHTML += html;

    if (endingIndex >= countryLength) {
        loadMore.disabled = true;
        loadMore.style.cursor = 'not-allowed';
        loadMore.textContent = 'No more data to load';
    }
};


filterCountries.addEventListener('change', () => {
    startingIndex = 0;
    endingIndex = 8;
    countries.innerHTML = '';
    loadMore.disabled = false;
    loadMore.style.cursor = 'pointer';
    loadMore.textContent = 'Load More';
    if (searchCountry.value.trim()) {
        countrySearch();
    } else {
        showCountries();
    }
});


const countrySearch = () => {
    startingIndex = 0;
    endingIndex = 8;
    countries.innerHTML = '';
    CountriesTotal.textContent = '';
    html = '';
    let searchInput = searchCountry.value.trim().toLowerCase();

    if (!searchCountry.value.trim()) {
        showCountries();
        return;
    }

    if (filterCountries.value !== 'Show All') {
        const filterData = allCountries.filter((country) => country.region === filterCountries.value);
        const finalFilteredList = filterData.filter((data) => data.name.common.toLowerCase().includes(searchInput));

        if (finalFilteredList.length === 0) {
            html = `<div>No Country exists</div>`
        } else {
            finalFilteredList.forEach((country) => {
                html += buildCountryCard(country);
            });
        }
    }
    else {
        const showAllFilteredList = allCountries.filter((data) => data.name.common.toLowerCase().includes(searchInput));
        if (showAllFilteredList.length === 0) {
            html = `<div>No Country exists</div>`
        } else {

            showAllFilteredList.forEach((country) => {
                html += buildCountryCard(country);
            });
        }
    }
    countries.innerHTML = html;
    loadMore.disabled = true;
    loadMore.style.cursor = 'not-allowed';
    loadMore.textContent = 'Search active';
}

searchCountry.addEventListener('input', countrySearch);

const sortcountries = () => {
    startingIndex = 0;
    endingIndex = 8;
    countries.innerHTML = '';
    loadMore.disabled = false;
    loadMore.style.cursor = 'pointer';
    loadMore.textContent = 'Load More';
    if (sortPopulation.value === 'High to Low') {
        allCountries.sort((a, b) => b.population - a.population);
    } else if (sortPopulation.value === 'Low to High') {
        allCountries.sort((a, b) => a.population - b.population);
    }

    if (searchCountry.value.trim()) {
        countrySearch();
    } else {
        showCountries();
    }
};

sortPopulation.addEventListener('change', sortcountries);

checkbox.addEventListener('change', () => {
    if (checkbox.checked === true) {
        body.classList.add('dark');
        localStorage.setItem('themeDesign', 'dark');
    } else {
        body.classList.remove('dark');
        localStorage.removeItem('themeDesign');
    }
});


window.onload = () => {
    if (localStorage.getItem('themeDesign') === 'dark') {
        body.classList.add('dark');
        checkbox.checked = true;
    }
}

loadMore.addEventListener('click', () => {
    startingIndex = endingIndex;
    endingIndex += 8;
    showCountries();
})

const buildCountryCard = (country) => {
    return `
  <div class="country-card">
    <img src="${country.flags.png}" alt="${country.flags.alt}" width="300">
    <h2>${country.name.common}</h2>
    <h3>Region: ${country.region}</h3>
    <p>Population: ${country.population}</p>
  </div>
`;
}


