import { AnyAction } from "redux";
import { createReducer, createActions } from "reduxsauce";

interface ITypes {
  SUCCESS_UPLOAD: "SUCCESS_UPLOAD";
  FAILURE_UPLOAD: "FAILURE_UPLOAD";
  UPLOAD_DATA: "UPLOAD_DATA";
}

interface ISuccess extends AnyAction {
  type: ITypes["SUCCESS_UPLOAD"];
}

interface ILoad extends AnyAction {
  type: ITypes["UPLOAD_DATA"];
  data: {
    title: string;
    body: string;
  };
}

interface IFailure extends AnyAction {
  type: ITypes["FAILURE_UPLOAD"];
}

interface IActions {
  success_upload(): ISuccess;
  upload_data(data: { title: string; body: string }): ILoad;
  failure_upload(): IFailure;
}
// <ITypes, IActions>
export const { Types, Creators } = createActions({
  success_upload: [],
  upload_data: ["data"],
  failure_upload: []
});

interface IState {
  loading: boolean;
  failure: boolean;
  success: boolean;
}

const INITIAL_STATE: IState = {
  loading: false,
  failure: false,
  success: false
};

const success = (state = INITIAL_STATE, action: ISuccess) => {
  return {
    ...state,
    loading: false,
    success: true
  };
};

const load = (state = INITIAL_STATE, action: ILoad) => {
  return {
    ...state,
    loading: true
  };
};

const failure = (state = INITIAL_STATE, action: IFailure) => {
  return {
    ...state,
    loading: false,
    failure: true
  };
};

export const HANDLERS: any = {
  [Types.SUCCESS_UPLOAD]: success,
  [Types.FAILURE_UPLOAD]: failure,
  [Types.UPLOAD_DATA]: load
};

const createNoteReducer = createReducer(INITIAL_STATE, HANDLERS);

export default createNoteReducer;
