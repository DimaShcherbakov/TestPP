import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducer from "../reducers/createReducer";
import editReducer from '../reducers/editReducer';
import tableReducer from "../reducers/tableReducer";
import tableSaga from "../sagas/sagaTable";
import createSaga from "../sagas/sagaCreate";
import editSaga from '../sagas/sagaEdit';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  combineReducers({
    createState: createReducer,
    editState: editReducer,
    tableState: tableReducer
  }),
  {},
  applyMiddleware(...middleware)
);

sagaMiddleware.run(tableSaga);
sagaMiddleware.run(createSaga);
sagaMiddleware.run(editSaga);

export default store;
