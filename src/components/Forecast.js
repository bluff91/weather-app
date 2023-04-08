import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import env from 'react-dotenv';

function Forecast(props) {

    const [location, setLocation] = useState(props.location)
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${env.API_KEY}&q=${props.location}&days=7&aqi=no&alerts=no`
    const {data, isPending, error} = useFetch(URL)
    const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    console.log(data);
    

    const getDayName = (dateStr) => {
        return dayNames[new Date(dateStr).getDay()]
    }
 
    return (
        <div>
            <h1 className='forecast-title'>Forecast for {props.location}</h1>
            <div className='temp-forecast'>
                {data && data.forecast.forecastday.map(item => {
                    //destructure ?
                    const { date } = item
                    const { maxtemp_c: maxTemp, mintemp_c: minTemp, avgtemp_c: avgTemp, 
                            daily_chance_of_rain:chanceToRain } = item.day
                    const { icon: iconSrc, text: conditionText } = item.day.condition
                    
            
                    return (
                    <div key = {date} className='card'>
                        <div>{getDayName(date)}</div>
                        <div>{date}</div>
                        <img src={iconSrc} alt="condition icon"/>
                        <div><b>{conditionText}</b></div>
                        <br/>
                        <div>Max temp: {Math.ceil(maxTemp)} °C</div>
                        <div>Min temp: {Math.ceil(minTemp)} °C</div>
                        <div>Average temp: {Math.ceil(avgTemp)} °C</div>
                        <div>Chance to rain: {chanceToRain}%</div>
                        
                        <br/>
                        <div>Temp at 8am: {Math.ceil(item.hour[8].temp_c)} °C</div>
                        <div>Temp at 12am: {Math.ceil(item.hour[12].temp_c)} °C</div>
                        <div>Temp at 4pm: {Math.ceil(item.hour[16].temp_c)} °C</div>
                        <div>Temp at 8pm: {Math.ceil(item.hour[20].temp_c)} °C</div>
                        <button>Hourly forecast</button>
                    </div>
                    )  
                })}
            </div>
        </div>
);
}

export default Forecast;