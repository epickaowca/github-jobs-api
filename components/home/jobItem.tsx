import styled from 'styled-components'
import Link from 'next/link'

const StyledJobItem = styled.div`
background: white;
position: relative;
max-width: 320px;
height: 220px;
width: ${p=>p.loadingCase ? '320px' : '80%'};
margin: 25px;
padding: 25px;
& > div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
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
                opacity: .6;
                ${p=>p.loadingCase && `
                    max-width: 60px;
                    width: 100%;
                    height: 22px;
                    background: #E2E2E2;
                `}
            }
            & > strong{
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

    const datanowa:any = new Date()
    const datanowa2:any = props ? props.created_at : ''
    const datanowa3:any =  new Date(datanowa2.replace(/-/g,'/'))
    const milisecondsData = Math.abs(datanowa - datanowa3)
    let howManyAgo
    if(props){
        if(milisecondsData > 0 && milisecondsData < 60000){
            howManyAgo = 'przed chwilą'
        }else if(milisecondsData >= 60000 && milisecondsData <3600000){
          const result = milisecondsData/60000
          howManyAgo = result.toFixed(0)+'min ago'
        }else if(milisecondsData >= 3600000 && milisecondsData <86400000){
          const result = milisecondsData/3600000
          howManyAgo = result.toFixed(0)+'hours ago'
        }else {
          const result = milisecondsData/86400000
          howManyAgo = result.toFixed(0)+'days ago'
        }
    }

    return (
        <StyledJobItem loadingCase={loadingCase}>
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

export default JobItem
