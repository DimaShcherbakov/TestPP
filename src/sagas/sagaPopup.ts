import { takeEvery, call, put } from "redux-saga/effects";
import { Types, Creators } from "../reducers/popupReducer";
import { getNote } from "../queries/index";

const { POPUP_DATA_LOAD } = Types;

function* handleLoading(action: any): IterableIterator<any> {
  try {
    const { id } = action;
    const data = yield call(getNote, id);
    yield put(Creators.popup_data_success(data));
  } catch (err) {
    yield put(Creators.popup_data_failure());
  }
}

function* watchData(): IterableIterator<any> {
  yield takeEvery(POPUP_DATA_LOAD, handleLoading);
}

export default watchData;