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
    data.forEach((name, index) => {
        if(`${data[index].region}` === 'Asia'){
  countries.innerHTML += `
        <div class="country-card">
 <img src="${data[index].flags.png}" alt="Flag Image" width="300">
    <h2>${data[index].name.common}</h2>
    <h3>${data[index].region}</h3>
    <p>${data[index].population}</p>
    </div>
`
        }
      
    })
}