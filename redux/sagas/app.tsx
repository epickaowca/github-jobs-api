import * as types from '../ducks/app'
import { call, put, takeEvery, takeLatest, StrictEffect} from 'redux-saga/effects'
import axios from 'axios'
import { FetchJobsType } from '../ducks/app' 

function fetchJobs(options){
    const url = (`http://localhost:3000/api/selectedPage?${'description='+options.description}&${'full_time='+options.fullTime}&${'location='+options.location}`)
    return axios.get(url)
    .then(res=>{
        const returnedData = res
        return returnedData
    })
    .catch(error=>{throw error})
}

function* GetJobs(payload){
    try{
        const allJobs = yield call(()=>fetchJobs(payload.payload))
        const isMore =  allJobs.data.length === 50 ? true : false
        console.log(isMore)
        yield put({ type: types.FETCH_JOBS_SUCCES, jobs: allJobs.data, isMore })
    }catch(e){
        yield put({ type: types.FETCH_JOBS_FAIL})
    }
}


function* rootSaga(): Generator<StrictEffect>{
    yield takeLatest(types.SET_FILTERS, GetJobs)
}

export default rootSaga