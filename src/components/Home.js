import './Home.css'
import { useEffect, useRef, useState } from 'react';
import env from 'react-dotenv';
import { useFetch } from '../hooks/useFetch';


function Home(props) {
    let locationRef = useRef('')
    const [location, setLocation] = useState('Iasi')
    const apiKey = env.API_KEY
    const ai = '3d1fac81aaea40b6896132143230504'
   
    
    const testURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
    const {data, error, isLoading} = useFetch(testURL)
    
    // const { humidity} = data.location.current
    console.log(data)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLocation(locationRef.current.value)
        console.log(locationRef.current.value)
    }

    return (
        <div>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {data &&
                <>
                <h6>{data.current.cloud}</h6>
                <img src={data.current.condition.icon} alt=''/>
                </>
            }
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Location here'
                maxLength={25}
                ref={locationRef}
                />
            </form>
        </div>
    );
}

export default Home;