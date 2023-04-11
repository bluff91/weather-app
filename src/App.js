import env from 'react-dotenv';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Forecast from './components/Forecast';

import { useFetch } from './hooks/useFetch';
import { useEffect, useState } from 'react';

import {ImSpinner3} from 'react-icons/im'


function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('Iasi')

  // usually the API would not be posted here; it is just in case dotenv does not work
  const apiKey = env.API_KEY || '3d1fac81aaea40b6896132143230504'
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`

  const {data, isPending, error} = useFetch(url)

  const searchLocation = (search) => {
    setLocation(search)
  }
  
  useEffect(() => {
    setWeatherData(data)
  }, [data])

  return (
    <div className="App">
      <Navbar searchLocation={searchLocation}/>
      {isPending && <h1>{<ImSpinner3 />}Loading...</h1>}
      {error && <h1>{error}</h1>}
      {weatherData && <Home {...weatherData}/>}
      <Forecast location={location}/>
    </div>
  );
}

export default App;
