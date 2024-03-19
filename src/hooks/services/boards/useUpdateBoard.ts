import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { updateBoardApi } from '../../../services/boards/updateBoard';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IBoard, IUpdateBoardBody } from '../../../interfaces/boards';

export const useUpdateBoard = () => {
  return useMutation<ApiResult<IBoard>, AxiosError<ApiError>, IUpdateBoardBody>(
    {
      mutationFn: async body => {
        const data = await updateBoardApi(body);

        return data;
      },
    }
  );
};
