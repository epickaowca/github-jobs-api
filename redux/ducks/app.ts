export const DARK_MODE = 'app/dark_mode'
export const FETCH_JOBS_SUCCES = 'app/fetch_jobs_succes'
export const FETCH_JOBS_FAIL = 'app/fetch_jobs_fail'
export const FETCH_JOBS = 'app/fetch_jobs'

export interface appStateInterface{
    readonly darkmode: boolean
    readonly jobs: string
    readonly error: boolean
}

const initialState:appStateInterface={
    darkmode: false,
    jobs: '',
    error: false
}

const reducer = (state = initialState, action:ActionTypes)=>{
    switch(action.type){
        case DARK_MODE:
            return{
                ...state,
                darkmode: !state.darkmode
            }
        case FETCH_JOBS_SUCCES:
            console.log(action)
            return{
                ...state,
                jobs: action.jobs
            }
        case FETCH_JOBS_FAIL:
            return{
                ...state,
                error: true
            }
        default: return state
    }
}

export type DarkModeType = {type: typeof DARK_MODE}
export type FetchJobsSuccesType = {type: typeof FETCH_JOBS_SUCCES, jobs: any}
export type FetchJobsFailType = {type: typeof FETCH_JOBS_FAIL}
export type FetchJobsType = {type: typeof FETCH_JOBS, }

export type ActionTypes = DarkModeType | FetchJobsSuccesType | FetchJobsFailType | FetchJobsType

export const fetchJobs = ():ActionTypes=>({type:FETCH_JOBS })
export const darkMode = ():ActionTypes=>({type:DARK_MODE})

export default reducer