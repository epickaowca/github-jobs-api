import styled from 'styled-components'
import DarkMode from './darkMode'

const StyledHeader = styled.header`
width: 100vw;
height: 136px;
background: ${p=>p.theme.violet};
background-image: url('/assets/mobile/bg-pattern-header.svg');
background-size: cover;
& > div{
    max-width: 720px;
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    padding-top: 0px;
    & > h1{
        color: white;
    }
}
    ${p=>p.theme.media.tablet}{
        border-bottom-left-radius: 50px;
        background-image: url('/assets/tablet/bg-pattern-header.svg');
        & > div{
            width: 90%;
            max-width: 1100px;
        }
    }
    ${p=>p.theme.media.desktop}{
        background-image: url('/assets/desktop/bg-pattern-header.svg');
        & > div{
        }
    }
`

const Header = () => {
    return (
        <StyledHeader>
            <div>
                <h1>devjobs</h1>
                <DarkMode />
            </div>
        </StyledHeader>
    )
}

export default Header
