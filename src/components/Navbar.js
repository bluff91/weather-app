import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs'
import { useTheme } from '../hooks/useTheme'
import ThemeSelector from './ThemeSelector';

function Navbar(props) {
    
    const locationRef = useRef('')
      
    const handleSearch = (e,location) => {
        e.preventDefault()
        if (locationRef.current.value === '') return 
        props.searchLocation(location)
        locationRef.current.value = ''
    }

    const { color1, color2, color3, } = useTheme()
    
    return (
        <div className='navbar' style={{backgroundColor:color2}}>
            <h2>My Weather App</h2>
            <div className='search-bar'>
                <form onSubmit={(e) =>handleSearch(e,locationRef.current.value)}>
                    <input 
                        type='text' 
                        ref={locationRef}
                        placeholder='Search...'
                    />
                </form>
                <BsSearch className='icon' onClick={(e) =>handleSearch(e, locationRef.current.value)}/>   
            </div>
            <ThemeSelector />
        </div>
    );
}

export default Navbar;