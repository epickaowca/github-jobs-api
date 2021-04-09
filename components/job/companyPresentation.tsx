import styled from 'styled-components'
import Button from '../../elements/button'
import { useSelector } from 'react-redux'

const Wrapper = styled.section`
    background:${p=>p.darkMode ? p.theme.very_dark_blue : 'white'};
    border-radius: 7px;
    width: 90%;
    max-width: 380px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transform: translateY(-15px);
    padding-bottom: 35px;
    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        & > img{
            width: 60px;
            height: 47px;
            object-fit: cover;
            border-radius: 17px;
            position: relative;
            transform: translateY(-50%);

        }
        & > div{
            margin-top: 5px;
            margin-bottom: 25px;
            text-align: center;
            & > h1{
                color:${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                margin-bottom: 7px;
            }
            & > a{
                color:${p=>p.darkMode ? 'white' : 'black'};
                opacity: .7;
            }
        }
    }
    ${p=>p.theme.media.tablet}{
        transform: translateY(-35px);
        max-width: 1000px;
        flex-direction: row;
        justify-content: space-between;
        padding: unset;
        border-radius: 10px;
        & > div{
            flex-direction: row;
            & > img{
                width: 180px;
                height: 180px;
                transform: unset;
                border-radius: unset;
                border-bottom-left-radius: 10px;
            }
            & > div{
                text-align: left;
                margin: unset;
                margin-left: 45px;
                & > h1{
                    font-size: 1.8rem;
                    margin-bottom: 15px;
                }
                & > a{
                    font-size: 1.1rem;
                }
            }
        }
        & > a{
            margin-right: 35px;
        }
    }
`

interface CompanyPresentationInterface{
    company: string
    company_logo: string
    company_url: string
}


const CompanyPresentation:React.FC<CompanyPresentationInterface> = ({company, company_logo, company_url}) => {
    const darkMode = useSelector(state=>state.app.darkMode)
    return (
        <Wrapper darkMode={darkMode}>
            <div>
                <img src={company_logo} />
                <div>
                    <h1>{company}</h1>
                    <a href={company_url}>{company_url}</a>
                </div>
            </div>
            <a href="#">
                <Button case2 content='Company Site' />
            </a>
        </Wrapper>
    )
}

export default CompanyPresentation
