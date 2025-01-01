const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time-location p");
const dateAndTimeField = document.querySelector(".time-location span");
const conditionField = document.querySelector(".condition p");
const conditionIcon = document.querySelector(".condition img");
const searchField = document.querySelector(".search-area");
const form = document.querySelector("form");

let targetLocation = "Bengaluru";

form.addEventListener("submit", searchForLocation);

const fetchWeatherData = async () => {
    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=3ce2384caa084bf7beb130834242912&q=${targetLocation}&aqi=no`;
        const res = await fetch(url);
        const data = await res.json();

        updateDetails(
            data.current.temp_c,
            data.location.name,
            data.location.localtime,
            data.current.condition.text,
            data.current.condition.icon
        );
    } catch (error) {
        alert("Unable to fetch weather data. Please try again later.");
    }
};

function updateDetails(temp, location, time, condition, icon) {
    const [date, clock] = time.split(" ");
    const currentDay = getDayName(new Date(date).getDay());

    temperatureField.textContent = `${temp}°C`;
    locationField.textContent = location;
    dateAndTimeField.textContent = `${currentDay}, ${date} ${clock}`;
    conditionField.textContent = condition;
    conditionIcon.src = `https:${icon}`;
    conditionIcon.alt = condition;

    addAnimation(temperatureField, "fade-in");
    addAnimation(locationField, "fade-in");
    addAnimation(dateAndTimeField, "fade-in");
    addAnimation(conditionField, "fade-in");
    addAnimation(conditionIcon, "fade-in");
}

function searchForLocation(e) {
    e.preventDefault();
    const inputLocation = searchField.value.trim();
    if (inputLocation) {
        targetLocation = inputLocation;
        fetchWeatherData();
        searchField.value = "";
    } else {
        alert("Please enter a valid location.");
    }
}

function getDayName(dayNumber) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayNumber] || "";
}

function addAnimation(element, animationName) {
    element.classList.add(animationName);
    setTimeout(() => element.classList.remove(animationName), 1000);
}

fetchWeatherData();
