import { createContext, useReducer } from "react";
export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    const {color1, color2, color3} = action.payload
    switch (action.type) {
        case 'CHANGE_COLOR':
        return {...state, color1, color2, color3}
        default:
        return state
    }
}

export function ThemeProvider ({children}) {
    const [state, dispatch] = useReducer(themeReducer, {
    })

    const changeColor = (color1, color2, color3) => {
        dispatch({ type: 'CHANGE_COLOR' , payload: {color1, color2, color3} })
    }

    return (
        <ThemeContext.Provider value={{...state, changeColor}}>
            {children}
        </ThemeContext.Provider>
    )
}
