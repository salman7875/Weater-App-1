// Creating an Object for storing the function & variables that will be necessary for using the API

let weather = {
    // 'apiKey' will be used to access weather
    "apiKey": "2bbae5b59a76b03a3adcbd866d1b1646",
    // Function to fetch Data from api
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then((res) => res.json())
                                                .then((data) => this.displayWeather(data))
    },
    // Function to display data
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.city').innerHTML = "Weather In " + name;
        document.querySelector('.temp').innerHTML = temp + "°C";
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.humidity').innerHTML = "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerHTML = "Wind Speed: " + speed + "km/h";
        document.querySelector('.weather').classList.remove('loading')
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    // Function for Search Bar
    search: function() {
        this.fetchWeather(document.querySelector('.search-box').value);
    }
}

document.querySelector('.search').addEventListener('click', function() {
    weather.search();
})

document.querySelector('.search-box').addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        weather.search();
    }
})

weather.fetchWeather("Mumbai")