import * as types from '../ducks/app'
import { call, put, takeEvery, takeLatest, StrictEffect} from 'redux-saga/effects'
import axios from 'axios'
import { SetFiltersType } from '../ducks/app'
import { server } from '../../config'

function fetchJobs(options){
    let url
    if(options){
        url = (`${server}/api/selectedPage?${options.page ? 'page='+options.page : ''}${options.description ? 'description='+options.description : ''}&${options.fullTime ? 'full_time='+options.fullTime : ''}&${options.location ? 'location='+options.location : ''}`)
    }else{
        url = (`${server}/api/selectedPage`)
    }
    return axios.get(url)
    .then(res=>{
        const returnedData = res
        return returnedData
    })
    .catch(error=>{throw error})
}

function* GetJobs({payload}:SetFiltersType){
    try{
        const allJobs = yield call(()=>fetchJobs(payload))
        const isMore =  allJobs.data.length === 50 ? true : false
        yield put({ type: types.FETCH_JOBS_SUCCES, jobs: allJobs.data, isMore })
    }catch(e){
        yield put({ type: types.FETCH_JOBS_FAIL})
    }
}


function* rootSaga(): Generator<StrictEffect>{
    yield takeLatest(types.SET_FILTERS, GetJobs)
    yield takeEvery(types.FIRST_50, GetJobs)
}

export default rootSaga