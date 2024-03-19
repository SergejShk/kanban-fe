import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { createBoardApi } from '../../../services/boards/createBoard';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IBoard, INewBoardBody } from '../../../interfaces/boards';

export const useCreateBoard = () => {
  return useMutation<ApiResult<IBoard>, AxiosError<ApiError>, INewBoardBody>({
    mutationFn: async body => {
      const data = await createBoardApi(body);

      return data;
    },
  });
};
