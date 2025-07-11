/* API (Application Programming Interface) lets two programs talk to each other. In our case:
You send a request to https://dog.ceo/api/breeds/image/random
It sends back a random dog image in this format:
{
  "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "status": "success"
}

*/

const btn = document.getElementById('loadCountries');
const countries = document.getElementById('countries-container');

const name = 'Pakistan';


btn.addEventListener('click', () => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,population`)
        .then((res) => res.json())
        .then((data) => {
            showCountries(data)
        }).catch((err) => {
            console.error(err);
        })
});

const showCountries = (data) => {
    data.forEach((country) => {
        if(country.region === 'Asia'){
  countries.innerHTML += `
        <div class="country-card">
 <img src="${country.flags.png}" alt="${country.flags.alt}" width="300">
    <h2>${country.name.common}</h2>
    <h3>${country.region}</h3>
    <p>${country.population}</p>
    </div>
`}
      
    })
}