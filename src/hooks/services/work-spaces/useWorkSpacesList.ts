import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { getWorkSpaceListApi } from '../../../services/work-spaces/getList';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IWorkSpace } from '../../../interfaces/workSpaces';

export const useWorkSpacesList = () => {
  return useQuery<ApiResult<IWorkSpace[]> | null, AxiosError<ApiError>>({
    queryKey: ['workspace-list'],
    queryFn: async () => {
      return await getWorkSpaceListApi();
    },
  });
};
