import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import timeConverter from '../../elements/timeConverter'
import { useSelector } from 'react-redux'


const StyledJobItem = styled.div`
border-radius: 15px;
background: ${p=>p.darkMode ? p.theme.very_dark_blue : 'white'};
position: relative;
max-width: 320px;
height: 220px;
width: ${p=>p.loadingCase ? '320px' : '80%'};
margin: 25px;
& > div{
    cursor: pointer;
    padding: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover{
        opacity: .8;
    }
    & > img{
        border-radius: 15px;
        top: 0px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        position: absolute;
        object-fit: cover;
    }
    & > section{
        & > div{
            margin-top: 25px;
            margin-bottom: 15px;
            display: flex;
            ${p=>p.loadingCase && `
                align-items: flex-end;
            `}
            & > span{
                color: ${p=>p.darkMode ? 'white' : 'black'};
                opacity: .6;
                ${p=>p.loadingCase && `
                max-width: 60px;
                width: 100%;
                height: 22px;
                background: #E2E2E2;
                `}
            }
            & > strong{
                color: ${p=>p.darkMode ? 'white' : 'black'};
                font-weight: bold;
                margin: 0px 15px;
                ${p=>p.loadingCase && `
                    max-width: 10px;
                    width: 100%;
                    height: 10px;
                    background: #E2E2E2;
                `}
            }
        }
    
        & > h3{
            color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
            font-size: 1.1rem;
            ${p=>p.loadingCase && `
                animation: loading 2s 1.5s infinite;
                max-width: 220px;
                width: 100%;
                height: 35px;
                background: #E2E2E2;
            `}
        }
    
        & > p{
            color: ${p=>p.darkMode ? 'white' : 'black'};
            margin: 15px 0px;
            opacity: .6;
            ${p=>p.loadingCase && `
                animation: loading 2s 2s infinite;
                max-width: 100px;
                width: 100%;
                height: 18px;
                background: #E2E2E2;
            `}
        }
    }

    & > p{
        font-weight: bold;
        color: ${p=>p.theme.violet};
        ${p=>p.loadingCase && `
        animation: loading 2s 2.5s infinite;
        max-width: 30px;
        width: 100%;
        height: 18px;
        background: #E2E2E2;
    `}
    }
}

@keyframes loading {
    0% {width: 0%}
    60% {width: 100%}
    90% {width: 100%}
    100%{opacity: 0}
  }
`

interface JobItemInterface {
    props?: {
        company?: string
        company_logo?: string
        company_url?: string
        created_at?: string
        description?: string
        how_to_apply?: string
        id?: string
        location?: string
        title?: string
        type?: string
        url?: string
    }
    loadingCase?: boolean
}

const JobItem:React.FC<JobItemInterface> = ({props, loadingCase}) => {
    const darkMode = useSelector(state=>state.app.darkMode)
    let howManyAgo
    if(props){
        howManyAgo = timeConverter(props.created_at)
    }


    return (
        <StyledJobItem darkMode={darkMode} loadingCase={loadingCase}>
            <Link href={loadingCase ?  '#' : `/job/${props.id}`}>
                <div>
                    <img src={loadingCase ? '/assets/greyBG.png' : props.company_logo ? props.company_logo : '/assets/noPhoto.jpg'} alt='alt' />
                    <section>
                        <div>
                            <span>{loadingCase ? '' : howManyAgo}</span>
                            <strong>{loadingCase ? '' : '.'}</strong>
                            <span>{loadingCase ? '' : props.type}</span>
                        </div>
                        <h3>{loadingCase ? '' : props.title}</h3>
                        <p>{loadingCase ? '' : props.company}</p>
                    </section>
                    <p>{loadingCase ? '' : props.location}</p>
                </div>
            </Link>
        </StyledJobItem>
    )
}

export default React.memo(JobItem)
