import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IBoardTasks, ITask } from '../../interfaces/tasks';

export const createTaskApi = async (
  body: IBoardTasks
): Promise<ApiResult<ITask>> => {
  const { data } = await apiInstance.post<Promise<ApiResult<ITask>>>(
    `tasks`,
    body
  );

  return data;
};
