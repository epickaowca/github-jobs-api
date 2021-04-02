import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { server } from '../../../config'

const getJobDirectly = async (id)=>{
    const res = await axios(`${server}/api/selectedJob?id=${id}`)
    return res.data
}


const Job = () => {
    const [jobState, setJobState] = useState()
    const router = useRouter()
    const jobs = useSelector(state => state.app.jobs)
    const {id} = router.query
    const [ rightJob ] = jobs.filter(j=>j.id === id) 
    

    useEffect(() => {
        const asyncStuff = async()=>{
            const rightJobReserve = await getJobDirectly(id)
            setJobState(rightJobReserve)
        }
        if(!rightJob){
            asyncStuff()
        }else{
            setJobState(rightJob)
        }
    }, [])

    
    console.log(jobState)


    return (
        <div>
            Article
        </div>
    )
}


export default Job