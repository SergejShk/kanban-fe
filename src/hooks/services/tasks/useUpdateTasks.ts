import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { updateTasksApi } from '../../../services/tasks/updateTasks';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IBoardTasks } from '../../../interfaces/tasks';

export const useUpdateTasks = () => {
  return useMutation<ApiResult<IBoardTasks>, AxiosError<ApiError>, IBoardTasks>(
    {
      mutationFn: async body => {
        const data = await updateTasksApi(body);

        return data;
      },
    }
  );
};
