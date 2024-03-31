const apiKey = "71651523fe697bda4aa9664261fbf013";
// const city = "Islamabad ";

async function fetchWheatherdata(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch wheahter data");
    }
    const data = await response.json();
    console.log(data);
    //   console.log(data.main.temp)
    //   console.log(data.name)
    //   console.log(data.main.humidity)
    //   console.log(data.wind.speed)
    //   console.log(data.visibility)

    updateWeatherUI(data);
  } catch (err) {
    console.log(err);
  }
}

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const description = document.querySelector(".description-text");
const dates = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

// fetchWheatherdata();

function updateWeatherUI(data) {
  cityElement.textContent = data.name;
  tempElement.innerHTML = `${Math.floor(Math.round(data.main.temp))}°C`;
  windSpeed.textContent = `${data.wind.speed}km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = `${data.visibility / 1000}Km`;
  description.textContent = data.weather[0].description;
  const currentDate = new Date();
  dates.textContent = currentDate.toDateString();
  const wheatherIconName = getWheatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="material-icons">${wheatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");
formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = inputElement.value;
  if (city !== "") {
    fetchWheatherdata(city);
  }
});

function getWheatherIconName(whatherCondition) {
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };
  return iconMap[whatherCondition] || "help";
}
