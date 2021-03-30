import React, { useContext, useReducer } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme(){
    return useContext(ThemeContext)
}
export function useUpdateTheme(){
    return useContext(ThemeUpdateContext)
}

function reducer(state,action){
    switch(action.type){
        case 'changeFilters':
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return state
    }
}


export const changeFiltersFunc = (payload)=>({type: 'changeFilters', payload})


export function ThemeProvider({children}){
    const [state, setState] = useReducer(reducer, {
        description: '',
        location: '',
        fullTime: ''
    })

    return(
        <ThemeContext.Provider value={state}>
            <ThemeUpdateContext.Provider value={setState}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}