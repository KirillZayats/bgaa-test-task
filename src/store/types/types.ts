import { ILoadData } from "../../additionally/interfaces";

export enum DataActionType {
  GET_DATA = "GET_DATA",
  POST_DATA = "POST_DATA",
  SET_GROUPS = "SET_GROUPS",
  DELETE_GROUPS = "DELETE_GROUPS",
  CHANGE_NUMBER_STUDENTS = "CHANGE_NUMBER_STUDENTS",
  CONFIRM_POST = "CONFIRM_POST",
}

interface IGetDataAction {
  type: DataActionType.GET_DATA;
  isLoading: boolean;
  data: ILoadData;
}

interface ISetGroupsAction {
  type: DataActionType.SET_GROUPS;
  idSubjects: string;
}

interface IDeleteGroupsAction {
  type: DataActionType.DELETE_GROUPS;
  idSubjects: string;
}

interface IPostDataAction {
  type: DataActionType.POST_DATA;
  message: string
}

interface IConfirmPostAction {
  type: DataActionType.CONFIRM_POST
}

export type DataAction =
  | IGetDataAction
  | IPostDataAction
  | ISetGroupsAction
  | IDeleteGroupsAction
  | IConfirmPostAction;
