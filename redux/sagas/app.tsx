import * as types from '../ducks/app'
import { call, put, takeEvery, takeLatest, StrictEffect} from 'redux-saga/effects'
import axios from 'axios'
import { FetchJobsType } from '../ducks/app'
const apiUrl = 'https://jsonplaceholder.typicode.com/todos' 

function fetchJobs(){
    return axios.get(apiUrl)
    .then(res=>{
        const returnedData = res
        return returnedData
    })
    .catch(error=>{throw error})
}

function* GetJobs(){
    try{
        const allJobs = yield call(fetchJobs)
        yield put({ type: types.FETCH_JOBS_SUCCES, jobs: allJobs.data})
    }catch(e){
        yield put({ type: types.FETCH_JOBS_FAIL})
    }
}


function* rootSaga(): Generator<StrictEffect>{
    yield takeLatest(types.FETCH_JOBS, GetJobs)
}

export default rootSaga