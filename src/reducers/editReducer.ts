import { AnyAction } from "redux";
import { createReducer, createActions } from "reduxsauce";

interface ITypes {
  SUCCESS_UPDATE: "SUCCESS_UPDATE";
  FAILURE_UPDATE: "FAILURE_UPDATE";
  UPDATE_DATA: "UPDATE_DATA";
}

interface ISuccess extends AnyAction {
  type: ITypes["SUCCESS_UPDATE"];
}

interface ILoad extends AnyAction {
  type: ITypes["UPDATE_DATA"];
  data: {
    title: string;
    body: string;
  };
}

interface IFailure extends AnyAction {
  type: ITypes["FAILURE_UPDATE"];
}

interface IActions {
  success_upload(): ISuccess;
  upload_data(data: { title: string; body: string }): ILoad;
  failure_upload(): IFailure;
}
// <ITypes, IActions>
export const { Types, Creators } = createActions({
  success_update: [],
  update_data: ["data"],
  failure_update: []
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
  [Types.SUCCESS_UPDATE]: success,
  [Types.FAILURE_UPDATE]: failure,
  [Types.UPDATE_DATA]: load
};

const editReducer = createReducer(INITIAL_STATE, HANDLERS);

export default editReducer;
