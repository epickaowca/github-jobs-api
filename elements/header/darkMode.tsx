import React from 'react'
import styled from 'styled-components'
import Moon from '../../public/assets/desktop/icon-moon.svg'
import Sun from '../../public/assets/desktop/icon-sun.svg'
import { useSelector, useDispatch} from 'react-redux'
import { setDarkMode } from '../../redux/ducks/app'
const StyledDarkMode = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`
    
const StyledCheckBox = styled.input`
    margin: 0px 15px;
    appearance: none;
    width: 45px;
    height: 20px;
    background: white;
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    outline: none;
    &:after{
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        background: #fe7f00;
        border-radius: 50%;
        position: absolute;
        left: 5px;
        transition: all .5s cubic-bezier(0.22, 1, 0.36, 1);
        top: 50%;
        transform: translateY(-50%);
    }
    &:checked{
        &:after{
            left: 25px;
            background: ${p=>p.theme.dark_grey};
        }
    }
`

function DarkMode() {
    const darkMode = useSelector(state=>state.app.darkMode)
    const dispatch = useDispatch()
    return (
        <StyledDarkMode>
            <Sun />
            <StyledCheckBox type='checkbox' checked={darkMode} onChange={e=>dispatch(setDarkMode(e.target.checked))}  />
            <Moon />
        </StyledDarkMode>
    )
}

export default React.memo(DarkMode)
