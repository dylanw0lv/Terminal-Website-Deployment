const fetchWeather = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        let lon = pos.coords.longitude;
        let lat = pos.coords.latitude;

        let url = `https://1dbtfjoli1.execute-api.us-east-1.amazonaws.com/?lat=${lat}&lon=${lon}`;
        
        try {
        let requestWeather = await fetch(url);
        let weatherData = await requestWeather.json();

        console.log(weatherData)

        let city = weatherData.name;
        let temp = weatherData.main.temp;
        let description = weatherData.weather[0].description;
        let humidity = weatherData.main.humidity;
        let windSpeed = weatherData.wind.speed;
        let feelsLike = weatherData.main.feels_like;
        let message =
`The current temperature in ${city} is ${temp}°F.
It feels like ${feelsLike}°F.
Description: ${description}
Humidity: ${humidity}%
Wind Speed: ${windSpeed} mph`;

        typeWriterEffect(message, ".output", 10);
        } catch (e) {
            console.log(e);
            typeWriterEffect("An error occurred. Try again...");
        }
    });
}

