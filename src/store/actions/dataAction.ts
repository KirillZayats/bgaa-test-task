import { DataAction, DataActionType } from "../types/types";
import { GET_BASE_URL, POST_BASE_URL } from "../../additionally/constants";
import { ILoadData, ISubject } from "../../additionally/interfaces";

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
      });
  };
};

export const postDataSuccess = (
  isStatusPost: boolean,
  errorMessage: string
): DataAction => {
  return {
    type: DataActionType.POST_DATA,
    message: isStatusPost
      ? "данные получены успешно"
      : `Ошибка: ${errorMessage}`,
  };
};

export const confirmPost = (): DataAction => {
  return {
    type: DataActionType.CONFIRM_POST,
  };
};

export const postData = (data: any[], subjects: ISubject[]) => {
  let newSubjects: ISubject[] = [...changeArraySubject(data, subjects)];

  return async (dispatch: any) => {
    return fetch(POST_BASE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newSubjects),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "данные не были успешно получены. Ресурс недоступен :("
          );
        }
        return response;
      })
      .then((response) => {
        console.log(response.json());
        dispatch(postDataSuccess(true, ""));
      })
      .catch((error) => {
        dispatch(postDataSuccess(false, error.message));
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

const changeArraySubject = (data: any, subjects: ISubject[]): ISubject[] => {
  let listSubjects: ISubject[] = JSON.parse(JSON.stringify(subjects));

  listSubjects.forEach((subject: any) => {
    let itemForm = data[`${subject.uniqueId}`];

    let keys = Object.keys(itemForm);
    keys.forEach((key: string) => {
      let keyParts = key.split("-");
      if (subject[keyParts[0]] !== undefined) {
        subject[keyParts[0]] = itemForm[key];
      } else if (
        keyParts[1] === "2" &&
        subject.podgroups[1] !== undefined &&
        subject.podgroups[1][keyParts[0]] !== undefined
      ) {
        subject.podgroups[1][keyParts[0]] = itemForm[key];
      } else if (
        keyParts.length === 1 &&
        subject.podgroups[0][keyParts[0]] !== undefined
      ) {
        subject.podgroups[0][keyParts[0]] = itemForm[key];
      }
    });
  });

  //как будет выглядеть список после полученных данных с формы
  // console.log(listSubjects);

  return listSubjects;
};
