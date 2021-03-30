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

export default function Home({article}) {
  const dispatch = useDispatch()
  const jobs = useSelector(state=>state.app.jobs)
  const darkMode = useSelector(state=>state.app.darkMode)
  console.log(jobs)


  useEffect(() => {
    dispatch(passFirst50(article))
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
        {jobs.length && jobs.map((job, index)=><JobItem props={job} key={index}></JobItem>)}
      </JobsSection>
    </Wrapper>
  )
}


export const getStaticProps = async()=>{
  const res = await axios(`${server}/api/selectedPage?page=1`)
  const article = res.data
  return{
      props:{
          article,
      }
  }
}