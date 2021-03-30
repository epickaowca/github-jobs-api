import styled from 'styled-components'
import Moon from '../../public/assets/desktop/icon-moon.svg'
import Sun from '../../public/assets/desktop/icon-sun.svg'

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
    return (
        <StyledDarkMode>
            <Sun />
            <StyledCheckBox type='checkbox'  />
            <Moon />
        </StyledDarkMode>
    )
}

export default DarkMode
