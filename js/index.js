import debounce from "https://cdn.jsdelivr.net/npm/lodash.debounce@4.0.8/+esm";
import fetchCountries from "./fetchCountries.js";
const input = document.querySelector("#search-box");
const results = document.querySelector("#results");
const notification = document.querySelector("#notification");
const DEBOUNCE_DELAY = 500;
function clearAll() {
  results.innerHTML = "";
  notification.textContent = "";
}

function showNotification(msg) {
  clearAll();
  notification.textContent = msg;
}
function showCountriesList(countries) {
  clearAll();
  const listItems = countries
    .map((c) => `<li class="country-item" data-name="${c.name}">${c.name}</li>`)
    .join("");
  results.innerHTML = `<ul>${listItems}</ul>`;

  results.querySelectorAll(".country-item").forEach((item) => {
    item.onclick = () =>
      showCountryDetails(countries.find((c) => c.name === item.dataset.name));
  });
}
function showCountryDetails(country) {
  clearAll();
  results.innerHTML = `
    <h2>${country.name}</h2>
    <img src="${country.flag}" alt="Прапор ${country.name}" width="150" />
    <p><b>Столиця:</b> ${country.capital || "нема даних"}</p>
    <p><b>Населення:</b> ${country.population.toLocaleString()}</p>
    <p><b>Регіон:</b> ${country.region}</p>
  `;
}
const handleInput = debounce(() => {
  const query = input.value.trim();
  if (!query) {
    clearAll();
    return;
  }
  fetchCountries(query)
    .then((countries) => {
      if (countries.length > 10) {
        showNotification("Забагато результатів. Уточніть запит.");
      } else if (countries.length === 1) {
        showCountryDetails(countries[0]);
      } else if (countries.length >= 2) {
        showCountriesList(countries);
      }
    })
    .catch(() => showNotification("Країну не знайдено."));
}, DEBOUNCE_DELAY);
input.addEventListener("input", handleInput);
