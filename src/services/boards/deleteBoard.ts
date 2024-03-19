import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';

export const deleteBoardApi = async (
  id: number
): Promise<ApiResult<boolean>> => {
  const { data } = await apiInstance.delete<Promise<ApiResult<boolean>>>(
    `boards/${id}`
  );

  return data;
};
