import { useSelector, useDispatch } from 'react-redux'
import { fetchJobs } from '../redux/ducks/app'

export default function Home() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  console.log(state)
  return (
    <div>
      <button onClick={()=>dispatch(fetchJobs())}>Fetch</button>
     index
    </div>
  )
}
