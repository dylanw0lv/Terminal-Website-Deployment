
const fetchWeather = async () => {
    const errorMSG = 
`An error occured. This command may not work with an ad blocker enabled.`;

    const response = await fetch("http://ip-api.com/json");

    if (!response.ok) {
        typeWriterEffect(errorMSG, ".output", 10);
    }

    const result = await response.json();
    let lat = result.lat;
    let lon = result.lon;
    let city = result.city;

    let url = `https://1dbtfjoli1.execute-api.us-east-1.amazonaws.com/?lat=37&lon=-79`;
    
    let requestWeather = await fetch(url);
    let weatherData = await requestWeather.json();

    console.log(weatherData)

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

}