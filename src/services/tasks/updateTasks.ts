import { apiInstance } from '../apiInstance';

import { ApiResult } from '../../interfaces/api';
import { IBoardTasks } from '../../interfaces/tasks';

export const updateTasksApi = async (body: IBoardTasks) => {
  const { data } = await apiInstance.put<Promise<ApiResult<IBoardTasks>>>(
    `tasks`,
    body
  );

  return data;
};
