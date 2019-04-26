import { takeEvery, call, put } from 'redux-saga/effects';
import { Types, Creators } from '../reducers/createReducer';
import { addNote } from '../queries/index';

const { UPLOAD_DATA } = Types;

function* handleLoading(action: any): IterableIterator<any> {
  try {
    const payload = action.data;
    const data = yield call(addNote, payload);
    yield put(Creators.success_upload());
  } catch (err) {
    yield put(Creators.failure_upload());
  }
}

function* watchData(): IterableIterator<any> {
  yield takeEvery(UPLOAD_DATA, handleLoading);
}

export default watchData;
