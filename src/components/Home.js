import './Home.css'
import { useEffect, useRef, useState } from 'react';
import env from 'react-dotenv';
import { useFetch } from '../hooks/useFetch';
import Forecast from './Forecast';


function Home() {

    let locationRef = useRef('')
    const [location, setLocation] = useState('Iasi')
    const apiKey = env.API_KEY
   
    const URL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
    const {data, error, isPending} = useFetch(URL)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLocation(locationRef.current.value)
        locationRef.current.value = ""
        console.log(locationRef.current.value)
    }
    
    return (
        <div className='home'>
            <div className='singlecast'>
                {isPending && <h1>Loading...</h1>}
                {error && <h1>{error}</h1>}
                {data &&
                    <div className='single-card'>
                        <div>{`${data.location.name}, ${data.location.country}`}</div>
                        <div>{data.location.localtime}</div>
                        <div>{data.current.condition.cloud}</div>
                        <img src={data.current.condition.icon} alt=''/>
                        <div>{data.current.condition.text}</div>
                        <div>Temperature: {data.current.temp_c} °C</div>
                        <div>Feels like: {data.current.feelslike_c} °C</div>
                        <div>Wind: {data.current.wind_kph} km/h</div>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Location here'
                    maxLength={25}
                    ref={locationRef}
                    />
                </form>
            </div>
            {data && <Forecast location={location}/>}
        </div>
    );
}

export default Home;