import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { deleteWorkSpaceApi } from '../../../services/work-spaces/deleteWorkSpace';

import { ApiError, ApiResult } from '../../../interfaces/api';

export const useDeleteWorkSpace = () => {
  return useMutation<ApiResult<boolean>, AxiosError<ApiError>, number>({
    mutationFn: async id => {
      const data = await deleteWorkSpaceApi(id);

      return data;
    },
  });
};
