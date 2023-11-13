import { DataAction, DataActionType } from "../types/types";
import { GET_BASE_URL } from "../../additionally/constants";
import { ILoadData } from "../../additionally/interfaces";

const getDataSuccess = (data: ILoadData): DataAction => {
  return {
    type: DataActionType.GET_DATA,
    isLoading: true,
    data: data,
  };
};

export const getData = () => {
  return async (dispatch: any) => {
    return fetch(GET_BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(getDataSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        // dispatch(errorData('Error - No connection to server'))
      });
  };
};

export const setGroups = (id: string): DataAction => {
  return {
    type: DataActionType.SET_GROUPS,
    idSubjects: id,
  };
};

export const deleteGroups = (id: string): DataAction => {
  return {
    type: DataActionType.DELETE_GROUPS,
    idSubjects: id,
  };
};
