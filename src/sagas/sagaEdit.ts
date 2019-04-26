import { takeEvery, call, put } from 'redux-saga/effects';
import { Types, Creators } from '../reducers/editReducer';
import { editNote } from '../queries/index';

const { UPDATE_DATA } = Types;

function* handleLoading(action: any): IterableIterator<any> {
  try {
    const payload = action.data;
    const data = yield call(editNote, payload);
    yield put(Creators.success_update());
  } catch (err) {
    yield put(Creators.failure_update());
  };
};

function* watchData(): IterableIterator<any> {
  yield takeEvery(UPDATE_DATA, handleLoading);
};

export default watchData;
