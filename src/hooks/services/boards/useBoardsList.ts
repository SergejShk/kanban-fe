import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { getBoardsApi } from '../../../services/boards/getBoards';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IBoard } from '../../../interfaces/boards';

export const useBoardsList = (workSpaceId: number) => {
  return useQuery<ApiResult<IBoard[]> | null, AxiosError<ApiError>>({
    queryKey: ['boards-list', workSpaceId],
    queryFn: async () => {
      return await getBoardsApi(workSpaceId);
    },
  });
};
