import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';

export const deleteWorkSpaceApi = async (
  id: number
): Promise<ApiResult<boolean>> => {
  const { data } = await apiInstance.delete<Promise<ApiResult<boolean>>>(
    `work-spaces/${id}`
  );

  return data;
};
