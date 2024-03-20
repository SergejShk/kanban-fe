export interface ITask {
  id: number;
  index: number;
  name: string;
  description: string;
  createdAt: Date;
  boardId: number;
}

export interface ITaskFormValues {
  name: string;
  description: string;
}
