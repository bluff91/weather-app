import { useFetch } from '../hooks/useFetch';
import { useTheme } from '../hooks/useTheme';
import env from 'react-dotenv';

function Forecast(props) {
    const apiKey = env.API_KEY || '3d1fac81aaea40b6896132143230504'
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${props.location}&days=7&aqi=no&alerts=no`
    
    const {data, isPending, error} = useFetch(URL)
    const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const getDayName = (dateStr) => {
        return dayNames[new Date(dateStr).getDay()]
    }
    const { color1, color2, color3, } = useTheme()
    return (
        <div className='forecast-container'>
            <h1 className='forecast-title' style={{backgroundColor:color2}} >Forecast for {props.location}</h1>
            {isPending && <h1 className='forecast-title'>Loading...</h1>}
            <div className='temp-forecast-container' style={{backgroundColor:color1}}>
                <div className='temp-forecast'>
                    
                    {error && <h1>{error}</h1>}
                    {data && data.forecast.forecastday.map(item => {
                        const { date } = item
                        const { maxtemp_c: maxTemp, mintemp_c: minTemp, avgtemp_c: avgTemp, 
                                daily_chance_of_rain:chanceToRain } = item.day
                        const { icon: iconSrc, text: conditionText } = item.day.condition
                        
                        return (
                        <div key = {date.toString()} className='forecast-card' style={{borderColor:color3}}>
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
                        </div>
                        )  
                    })}
                </div>
            </div>
        </div>
);
}

export default Forecast;