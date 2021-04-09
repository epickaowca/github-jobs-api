export const DARK_MODE = 'app/dark_mode'
//nowe funckje
export const FETCH_FOR_JOBS = 'app/fetch_for_jobs'
export const FETCH_FOR_JOBS_SUCCES = 'app/fetch_for_jobs_succes'
export const FETCH_FOR_JOBS_FAIELD = 'app/fetch_for_jobs_faield'

export interface appStateInterface{
    readonly darkMode: boolean
    readonly jobs: []
    readonly error: boolean
    readonly filtersOn: boolean
    readonly filters: Filters
    readonly isThereMore: boolean
    readonly homeLoading: boolean
    readonly selectedJobLoading: boolean
    readonly selectedJob: {} | string
}


const initialState:appStateInterface={
    darkMode: false,
    jobs: [],
    error: false,
    filters: {
        location: '',
        description: '',
        fullTime: false
    },
    filtersOn: false,
    isThereMore: false,
    homeLoading: false,
    selectedJobLoading: false,
    selectedJob: {description: '', company: '', company_logo: '', company_url: '', created_at: '', location: '', type: '', title: '', how_to_apply: ''},
}

const reducer = (state = initialState, action:ActionTypes)=>{
    switch(action.type){

        case DARK_MODE:
            return{
                ...state,
                darkMode: action.payload
            }
        case FETCH_FOR_JOBS:
            return{
                ...state,
                [action.payload.loadingCase]: true,
            }
        case FETCH_FOR_JOBS_SUCCES:{
            const { jobValue } = action.payload
            return{
                ...state,
                [action.payload.loadingCase]: false,
                [action.payload.jobName]: Array.isArray(jobValue) ? action.payload.clearPrevious ? jobValue : [...state.jobs, ...jobValue] : jobValue,
                isThereMore: action.payload.isMore
            }
        }
        case FETCH_FOR_JOBS_FAIELD:{
            return{
                ...state,
                [action.payload.jobName]: action.payload.errorValue,
                [action.payload.loadingCase]: false,
            }
        }
        default: return state
    }
}

export type DarkModeType = {type: typeof DARK_MODE, payload: boolean}
export type FetchForJobsType = {type: typeof FETCH_FOR_JOBS, payload: Filters}
export type FetchForJobsSuccesType = {type: typeof FETCH_FOR_JOBS_SUCCES, payload: FetchSuccesType}
export type FetchForJobsFaieldType = {type: typeof FETCH_FOR_JOBS_FAIELD, payload: FetchFaieldType}

type Filters = {
    location?: string
    description?: string
    fullTime?: boolean
    page?: number
    jobName?: string
    loadingCase?: string
    id?: string
    clearPrevious?: boolean
}

export type FetchSuccesType = {
    jobName?: string
    jobValue?: [] | {}
    loadingCase?: string
    clearPrevious?: boolean
    isMore:boolean
}

export type FetchFaieldType = {
    jobName?: string
    loadingCase?: string
    errorValue?: string
}



export type ActionTypes = DarkModeType | FetchForJobsType | FetchForJobsSuccesType | FetchForJobsFaieldType


export const setDarkMode = (payload:boolean):ActionTypes=>({type:DARK_MODE, payload})
export const fetchForJobs = (payload: Filters):ActionTypes=>({type:FETCH_FOR_JOBS, payload})

export default reducer