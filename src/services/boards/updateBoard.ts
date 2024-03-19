import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IBoard, IUpdateBoardBody } from '../../interfaces/boards';

export const updateBoardApi = async (
  body: IUpdateBoardBody
): Promise<ApiResult<IBoard>> => {
  const { id, ...rest } = body;

  const { data } = await apiInstance.put<Promise<ApiResult<IBoard>>>(
    `boards/${id}`,
    rest
  );

  return data;
};
