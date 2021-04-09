import { useRouter } from 'next/router'
import styled, { createGlobalStyle } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import CompanyPresentation from '../../../components/job/companyPresentation'
import JobInfo from '../../../components/job/jobInfo'
import Header from '../../../elements/header'
import Footer from '../../../components/job/footer'
import { fetchForJobs } from '../../../redux/ducks/app'

const StyledH1 = styled.h1`
    font-size: 3rem;
    text-align: center;
    margin-top: 50px;
    color: ${p=>p.darkMode ? 'rgba(255,255,255,.89)' : 'black'};
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${p=>p.darkMode ? p.theme.midnight : p.theme.light_gray};
  }
`

const Job = () => {
    const [jobState, setJobState] = useState({description: '', company: '', company_logo: '', company_url: '', created_at: '', location: '', type: '', title: '', how_to_apply: ''})
    const dispatch = useDispatch()
    const router = useRouter()
    const jobs = useSelector(state => state.app.jobs)
    const selectedJobFromRedux = useSelector(state => state.app.selectedJob)
    const darkMode = useSelector(state => state.app.darkMode)
    const {id} = router.query
    const [ rightJob ] = jobs.filter(j=>j.id === id) 
    const loading = useSelector(state=>state.app.selectedJobLoading)
    
    useEffect(() => {
        if(!rightJob){
            dispatch(fetchForJobs({jobName: 'selectedJob', id: id.toString(), loadingCase: 'selectedJobLoading'}))
        }else{
            setJobState(rightJob)
        }
    }, [])
    const { company, company_logo, company_url, type, location, created_at, title, description, how_to_apply } = rightJob ? jobState : typeof selectedJobFromRedux === 'string' ? jobState : selectedJobFromRedux
    return (
        <>
            {typeof selectedJobFromRedux === 'string' ? 
            <div>
                <GlobalStyle darkMode={darkMode} />
                <Header />
                <h1>Error: {selectedJobFromRedux}</h1>
            </div>:
            <div>
                <GlobalStyle darkMode={darkMode} />
                <Header />
                {loading ? 
                <StyledH1 darkMode={darkMode}>Loading...</StyledH1>:
                <>
                    {created_at &&
                    <>
                        <CompanyPresentation company={company} company_logo={company_logo} company_url={company_url} />
                        <JobInfo how_to_apply={how_to_apply} type={type} location={location} created_at={created_at} title={title} description={description} />
                        <Footer company={company_url} title={title} />
                    </>
                    }
                </>
                }
            </div>
            }
        </>
    )
}


export default Job