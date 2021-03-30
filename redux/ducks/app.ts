export const DARK_MODE = 'app/dark_mode'
export const FETCH_JOBS_SUCCES = 'app/fetch_jobs_succes'
export const FETCH_JOBS_FAIL = 'app/fetch_jobs_fail'
export const FETCH_JOBS = 'app/fetch_jobs'
export const SET_FILTERS = 'app/set_filters'
export const FIRST_50 = 'app/first_50'

export interface appStateInterface{
    readonly darkMode: boolean
    readonly jobs: []
    readonly error: boolean
    readonly page: number
    readonly filtersOn: boolean
    readonly filters: Filters
    readonly isThereMore: boolean
}

type Filters = {
        location: string
        description: string
        fullTime: boolean
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
    page: 1,
    filtersOn: false,
    isThereMore: false
}

const reducer = (state = initialState, action:ActionTypes)=>{
    switch(action.type){
        case FIRST_50:
            return{
                ...state,
                jobs: action.payload
            }
        case DARK_MODE:
            return{
                ...state,
                darkMode: !state.darkMode
            }
        case FETCH_JOBS_SUCCES:
            return{
                ...state,
                jobs: action.jobs,
                isThereMore: action.isMore
            }
        case FETCH_JOBS_FAIL:
            return{
                ...state,
                error: true
            }
        case SET_FILTERS:{
            return{
                ...state,
                filters: action.payload
            }
            }
        default: return state
    }
}

export type DarkModeType = {type: typeof DARK_MODE}
export type FetchJobsSuccesType = {type: typeof FETCH_JOBS_SUCCES, jobs: any, isMore: boolean}
export type FetchJobsFailType = {type: typeof FETCH_JOBS_FAIL}
export type FetchJobsType = {type: typeof FETCH_JOBS, }
export type SetFiltersType = {type: typeof SET_FILTERS, payload: Filters }
export type First50Type = {type: typeof FIRST_50, payload: []}




export type ActionTypes = DarkModeType | FetchJobsSuccesType | FetchJobsFailType | FetchJobsType | SetFiltersType | First50Type


export const fetchJobs = ():ActionTypes=>({type:FETCH_JOBS })
export const darkMode = ():ActionTypes=>({type:DARK_MODE})
export const setFilters = (payload: Filters):ActionTypes=>({type:SET_FILTERS, payload})
export const passFirst50 = (payload:[]):ActionTypes=>({type:FIRST_50, payload})

export default reducer