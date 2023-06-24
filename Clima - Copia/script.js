//Variaveis
const apiKey = "a171c7bc2b8b46b6e6dc0f9877bce9b6"; // chave da api cuidado
const apiCountryURL = "https://flagpedia.net/";

//seleção de elementos
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");



//Funções

const getWwatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    const data = await getWwatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", () => {
    
    event.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});


//revisar o enter depois
cityInput.addEventListener("keyup", (evt) => {
    if(evt.code === "Enter") 
    {
        const city = evt.target.value;
        showWeatherData(city);
    }
    if(evt.code === "click") 
    {
        const city = evt.target.value;
        showWeatherData(city);
    }
});