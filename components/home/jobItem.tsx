import styled from 'styled-components'

const StyledJobItem = styled.div`
    background: white;
    position: relative;
    max-width: 320px;
    height: 220px;
    width: 80%;
    margin: 25px;
    padding: 25px;
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
            & > span{
                opacity: .6;
            }
            & > strong{
                font-weight: bold;
                margin: 0px 15px;
            }
        }
    
        & > h3{
            font-size: 1.1rem;
        }
    
        & > p{
            margin: 15px 0px;
            opacity: .6;
        }
    }

    & > a{
        font-weight: bold;
        color: ${p=>p.theme.violet};
    }
`

interface JobItemInterface {
    props: {
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
}

const JobItem:React.FC<JobItemInterface> = ({props}) => {

    const datanowa:any = new Date()
    const datanowa2:any = props.created_at
    const datanowa3:any =  new Date(datanowa2.replace(/-/g,'/'))
    const milisecondsData = Math.abs(datanowa - datanowa3)
    let howManyAgo
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
    return (
        <StyledJobItem>
            <img src={props.company_logo ? props.company_logo : 'tutaj cos w zastępstwo'} alt='alt' />
            <section>
                <div>
                    <span>{howManyAgo}</span>
                    <strong>.</strong>
                    <span>{props.type}</span>
                </div>
                <h3>{props.title}</h3>
                <p>{props.company}</p>
            </section>
            <a>{props.location}</a>
        </StyledJobItem>
    )
}

export default JobItem
