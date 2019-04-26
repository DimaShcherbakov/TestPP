import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducers/createReducer';
import editReducer from '../reducers/editReducer';
import tableReducer from '../reducers/tableReducer';
import popupReducer from '../reducers/popupReducer';
import tableSaga  from '../sagas/sagaTable';
import createSaga from '../sagas/sagaCreate';
import editSaga from '../sagas/sagaEdit';
import popupSaga from '../sagas/sagaPopup';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  combineReducers({
    createState: createReducer,
    editState: editReducer,
    tableState: tableReducer,
    popupState: popupReducer,
  }),
  {},
  applyMiddleware(...middleware)
);

sagaMiddleware.run(tableSaga);
sagaMiddleware.run(createSaga);
sagaMiddleware.run(editSaga);
sagaMiddleware.run(popupSaga);

export default store;
