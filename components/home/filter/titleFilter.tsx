import styled from 'styled-components'
import FilterIco from '../../../public/assets/mobile/icon-filter.svg'
import Loupe from '../../../public/assets/desktop/icon-search.svg'
import { fetchForJobs } from '../../../redux/ducks/app'
import { useDispatch } from 'react-redux'
import React from 'react'
import { useTheme, useUpdateTheme, changeFiltersFunc } from './stateFilter'

const StyledtitleFilter = styled.div`
margin: 20px;
display: flex;
flex-direction: row-reverse;
justify-content: space-between;
align-items: center;
& > input{
    padding: 5px;
    font-size: 1rem;
    background: transparent;
    outline: none;
    border: none;
    &:hover{
        opacity: .8;
    }
}
& > div{
    display: flex;
    justify-content: center;
    align-items: center;
    & > div{
        background: ${p=>p.theme.violet};
        display: flex;
        width: 34px;
        height: 34px;
        border-radius: 2px;
        & > svg{
            transform: scale(.8);
            margin: auto;
            cursor: pointer;
            & > path{
                fill: white;
            }
        }
    }
    & > svg{
        cursor: pointer;
        margin-right: 15px;
    }
}
${p=>p.theme.media.tablet}{
    flex-direction: row;
    border-right: 1px solid rgba(110,128,158,.4);
    margin: 0px;
    width: 40%;
    & > input{
        width: 80%;
        font-size: .9rem;
    }
    & > div{
        & > svg{
            display: none;
        }
        & > div{
            background: transparent;
            & > svg{
                & > path{
                    fill: #5964E0;
                }
            }
        }
    }
}
`

interface TitleFilterInterface {
    changeProps: React.Dispatch<React.SetStateAction<boolean>>
}


const TitleFilter:React.FC<TitleFilterInterface> = ({changeProps}) => {
    const dispatch = useDispatch()
    const localState = useTheme()
    const localDispatch = useUpdateTheme()

    const searchHandler = ()=>{
        const { description, location, fullTime } = localState
        dispatch(fetchForJobs({description, location, fullTime, clearPrevious: true, loadingCase: 'homeLoading', jobName: 'jobs'}))
    } 
    return (
        <StyledtitleFilter>
            <div>
                <FilterIco onClick={()=>changeProps(true)} />
                <div onClick={searchHandler}>
                    <Loupe />
                </div>
            </div>
            <input value={localState.description} onChange={e=>localDispatch(changeFiltersFunc({name: 'description', value: e.target.value}))} type="text" placeholder="Filter by title..." />
        </StyledtitleFilter>
    )
}

export default React.memo(TitleFilter)
