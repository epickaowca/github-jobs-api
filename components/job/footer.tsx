import styled from 'styled-components'
import Button from '../../elements/button'
import { useSelector } from 'react-redux'

const StyledFooter = styled.footer`
    background: ${p=>p.darkMode ? p.theme.very_dark_blue : 'white'};
    margin-top: 80px;
    padding: 25px 10px;
    & > div{
        & > button{
            margin: auto;
            display: block;
            width: 90%;
            max-width: 350px;
        }
    }
    & > div{
        & > div{
            display: none;
        }
    }

    ${p=>p.theme.media.tablet}{
        & > div{
            display: flex;
            justify-content: space-between;
            padding: 0px 35px;
            max-width: 1070px;
            margin: auto;
            & > div{
                display: flex;
                flex-direction: column;
                & > h2{
                    margin-bottom: 15px;
                    color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                }
                & > p{
                    color: ${p=>p.darkMode ? 'white' : 'black'};
                    opacity: .7;
                }
            }
            & > button{
                width: 160px;
                margin: unset;
            }
        }
    }
`

interface FooterInterface{
    title: string
    company: string
}


const Footer:React.FC<FooterInterface> = ({ title, company }) => {
    const darkMode = useSelector(state=>state.app.darkMode)
    return (
        <StyledFooter darkMode={darkMode}>
            <div>
                <div>
                    <h2>{title}</h2>
                    <p>{company}</p>
                </div>
                <Button content="Apply Now" />
            </div>
        </StyledFooter>
    )
}

export default Footer
