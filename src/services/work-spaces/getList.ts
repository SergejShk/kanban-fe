import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IWorkSpace } from '../../interfaces/workSpaces';

export const getWorkSpaceListApi = async (
  query: string
): Promise<ApiResult<IWorkSpace[]>> => {
  const { data } = await apiInstance.get<Promise<ApiResult<IWorkSpace[]>>>(
    `work-spaces?q=${query}`
  );

  return data;
};
