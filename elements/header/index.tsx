import styled from 'styled-components'
import DarkMode from './darkMode'

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    padding-top: 0px;
    background: ${p=>p.theme.violet};
    background-image: url('/assets/mobile/bg-pattern-header.svg');
    background-size: cover;
    width: 100vw;
    height: 136px;
    & > h1{
        color: white;
    }
    ${p=>p.theme.media.tablet}{
        border-bottom-left-radius: 50px;
        background-image: url('/assets/tablet/bg-pattern-header.svg');
    }
    ${p=>p.theme.media.desktop}{
        background-image: url('/assets/desktop/bg-pattern-header.svg');
    }
`

const Header = () => {
    return (
        <StyledHeader>
            <h1>devjobs</h1>
            <DarkMode />
        </StyledHeader>
    )
}

export default Header
