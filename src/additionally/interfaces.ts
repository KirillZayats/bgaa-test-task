export interface ITeacher {
  id: number;
  name: string;
}

export interface IClass {
  id: number;
  names: string[];
}

export interface IGroup {
  countStudents: string;
  laboratoryTeacher: string;
  lectureTeacher: string;
  practiceTeacher: string;
  seminarTeacher: string;
  examTeacher: string;
  offsetTeacher: string;
}

export interface ISubject {
  subjectName: string;
  course: string;
  semestr: string;
  studentsNumber: string;
  groupName: string;
  lecturesHours: string;
  laboratoryHours: string;
  practicHours: string;
  seminarHours: string;
  exam: boolean;
  offset: boolean;
  additionalInfo: string;
  countPodgroups: string;
  uniqueId: string;
  podgroups: IGroup[];
}

export interface ILoadData {
  data: ISubject[];
  teachers: ITeacher[];
}

export interface IPropsSubject {
  form: any;
  subject: ISubject;
}

export interface IPropsSelector {
  isStatus: boolean;
  id: string;
  className: string;
  nameNewTeacher?: string;
  setNameNewTeacher?: (value: string) => void;
  nameSelector: string;
  form: any;
}

export interface IPropsModal {
  active: boolean;
  setActive: (value: boolean) => void;
  message: string;
}
