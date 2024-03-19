import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IBoard } from '../../interfaces/boards';

export const getBoardsApi = async (
  workSpaceId: number
): Promise<ApiResult<IBoard[]>> => {
  const { data } = await apiInstance.get<Promise<ApiResult<IBoard[]>>>(
    `boards/${workSpaceId}`
  );

  return data;
};
