import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StyledButton = styled.button`
    background: ${p=>p.case2 ?  'rgba(147,155,244,.2)'  : p.theme.violet};
    border: none;
    outline: none;
    color: ${p=>p.case2 ? p.darkMode ? 'white' : p.theme.violet : 'white'};
    width: 160px;
    padding: 20px 0px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 7px;
    cursor: pointer;
    &:hover{
        opacity: ${p=>p.case2 ? 1 : .65};
        background: ${p=>p.case2 ? p.darkMode ? 'rgba(157,174,194,.6)' :  'rgba(147,155,244,.6)' : p.theme.violet};
    }
`

interface ButtonInterface {
    content: string
    case2?: boolean
    clickFunc?: Function
}


const Button:React.FC<ButtonInterface> = ({content, case2, clickFunc}) =>{
    const darkMode = useSelector(state=>state.app.darkMode)
    return <StyledButton onClick={clickFunc} darkMode={darkMode} case2={case2}>{content}</StyledButton>
}

export default Button
