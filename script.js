async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("weatherResult").innerHTML =
            "Please enter a city";
        return;
    }

    const API_KEY = "";

    try {

        // 1. Get location key
        const locationUrl =
            `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`;

        const locRes = await fetch(locationUrl);
        const locData = await locRes.json();

        if (!locData || locData.length === 0) {
            throw new Error("City not found");
        }

        const locationKey = locData[0].Key;
        const cityName = locData[0].LocalizedName;

        // 2. Get current weather
        const weatherUrl =
            `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`;

        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        const w = weatherData[0];

        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${w.Temperature.Metric.Value}°C</p>
            <p>Condition: ${w.WeatherText}</p>
            <p>Is Day Time: ${w.IsDayTime}</p>
        `;

    } catch (err) {
        document.getElementById("weatherResult").innerHTML =
            err.message;
    }
}