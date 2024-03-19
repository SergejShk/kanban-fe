import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IUpdateWorkSpaceBody, IWorkSpace } from '../../interfaces/workSpaces';

export const updateWorkSpaceApi = async (
  body: IUpdateWorkSpaceBody
): Promise<ApiResult<IWorkSpace>> => {
  const { id, name } = body;

  const { data } = await apiInstance.put<Promise<ApiResult<IWorkSpace>>>(
    `work-spaces/${id}`,
    { name }
  );

  return data;
};
