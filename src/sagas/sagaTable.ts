import { takeEvery, call, put } from "redux-saga/effects";
import { Types, Creators } from "../reducers/tableReducer";
import { getDataToTable } from "../queries/index";

const { LOAD } = Types;

function* handleLoading(action: any): IterableIterator<any> {
  try {
    // const payload = action.data;
    // const data = yield call(getDataToTable);
    // yield put(Creators.success(data.article));
  } catch (err) {
    yield put(Creators.failure());
  }
}

function* watchData(): IterableIterator<any> {
  yield takeEvery(LOAD, handleLoading);
}

export default watchData;
