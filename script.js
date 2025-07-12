const countries = document.getElementById('countries-container');
const filterCountries = document.getElementById('regionFilter');
const CountriesTotal = document.getElementById('totalCountries');
const searchCountry = document.getElementById('search-country');
const sortPopulation = document.getElementById('sort');
const checkbox = document.getElementById('themeswitch');
const body = document.body;
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

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

const countriesPerPage = 15;

let totalPages;
let currentPage = 1;

const getFilteredCountries = () => {
  let result = [...allCountries];

  if (filterCountries.value !== 'Show All') {
    result = result.filter(country => country.region === filterCountries.value);
  }

  const searchInput = searchCountry.value.trim().toLowerCase();
  if (searchInput) {
    result = result.filter(country => country.name.common.toLowerCase().includes(searchInput));
  }

  if (sortPopulation.value === 'High to Low') {
    result.sort((a, b) => b.population - a.population);
  } else if (sortPopulation.value === 'Low to High') {
    result.sort((a, b) => a.population - b.population);
  }

  return result;
};


const getPaginatedCountries = () => {
  const filtered = getFilteredCountries();
  totalPages = Math.ceil(filtered.length / countriesPerPage);

  if (currentPage > totalPages) currentPage = totalPages;
  if (totalPages === 0) currentPage = 1; 

  const startIndex = (currentPage - 1) * countriesPerPage;
  const paginated = filtered.slice(startIndex, startIndex + countriesPerPage);

  return { paginated, total: filtered.length };
};

const showCountries = () => {
    console.log(getPaginatedCountries())
  html = '';
  
  const { paginated, total } = getPaginatedCountries();

  if (paginated.length === 0) {
    html = '<div>No Country exists</div>';
  } else {
    paginated.forEach(country => {
      html += buildCountryCard(country);
    });
  }

  countries.innerHTML = html;
  CountriesTotal.textContent = `${filterCountries.value === 'Show All' ? 'All regions' : filterCountries.value} contain ${total} countries`;

  renderPageNumbers();
};


filterCountries.addEventListener('change', showCountries);

searchCountry.addEventListener('input', showCountries);




sortPopulation.addEventListener('change', showCountries);


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



const renderPageNumbers = () => {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('button');
        pageLink.textContent = i;
        if (i === currentPage) pageLink.classList.add('active');
        pageLink.addEventListener('click', () => {
            currentPage = i;
            showCountries();
        });
        pagination.appendChild(pageLink);
    }
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
};

nextBtn.addEventListener('click', e => {
    e.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        showCountries();
    }
});

prevBtn.addEventListener('click', e => {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        showCountries();
    }
});

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


