import { useTheme } from "../hooks/useTheme";

function Home(props) {
   
    const {country, name:city, localtime } = props.location
    const { condition:{text, icon}, feelslike_c:feelsLike, temp_c:temp, precip_mm:precip, wind_kph:wind } = props.current

    const { color1, color2, color3, } = useTheme()
    
    return (
        <div className='home'>
            <div className='singlecast' style={{backgroundColor:color1}}>
                <div className='single-card' style={{borderColor:color3}} >
                    <div className='single-card-location'><b>{`${city}, ${country}`}</b></div>
                    <div>{localtime}</div>
                    <img src={icon} alt='weather condtion icon'/>
                    <div><b>{text}</b></div>
                    <br/>
                    <div>Temperature: {Math.ceil(temp)} °C</div>
                    <div>Feels like: {Math.ceil(feelsLike)} °C</div>
                    <div>Precipitations: {Math.ceil(precip)} mm/h</div>
                    <div>Wind: {Math.ceil(wind)} km/h</div>
                </div>
            </div>
        </div>
    );
}

export default Home;