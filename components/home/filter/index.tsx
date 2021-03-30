import styled from 'styled-components'
import TitleFilter from './titleFilter'
import LocationFilter from './locationFilter'
import { useState } from 'react'
import { ThemeProvider } from './stateFilter'

const StyledFilter = styled.section`
    background: white;
    border-radius: 15px;
    margin-top: -32px;
    & > div{
        &:nth-child(3){
            z-index: 50;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,.4);
            left: 0px;
            top: 0px;
            display: ${p=>p.locationVisible ? 'block' : 'none'}
        }
    }
    ${p=>p.theme.media.tablet}{
        display: flex;
        height: 85px;
        padding: 0px 20px;
        min-width: 720px;
        width: 80%;
        max-width: 1000px;
        & > div{
            &:nth-child(3){
                display: none !important;
            }
        }
    }
    ${p=>p.theme.media.desktop}{
        min-width: 1100px;
    }
`

const Filter = () => {
    const [locationVisible, setLocationVisible] = useState(false)
    
    return (
        <ThemeProvider>
            <StyledFilter locationVisible={locationVisible}>
                <TitleFilter changeProps={setLocationVisible} />
                <LocationFilter changeProps={setLocationVisible} props={locationVisible} />
                <div onClick={()=>setLocationVisible(false)}></div>
            </StyledFilter>
        </ThemeProvider>
    )
}

export default Filter
