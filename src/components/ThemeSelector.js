import { useTheme } from '../hooks/useTheme'

const themeColors = [
    {color1:'#DEB3AD', color2:'#DE847B', color3:'#B95C50'}, 
    {color2:'#D4F1F4', color1:'#75E6DA', color3:'#189AB4'}, 
    {color1:'#B1D8B7', color2:'#76B947',  color3:'#94C973'}
]

function ThemeSelector() {

    const {changeColor} = useTheme()

    return (
        <div className='theme-selector'>
            <div className="theme-buttons">
                {themeColors.map(item => {
                    const {color1, color2, color3} = item
                    return (
                        <div 
                            key={color1} 
                            onClick={() => changeColor(color1, color2, color3)}
                            style={{background: item.color1}} 
                        />  
                )})}
            </div>
        </div>
    );
}

export default ThemeSelector;