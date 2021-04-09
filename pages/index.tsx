import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { fetchForJobs } from '../redux/ducks/app'
import styled, {createGlobalStyle} from 'styled-components'
import Filter from '../components/home/filter'
import Header from '../elements/header'
import JobItem from '../components/home/jobItem'
import Button from '../elements/button'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${p=>p.darkMode ? p.theme.midnight : p.theme.light_gray};
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  & > button{
    margin-top: 50px;
    margin-bottom: 100px;
  }
`

const JobsSection = styled.section`
  max-width: 1150px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 80px;
  justify-content: center;
`

let firstTimeIndex = true
const Home = ()=> {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.app.homeLoading)
  const jobs = useSelector(state=>state.app.jobs)
  const darkMode = useSelector(state=>state.app.darkMode)
  const isMore = useSelector(state=>state.app.isThereMore)
  
  const friendlyArr = Array.from(Array(9).keys())
  const loadingArray = [...jobs, ...friendlyArr]

  const loadingJSX = loadingArray.map((e,index)=><JobItem key={index} {...(typeof e ==='number' ? { loadingCase: true } : {props: e} )} />)
  const itemJSX = jobs.map((job)=><JobItem props={job} key={job.id}></JobItem>)

  useEffect(() => {
      if(firstTimeIndex){
        firstTimeIndex = false
        dispatch(fetchForJobs({clearPrevious:true, loadingCase: 'homeLoading', jobName:'jobs'}))        
      }
  }, [firstTimeIndex])

  const loadMoreHandler = ()=>{
    dispatch(fetchForJobs({page:page+1, loadingCase: 'homeLoading', jobName:'jobs'}))
    setPage(prev=>prev+1)
  }

  return (
    <Wrapper darkMode={darkMode}>
      <GlobalStyle darkMode={darkMode} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>git hub jobs api project</title>
      </Head>
      <Header />
      <Filter />
      <JobsSection>
        {loading ? loadingJSX : jobs.length ?  itemJSX : <h1>nothing here</h1>}
      </JobsSection>
      {loading ? '' : isMore && <Button clickFunc={loadMoreHandler} content="Load More"  />}
    </Wrapper>
  )
}

export default Home