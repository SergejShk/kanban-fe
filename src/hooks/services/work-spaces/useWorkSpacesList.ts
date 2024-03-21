import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { getWorkSpaceListApi } from '../../../services/work-spaces/getList';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { IWorkSpace } from '../../../interfaces/workSpaces';

export const useWorkSpacesList = (query: string) => {
  return useQuery<ApiResult<IWorkSpace[]> | null, AxiosError<ApiError>>({
    queryKey: ['workspace-list', query],
    queryFn: async () => {
      return await getWorkSpaceListApi(query);
    },
  });
};
