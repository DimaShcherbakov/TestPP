import { AnyAction } from "redux";
import { createReducer, createActions } from "reduxsauce";

interface ITypes {
  SUCCESS_UPDATE: "SUCCESS_UPDATE";
  FAILURE_UPDATE: "FAILURE_UPDATE";
  UPDATE_DATA: "UPDATE_DATA";
  CLEAR_DATA: "CLEAR_DATA";
};

interface ISuccess extends AnyAction {
  type: ITypes["SUCCESS_UPDATE"];
};

interface ILoad extends AnyAction {
  type: ITypes["UPDATE_DATA"];
  data: {
    title: string;
    body: string;
  };
};

interface IFailure extends AnyAction {
  type: ITypes["FAILURE_UPDATE"];
};

interface IClear extends AnyAction {
  type: ITypes["CLEAR_DATA"];
};

interface IActions {
  success_update(): ISuccess;
  update_data(data: { title: string; body: string }): ILoad;
  failure_update(): IFailure;
  clear_data(): IClear;
};

export const { Types, Creators } = createActions<ITypes, IActions>({
  success_update: [],
  update_data: ["data"],
  failure_update: [],
  clear_data: [],
});

interface IState {
  loading: boolean;
  failure: boolean;
  success: boolean;
};

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

const clear = (state = INITIAL_STATE, action: IFailure) => {
  return {
    ...INITIAL_STATE,
  };
};

export const HANDLERS: any = {
  [Types.SUCCESS_UPDATE]: success,
  [Types.FAILURE_UPDATE]: failure,
  [Types.UPDATE_DATA]: load,
  [Types.CLEAR_DATA]: clear,
};

const editReducer = createReducer(INITIAL_STATE, HANDLERS);

export default editReducer;
