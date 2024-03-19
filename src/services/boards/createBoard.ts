import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IBoard, INewBoardBody } from '../../interfaces/boards';

export const createBoardApi = async (
  body: INewBoardBody
): Promise<ApiResult<IBoard>> => {
  const { data } = await apiInstance.post<Promise<ApiResult<IBoard>>>(
    `boards`,
    body
  );

  return data;
};
