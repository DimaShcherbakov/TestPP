import { AnyAction } from 'redux';
import { createReducer, createActions } from 'reduxsauce';

interface ITypes {
  POPUP_DATA_SUCCESS: "POPUP_DATA_SUCCESS";
  POPUP_DATA_FAILURE: "POPUP_DATA_FAILURE";
  POPUP_DATA_LOAD: "POPUP_DATA_LOAD";
};

interface IData{
  _id: string;
  body: string;
  title: string;
  updatedAt: string;
  createdAt: string;
};

interface ISuccess extends AnyAction {
  type: ITypes["POPUP_DATA_SUCCESS"];
  data: IData;
};

interface ILoad extends AnyAction {
  type: ITypes["POPUP_DATA_LOAD"];
  id: string;
};

interface IFailure extends AnyAction {
  type: ITypes["POPUP_DATA_FAILURE"];
};

interface IActions {
  popup_data_success(data: IData): ISuccess;
  popup_data_load(id: string): ILoad;
  popup_data_failure(): IFailure;
};

export const { Types, Creators } = createActions<ITypes, IActions>({
  popup_data_success: ["data"],
  popup_data_load: ["id"],
  popup_data_failure: []
});

interface IState {
  loading: boolean;
  failure: boolean;
  success: boolean;
  data: IData;
};

const INITIAL_STATE: IState = {
  loading: false,
  failure: false,
  success: false,
  data: {
    _id: '',
    body: '',
    title: '',
    updatedAt: '',
    createdAt: '',
  },
};

const success = (state = INITIAL_STATE, action: ISuccess) => {
  const { _id, updatedAt, createdAt, body, title } = action.data
  return {
    ...state,
    loading: false,
    success: true,
    data: { 
      _id,
      body,
      title,
      updatedAt,
      createdAt,
    }
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
  [Types.POPUP_DATA_SUCCESS]: success,
  [Types.POPUP_DATA_FAILURE]: failure,
  [Types.POPUP_DATA_LOAD]: load
};

const popupReducer = createReducer(INITIAL_STATE, HANDLERS);

export default popupReducer;
