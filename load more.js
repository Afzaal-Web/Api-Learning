const countries = document.getElementById('countries-container');
const filterCountries = document.getElementById('regionFilter');
const CountriesTotal = document.getElementById('totalCountries');
const searchCountry = document.getElementById('search-country');
const sortPopulation = document.getElementById('sort');
const checkbox = document.getElementById('themeswitch');
const body = document.body;
const loadMore = document.getElementById('load-more-btn');
const modal = document.getElementById('modal');
const goTopBtn = document.getElementById('gototop');

let allCountries;
let visibleCountries = [];
let html = '';

// Fetch and initialize
fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,area,subregion,languages,currencies,timezones`)
    .then((res) => res.json())
    .then((data) => {
        allCountries = data;
        showCountries();
    })
    .catch((err) => console.error(err));

let startingIndex = 0;
let endingIndex = 8;

const showCountries = () => {
    let countryLength;
    html = '';
    const filterData = allCountries.filter(country => country.region === filterCountries.value);
    /* const filteredDataLoadMore = filterData.slice(startingIndex, endingIndex); 
     const allCountriesWithLoadMore = allCountries.slice(startingIndex, endingIndex); */

    if (filterCountries.value === 'Show All') {
        countryLength = allCountries.length;
        CountriesTotal.textContent = '';
        const newCountries = allCountries.slice(startingIndex, endingIndex);
        visibleCountries = [...visibleCountries, ...newCountries];

        newCountries.forEach((country, index) => {
            const globalIndex = visibleCountries.length - newCountries.length + index;
            html += buildCountryCard(country, globalIndex);
        });
        CountriesTotal.textContent = `All regions of world contain ${countryLength} Countries`;
    } else {
        countryLength = filterData.length;
        CountriesTotal.textContent = '';
        const newCountries = filterData.slice(startingIndex, endingIndex);
        visibleCountries = [...visibleCountries, ...newCountries];
        newCountries.forEach((country, index) => {
            const globalIndex = visibleCountries.length - newCountries.length + index;
            html += buildCountryCard(country, globalIndex);
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

const countrySearch = () => {
    countries.innerHTML = '';
    CountriesTotal.textContent = '';
    html = '';
    let searchInput = searchCountry.value.trim().toLowerCase();

    if (!searchCountry.value.trim()) {
        loadMore.disabled = false;
        loadMore.style.cursor = 'pointer';
        loadMore.textContent = 'Load More Countries';
        showCountries();
        return;
    }

    if (filterCountries.value !== 'Show All') {
        const filterData = allCountries.filter((country) => country.region === filterCountries.value);
        const finalFilteredList = filterData.filter((data) => data.name.common.toLowerCase().includes(searchInput));

        if (finalFilteredList.length === 0) {
            html = `<div>No Country exists</div>`
        } else {
            finalFilteredList.forEach((country, index) => {
                html += buildCountryCard(country, index);
            });
        }
        visibleCountries = finalFilteredList;

    }
    else {
        const showAllFilteredList = allCountries.filter((data) => data.name.common.toLowerCase().includes(searchInput));
        if (showAllFilteredList.length === 0) {
            html = `<div>No Country exists</div>`
        } else {

            showAllFilteredList.forEach((country, index) => {
                html += buildCountryCard(country, index);
            });
        }
        visibleCountries = showAllFilteredList;
    }
    countries.innerHTML = html;
    loadMore.disabled = true;
    loadMore.style.cursor = 'not-allowed';
    loadMore.textContent = 'Search active';
}

function debounce(func) {
    let timeOut;
    return function () {
        clearTimeout(timeOut);
        timeOut = setTimeout(func, 2500);
    }
}

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

const buildCountryCard = (country, index) => {
    return `
  <div class="country-card" data-index = "${index}">
    <img src="${country.flags.png}" alt="${country.flags.alt}" width="300">
    <h2>${country.name.common}</h2>
    <h3>Region: ${country.region}</h3>
    <p>Population: ${country.population}</p>
  </div>
`;
}

const showpopUp = (country) => {
    let html = openPopUp(country);
    modal.classList.remove('hidden');
    modal.innerHTML = html;

    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.innerHTML = '';
        });
    });
};

const openPopUp = (country) => {
    const languages = Object.values(country.languages).join(', ');
    const timeZones = country.timezones.join(', ');
    const currency = country.currencies ? Object.values(country.currencies)[0] : null;

    return `
    <div class="modal-content">
  <button class="close-btn">❌</button>
  <p><span>Country:</span> ${country.name.common}</p>
  <p><span>Area:</span> ${country.area}</p>
  <p><span>Subregion:</span> ${country.subregion}</p>
  <p><span>Languages:</span> ${languages}</p>
  <p><span>Currency Name:</span> ${currency?.name || 'N/A'}</p>
  <p><span>Symbol:</span> ${currency?.symbol || 'N/A'}</p>
  <p><span>TimeZones:</span> ${timeZones}</p>
</div>

  `;
};

// Scroll to top button visibility toggle
window.addEventListener('scroll', () => {
    if (window.scrollY > 3500) {
        goTopBtn.style.display = 'block';
    } else {
        goTopBtn.style.display = 'none';
    }
});

// Event Listeners

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

searchCountry.addEventListener('input', debounce(countrySearch));

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
});

countries.addEventListener('click', (e) => {
    const card = e.target.closest('.country-card');
    if (!card) return;

    const index = card.getAttribute('data-index');
    if (index !== null) {
        showpopUp(visibleCountries[index]);
    }
});

goTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
} */

  /* 
API (Application Programming Interface) lets two programs talk to each other. In our case:
You send a request to https://restcountries.com/v3.1/all
It sends back an array of country data in this format:
[
  {
    "name": { "common": "Afghanistan" },
    "flags": { "png": "...", "alt": "..." },
    "region": "...",
    ...
  },
  ...
]
*/