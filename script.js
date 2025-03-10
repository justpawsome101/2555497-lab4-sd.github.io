document.getElementById('submit-btn').addEventListener('click', function() {
    const countryName = document.getElementById('country-input').value.trim();
    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            displayCountryInfo(country);
            return fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`);
        })
        .then(response => response.json())
        .then(neighboringCountries => {
            displayNeighboringCountries(neighboringCountries);
        })
        .catch(error => {
            alert(error.message);
            clearDisplay();
        });
});

function displayCountryInfo(country) {
    const countryDetails = document.getElementById('country-details');
    countryDetails.innerHTML = `
        <div class="country-card">
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
        </div>
    `;
}

function displayNeighboringCountries(neighboringCountries) {
    const neighboringCountriesDiv = document.getElementById('neighboring-countries');
    neighboringCountriesDiv.innerHTML = neighboringCountries.map(country => `
        <div class="country-card">
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <h3>${country.name.common}</h3>
        </div>
    `).join('');
}

function clearDisplay() {
    document.getElementById('country-details').innerHTML = '';
    document.getElementById('neighboring-countries').innerHTML = '';
}

function displayNeighboringCountries(neighboringCountries) {
    const neighboringCountriesDiv = document.getElementById('neighboring-countries');
    neighboringCountriesDiv.innerHTML = neighboringCountries.map(country => `
        <div class="country-card">
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <h3>${country.name.common}</h3>
        </div>
    `).join('');
}
