import { IGroup, ISubject, ITeacher } from "../../additionally/interfaces";
import { DataAction, DataActionType } from "../types/types";

const initialState = {
  isLoading: false,
  subjects: [] as ISubject[],
  teachers: [] as ITeacher[],
  isPostData: false,
  messagePost: "",
};

const podgroup: IGroup = {
  countStudents: "0",
  laboratoryTeacher: "",
  lectureTeacher: "",
  practiceTeacher: "",
  seminarTeacher: "",
  examTeacher: "",
  offsetTeacher: "",
};

const divideCountStudents = (count: number): string[] => {
  let firstPart: number = +(count / 2).toFixed(0);
  return [firstPart + "", count - firstPart + ""];
};

const changeGroups = (
  id: string,
  subjects: ISubject[],
  type: string
): ISubject[] => {
  subjects.forEach((element: ISubject) => {
    if (element.uniqueId === id) {
      switch (type) {
        case DataActionType.SET_GROUPS:
          element.countPodgroups = "2";
          let arrayCountStudents: string[] = divideCountStudents(
            +element.studentsNumber
          );
          element.podgroups[0].countStudents = arrayCountStudents[0];
          podgroup.countStudents = arrayCountStudents[1];
          element.podgroups.push(podgroup);
          break;
        case DataActionType.DELETE_GROUPS:
          element.countPodgroups = "1";
          element.podgroups[0].countStudents = element.studentsNumber;
          element.podgroups.pop();
          break;
      }
    }
  });

  return subjects;
};

export const dataReducer = (state = initialState, action: DataAction) => {
  switch (action.type) {
    case DataActionType.GET_DATA:
      return {
        isLoading: action.isLoading,
        subjects: [...action.data.data],
        teachers: [{ id: "", name: "Вакансия" }, ...action.data.teachers],
        isPostData: state.isPostData,
        messagePost: state.messagePost,
      };
    case DataActionType.SET_GROUPS:
      changeGroups(action.idSubjects, state.subjects, action.type);
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
        isPostData: state.isPostData,
        messagePost: state.messagePost,
      };
    case DataActionType.DELETE_GROUPS:
      changeGroups(action.idSubjects, state.subjects, action.type);
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
        isPostData: state.isPostData,
        messagePost: state.messagePost,
      };
    case DataActionType.POST_DATA:
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
        isPostData: true,
        messagePost: action.message,
      };
    case DataActionType.CONFIRM_POST:
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
        isPostData: false,
        messagePost: "",
      };
    default:
      return state;
  }
};
