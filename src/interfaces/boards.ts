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

export interface IUpdateBoardBody {
  id: number;
  name: string;
  workSpaceId: number;
}
