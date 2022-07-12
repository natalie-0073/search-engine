import React, { useState } from "react";
import axios from "axios";
export default function WeatherSearch() {
    const [city,setCity]=useState("");
    const [weather, setWeather]=useState({});
    const [loaded, setLoaded]=useState(false);
   
    
    
  function displayWeather(response) {
    
    setWeather({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        icon: `http://openweathermap.org/img/wn/${
          response.data.weather[0].icon
        }@2x.png`,
        description: response.data.weather[0].description
    });
  }
  
    function handleSubmit(event) {
        event.preventDefault();
        setLoaded(true);
        let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
        
    }
    function updateCity(event){
        setCity(event.target.value);
    }
    let form =(<form onSubmit = {handleSubmit} >
        <input type = "text" onChange={updateCity} />
        <button> Search </button></form>);
    if(loaded){
        return (
            <div>
            {form}
            <ul>
                <li>Temperature: {Math.round(weather.temperature)}&deg;C</li>
                <li>Wind speed: {Math.round(weather.wind)}km/h</li>
                <li>Humidity: {weather.humidity}%</li>
                <li><img src={weather.icon} alt={weather.description} width="100"/></li>
                <li>Description: {weather.description}</li>
            </ul>
            </div>
        );
    }
    else{
        return(
            <div>
                {form}
                
            </div>
        );
    }
    
}