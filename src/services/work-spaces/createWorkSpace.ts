import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { INewWorkSpaceBody, IWorkSpace } from '../../interfaces/workSpaces';

export const createWorkSpaceApi = async (
  body: INewWorkSpaceBody
): Promise<ApiResult<IWorkSpace>> => {
  const { data } = await apiInstance.post<Promise<ApiResult<IWorkSpace>>>(
    `work-spaces`,
    body
  );

  return data;
};
