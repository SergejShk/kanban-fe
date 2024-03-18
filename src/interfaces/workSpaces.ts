export interface IWorkSpace {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
}

export interface IWorkSpaceFormValues {
  name: string;
}

export interface INewWorkSpaceBody {
  name: string;
}
