import { ILoadData } from "../../additionally/interfaces";

export enum DataActionType {
    GET_DATA = "GET_DATA",
    POST_DATA = "POST_DATA",
  }

interface IGetDataAction {
    type: DataActionType.GET_DATA;
    isLoading: boolean;
    data: ILoadData;
}

interface IPostDataAction {
    type: DataActionType.POST_DATA;
    // products: ILoadData[];
}


  export type DataAction = IGetDataAction | IPostDataAction;