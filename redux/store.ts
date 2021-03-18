import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaapplyMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './ducks'
import rootSaga from './sagas'

const middleware = [thunk]
const sagaMiddleware = createSagaapplyMiddleware()

export type AppState = ReturnType<typeof reducer>

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store