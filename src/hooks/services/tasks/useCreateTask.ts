import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { createTaskApi } from '../../../services/tasks/createTask';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IBoardTasks, ITask } from '../../../interfaces/tasks';

export const useCreateTask = () => {
  return useMutation<ApiResult<ITask>, AxiosError<ApiError>, IBoardTasks>({
    mutationFn: async body => {
      const data = await createTaskApi(body);

      return data;
    },
  });
};
