export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name';
  return fetch(`${BASE_URL}/${name}?fields=name,flag,capital,population,region`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No countries found');
      }
      return response.json();
    });
}
