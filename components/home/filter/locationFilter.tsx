import styled from 'styled-components'
import Image from 'next/image'
import Button from '../../../elements/button'
import { fetchForJobs } from '../../../redux/ducks/app'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme, useUpdateTheme, changeFiltersFunc } from './stateFilter'

const StyledLocationFilter = styled.div`    
    z-index: 70;
    border-radius: 10px;    
    padding: 25px 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 350px;
    display: ${p=>p.props ? 'flex' : 'none'};
    flex-direction: column;
    background: ${p=>p.darkMode ? p.theme.very_dark_blue : 'white' };
    & > div{
        &:nth-child(1){
            padding: 0px 25px;
            padding-bottom: 25px;
            border-bottom: 2px solid rgba(110,128,158,.4);
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            & > input{
                width: 90%;
                padding: 5px;
                font-size: 1rem;
                background: transparent;
                outline: none;
                border: none;
                color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                &:hover{
                    opacity: .8;
                }
            }
        }
        &:nth-child(2){
            & > div{
                margin: 25px 0px;
                padding: 0px 25px;
                display: flex;
                & > input{
                    margin-right: 25px;
                }
                & > label{
                    color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
                    display: flex;
                    font-weight: bold;
                    & > p{
                        &:nth-child(1){
                            margin-right:5px;
                        }
                    }
                }
            }
            & > button{
                width: 80%;
                margin-left: 25px;
            }
        }
    }

    ${p=>p.theme.media.tablet}{
        padding: 0px;
        z-index: 1;
        position: relative;
        top: unset;
        left: unset;
        transform: unset;
        width: unset;
        max-width: unset;
        flex-direction: row;
        min-width: 480px;
        width: 60%;
        display: flex !important;
        & > div{
            &:nth-child(1){
                padding-bottom: 0px;
                border-bottom: none;
                border-right: 1px solid rgba(110,128,158,.4);
                min-width: 220px;
                width: 50%;
                & > input{
                    font-size: .9rem;
                    margin-left: 15px;
                }
            }
            &:nth-child(2){
                width: 50%;
                display: flex;
                & > div{
                    margin: 0px;
                    padding: 0px 25px;
                    align-items: center;
                    & > input{
                        margin-right: 25px;
                    }
                    & > label{
                        font-weight: bold;
                        & > p{
                            &:nth-child(1){
                                white-space: nowrap;
                            }
                            &:nth-child(2){
                                display: none;
                            }
                        }
                    }
                }
                & > button{
                    width: 100px;
                    margin-left: 25px;
                    margin: auto;
                }
            }
        }
    }
`

interface LocationFilterInterface {
    props: boolean
    changeProps: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationFilter:React.FC<LocationFilterInterface> = ({props, changeProps}) => {
    const darkMode = useSelector(state=>state.app.darkMode)
    const dispatch = useDispatch()
    const localState = useTheme()
    const updateLocalState = useUpdateTheme()
    const searchHandler = ()=>{
        changeProps(false)
        const { description, location, fullTime } = localState
        dispatch(fetchForJobs({description, location, fullTime, clearPrevious: true, loadingCase: 'homeLoading', jobName: 'jobs'}))
    }
    return (
        <StyledLocationFilter darkMode={darkMode} props={props}>
            <div>
                <Image
                    src="/assets/desktop/icon-location.svg"
                    alt="location icon"
                    width={17}
                    height={24} 
                />
                <input value={localState.location} onChange={e=>updateLocalState(changeFiltersFunc({name: 'location',value: e.target.value}))} type="text" placeholder="Filter by location..." />
            </div>
            <div>
                <div>
                    <input checked={localState.fullTime} onChange={e=>updateLocalState(changeFiltersFunc({name: 'fullTime',value: e.target.checked}))} type="checkbox" id="fullTime"  />
                    <label htmlFor="fullTime"><p>Full Time</p><p>Only</p></label>
                </div>
                <Button clickFunc={searchHandler} content="Search" />
            </div>
        </StyledLocationFilter>
    )
}

export default LocationFilter
