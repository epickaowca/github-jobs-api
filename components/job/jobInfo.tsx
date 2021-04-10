import React from 'react'
import styled from 'styled-components'
import Button from '../../elements/button'
import timeConverter from '../../elements/timeConverter'
import { useSelector } from 'react-redux'

const Wrapper = styled.section`
    width: 90%;
    max-width: 1000px;
    margin: auto;
    & h1{
        margin: .67em 0px;
    }
    & h2{
        margin: .83em 0px;
    }
    & h3{
        margin: 1.17em 0px;
    }
    & h4{
        margin: 1.33em 0px;
    }
    & h5{
        margin: 1.67em 0px;
    }
    & h6{
        margin: 2.33em 0px;
    }
    & p{
        margin: 1em 0px;
        line-height: 23px;
    }
    & ul{
        padding-left: 25px;
    }
    & li{
        padding-left: 15px;
        margin: 15px 0px;
    }
    
    & > div{
        margin: 15px 0px;
        padding: 25px;
        border-radius: 15px;
        &:nth-child(2){
            margin-top: 0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            background: ${p=>p.darkMode ? p.theme.very_dark_blue : 'white'};
            & p, & li {
                color: ${p=>p.darkMode ? 'rgba(255,255,255,.67)' : 'rgba(0,0,0,.67)'};
            }
            & strong, & h1, & h2, & h3, & h4, & h5, & h6 {
                color: ${p=>p.darkMode ? 'white' : 'black'};
            }
            & a {
                color: ${p=>p.darkMode ? 'white' : 'black'};
                text-decoration: underline;
            }
        }
        &:nth-child(3){
            background: ${p=>p.theme.violet};
            background-image: url('/assets/desktop/bg-pattern-header.svg');
            background-size: cover;
            color: white;
            & p, & li {
                color: rgba(255,255,255,.67);
            }
            & a {
                color: rgba(255,255,255,1);
                text-decoration: underline;
            }
            // ${p=>p.isApply && 'display: none'};
            & > a{
                margin-top: 35px;
                display: block;
            }
        }
    }
    & > section{
        &:nth-child(1){
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            padding: 25px;
            background: ${p=>p.darkMode ? p.theme.very_dark_blue : 'white'};
            & > div{
                text-align: center;
                max-width: 260px;
                margin: auto;
                & > div{
                    opacity: .7;
                    color: ${p=>p.darkMode ? 'white' : 'black'};
                    & > strong{
                        margin: 0px 15px;
                    }
                }
                & > h1{
                    color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                }
                & > h2{
                    color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                }
                & > p{
                    font-weight: bold;
                    color: ${p=>p.theme.violet};
                }
            }
            & > button{
                width: 100%;
                max-width: 300px;
                margin: auto;
                margin-top: 35px;
                display: block;
            }
        }
    }

    ${p=>p.theme.media.tablet}{
        & > section{
            &:nth-child(1){
                padding: 45px;
                padding-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                & > div{
                    text-align: left;
                    margin: 0px;
                    max-width: 400px;
                    & > h1{
                        font-size: 2rem;
                        margin: 20px 0px;
                    }
                }
                & > button{
                    width: 160px;
                    margin: 0px;
                }
            }
        }
        & > div{
            padding: 45px;
        }
    }
`

interface JobInfoInterface {
    description: string
    created_at: string
    title: string
    location: string
    type: string
    how_to_apply: string
}

const JobInfo:React.FC<JobInfoInterface> = ({description, created_at, title, location, type, how_to_apply: how_to_apply_props}) => {
    const darkMode = useSelector(state=>state.app.darkMode)
    const indexHowToApply:string | number = description.indexOf('<h2><strong>How to Apply</strong></h2>')
    const sliceHelper = indexHowToApply === -1 ? undefined : indexHowToApply
    const descriptionHelper = description.slice(0, sliceHelper)
    const howToApply = description.slice(indexHowToApply)
    const infoDiv =  React.createElement ('div', { dangerouslySetInnerHTML: {__html: descriptionHelper} })
    const howToApplyDiv =  React.createElement ('div', { dangerouslySetInnerHTML: {__html: howToApply} })
    const howToApplyLink =  React.createElement ('div', { dangerouslySetInnerHTML: {__html: how_to_apply_props} })
    const isApply = howToApplyDiv.props.dangerouslySetInnerHTML.__html.length === 1 ? true : false
    // timeConverter
    let howManyAgo
    if(created_at){
        howManyAgo = timeConverter(created_at)
    }
    return (
        <Wrapper darkMode={darkMode} isApply={isApply}>
            <section>
                <div>
                    <div>
                        <span>{howManyAgo}</span>
                        <strong>.</strong>
                        <span>{type}</span>
                    </div>
                    <h1>{title}</h1>
                    <p>{location}</p>
                </div>
                <Button content="Apply Now"></Button>
            </section>
            {infoDiv}
            <div>
                {isApply ? <h1>How to Apply</h1> : howToApplyDiv}
                {howToApplyLink}
            </div>
        </Wrapper>
    )
}

export default JobInfo
