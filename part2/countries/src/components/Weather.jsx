import { useEffect, useState } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;


const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                const { data } = response;
                setWeather(data)
            });

    }, [capital])

    if (weather === null) {
        return <p>Loading weather...</p>
    }

    const { main: { temp }, wind: { speed } } = weather;

    return (
        <div>
            <h2>Wheather in {capital}</h2>
            <p>temperature {temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>wind {speed} m/s</p>
        </div>
    )

};

export default Weather;