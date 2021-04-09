import * as types from '../ducks/app'
import { call, put, takeEvery, takeLatest, StrictEffect} from 'redux-saga/effects'
import axios from 'axios'
import { FetchForJobsType } from '../ducks/app'
import { server } from '../../config'


function* rootSaga(): Generator<StrictEffect>{
    yield takeEvery(types.FETCH_FOR_JOBS, getJobWorker)
}


function* getJobWorker({payload}:FetchForJobsType){
    try{
        const job = yield call(()=>fetchJob(payload))
        const isMore =  job.data.length === 50 ? true : false
        yield put({ type: types.FETCH_FOR_JOBS_SUCCES, payload: {isMore, jobName: payload.jobName, jobValue: job.data, loadingCase: payload.loadingCase, clearPrevious: payload.clearPrevious} })
    }catch(e){
        yield put({ type: types.FETCH_FOR_JOBS_FAIELD, payload: {errorValue: e.message, jobName: payload.jobName, loadingCase: payload.loadingCase}})
    }
}


function fetchJob(options){
    if(options.loadingCase==="homeLoading"){
        let url
        if(options){
            url = (`${server}/api/selectedPage?${options.page ? 'page='+options.page : ''}${options.description ? 'description='+options.description : ''}&${options.fullTime ? 'full_time='+options.fullTime : ''}&${options.location ? 'location='+options.location : ''}`)
        }else{
            url = (`${server}/api/selectedPage`)
        }
        return axios.get(url)
        .then(res=>res)
        .catch(error=>{throw error})
    }else if(options.loadingCase==='selectedJobLoading'){
        return axios.get(`${server}/api/selectedJob?id=${options.id}`)
        .then(res=>res)
        .catch(error=>{throw error})
    }
}









export default rootSaga