export interface ITask {
  id: string;
  name: string;
  description: string;
}

export interface ITaskFormValues {
  name: string;
  description: string;
}

export interface IBoardTasks {
  id?: number;
  boardId: number;
  tasks: ITask[];
}
