import { ISubject, ITeacher } from "../../additionally/interfaces";
import { DataAction, DataActionType } from "../types/types";

const initialState = {
  isLoading: false,
  subjects: [] as ISubject[],
  teachers: [] as ITeacher[]
};

export const dataReducer = (state = initialState, action: DataAction) => {

  switch (action.type) {
    case DataActionType.GET_DATA:
      return {
        isLoading: action.isLoading,
        subjects: [...action.data.data],
        teachers: [{id: 4, name: 'Вакансия'}, ...action.data.teachers],
      };
    default:
      return state;
  }
};