
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

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=`
    document.cookie = `url=${url}`;

    let fileURL = "../php/weather-call.php";
    fetch(fileURL)
        .then((response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        }))
        .then((data) => {
            console.log(data);
            let temp = data.main.temp;
            let description = data.weather[0].description;
            let humidity = data.main.humidity;
            let windSpeed = data.wind.speed;
            let feelsLike = data.main.feels_like;
            let message =
`The current temperature in ${city} is ${temp}°F.
It feels like ${feelsLike}°F.
Description: ${description}
Humidity: ${humidity}%
Wind Speed: ${windSpeed} mph`;

            typeWriterEffect(message, ".output", 10);
        })
        .catch(err => console.log(err))
}

    
 


       
    
