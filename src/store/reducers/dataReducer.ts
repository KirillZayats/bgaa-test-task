import { IGroup, ISubject, ITeacher } from "../../additionally/interfaces";
import { DataAction, DataActionType } from "../types/types";

const initialState = {
  isLoading: false,
  subjects: [] as ISubject[],
  teachers: [] as ITeacher[],
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

// const changeNumberStudents = (id: string, valueInput: number, isStatusGroup: boolean, subjects: ISubject[]): ISubject[] => {
//   let firstValue: number = 0;
//   let secondValue: number = 0;
//   console.log("test");
  
//   subjects.forEach((element: ISubject) => {
//     if (element.uniqueId === id) {
//       const allStudents = +element.studentsNumber;

//       if(valueInput >= allStudents) {
//         firstValue = allStudents - 1;
//         secondValue = 1;
//       } 
//         else if(valueInput < 0 || valueInput === 0) {
//           firstValue = 1;
//           secondValue = allStudents - 1;
//         }
//       else {
//         firstValue = valueInput;
//         secondValue = allStudents - firstValue;
//       }
//       element.podgroups[0].countStudents = isStatusGroup ? `${firstValue}` : `${secondValue}`;
//       element.podgroups[1].countStudents = isStatusGroup ? `${secondValue}` : `${firstValue}`;
//     }
//   }
//   )
//   return subjects;
// }

export const dataReducer = (state = initialState, action: DataAction) => {
  switch (action.type) {
    case DataActionType.GET_DATA:
      return {
        isLoading: action.isLoading,
        subjects: [...action.data.data],
        teachers: [{ id: -1, name: "Вакансия" }, ...action.data.teachers],
      };
    case DataActionType.SET_GROUPS:
      changeGroups(action.idSubjects, state.subjects, action.type);
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
      };
    case DataActionType.DELETE_GROUPS:
      changeGroups(action.idSubjects, state.subjects, action.type);
      return {
        isLoading: state.isLoading,
        subjects: state.subjects,
        teachers: state.teachers,
      };
    // case DataActionType.CHANGE_NUMBER_STUDENTS:
    //   changeNumberStudents(action.id, action.inputValue, action.isStatusGroup, state.subjects)
    //   return {
    //     isLoading: state.isLoading,
    //     subjects: state.subjects,
    //     teachers: state.teachers,
    //   };
    default:
      return state;
  }
};
