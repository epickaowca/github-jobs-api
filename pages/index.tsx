import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { passFirst50 } from '../redux/ducks/app'
import styled from 'styled-components'
import Filter from '../components/home/filter'
import Header from '../elements/header'
import JobItem from '../components/home/jobItem'
import axios from 'axios'
import { server } from '../config'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const JobsSection = styled.section`
  max-width: 1150px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 50px;
  justify-content: center;
`

export default function Home() {
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.app.homeLoading)
  const jobs = useSelector(state=>state.app.jobs)
  const darkMode = useSelector(state=>state.app.darkMode)
  const firstTimeIndex = useSelector(state=>state.app.firstTimeIndex)
  const frendlyArr = Array.from(Array(9).keys())
  useEffect(() => {    
    if(!firstTimeIndex){
      dispatch(passFirst50())
    }

  }, [])
  return (
    <Wrapper darkMode={darkMode}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>git hub jobs api project</title>
      </Head>
      <Header />
      <Filter />
      <JobsSection>
        {loading ? frendlyArr.map(e=><JobItem key={e} loadingCase />) : jobs.length ? jobs.map((job, index)=><JobItem props={job} key={index}></JobItem>) : 'brak wyników'}
      </JobsSection>
    </Wrapper>
  )
}