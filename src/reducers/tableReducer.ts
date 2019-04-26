import { AnyAction } from 'redux';
import { createReducer, createActions } from 'reduxsauce';

interface ITypes {
  SUCCESS: "SUCCESS";
  FAILURE: "FAILURE";
  LOAD: "LOAD";
};

interface ISuccess extends AnyAction {
  type: ITypes["SUCCESS"];
  data: {
    _id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

interface ILoad extends AnyAction {
  type: ITypes["LOAD"];
  page: number | undefined;
  limit: number | undefined;
};

interface IFailure extends AnyAction {
  type: ITypes["FAILURE"];
};

interface IObj {
  page: number | undefined;
  limit: number | undefined;
};

interface IActions {
  success(
    data: {
      _id: number;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    }[],
  ): ISuccess;
  load(obj: IObj): ILoad;
  failure(): IFailure;
}

export const { Types, Creators } = createActions<ITypes, IActions>({
  success: ["data"],
  load: ["obj"],
  failure: []
});

interface IState {
  loading: boolean;
  failure: boolean;
  dataArr: {
    _id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
  }[];
  countItems: number;
};

const INITIAL_STATE: IState = {
  loading: false,
  failure: false,
  dataArr: [],
  countItems: 0
};

const success = (state = INITIAL_STATE, action: ISuccess) => {
  return {
    ...state,
    loading: false,
    dataArr: action.data,
    countItems: action.countItems
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
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.LOAD]: load
};

const tableReducer = createReducer(INITIAL_STATE, HANDLERS);

export default tableReducer;
