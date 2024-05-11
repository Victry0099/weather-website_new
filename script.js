let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-datetime")
let w_forecast = document.querySelector(".weather-forecast")
let w_temperature = document.querySelector(".weather-temperature")
let w_icon = document.querySelector(".weather-icon")
let w_minTem = document.querySelector(".weather-min")
let w_maxTem  = document.querySelector(".weather-max")

let w_feelslike = document.querySelector(".weather-feelslike")
let w_humidity  = document.querySelector(".weather-humidity")
let w_wind  = document.querySelector(".weather-wind")
let w_pressure  = document.querySelector(".weather-pressure")
let citySearch = document.querySelector(".weather-search");

// ? get actual country name
const getCountryName= (code)=>{
return new Intl.DisplayNames([code], {type: "region"}).of(code);
};

//? get time and date 
const getDateTime = (dt)=>{

    let curDate = new Date(dt * 1000);
    console.log(curDate)

    const options = {
        weekday: "long",
        year : "numeric",
        month : "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);

    return formatter.format(curDate);;
}
let city = "satna";
// Search functionality 
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityNameInput = document.querySelector(".city_name");
    city = cityNameInput.value;
    console.log(city);

    getWeatherData();
    cityNameInput.value = "";
});


const getWeatherData = async()=>{
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=15eba8dac93b804ce70fea5b1e2692dd`;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15eba8dac93b804ce70fea5b1e2692dd`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data)

        const {main, name, weather, wind, sys, dt} = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt)
        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max ${main.temp_max.toFixed()}&#176`;

        w_forecast.innerHTML = weather[0].main;
        // w_icon.innerHTML = `${weather[0].icon}`;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;


        w_feelslike.innerHTML = `${main.feels_like}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`;

      

    } catch (error) {
        console.log(error)
    }

}

document.body.addEventListener("load", getWeatherData());
