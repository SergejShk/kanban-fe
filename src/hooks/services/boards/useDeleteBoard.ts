import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { deleteBoardApi } from '../../../services/boards/deleteBoard';

import { ApiError, ApiResult } from '../../../interfaces/api';

export const useDeleteBoard = () => {
  return useMutation<ApiResult<boolean>, AxiosError<ApiError>, number>({
    mutationFn: async id => {
      const data = await deleteBoardApi(id);

      return data;
    },
  });
};
