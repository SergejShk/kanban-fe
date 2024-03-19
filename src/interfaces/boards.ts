export interface IBoard {
  id: number;
  name: string;
  createdAt: Date;
  workSpaceId: number;
}

export interface INewBoardBody {
  name: string;
  workSpaceId: number;
}

export interface IBoardFormValues {
  name: string;
}
