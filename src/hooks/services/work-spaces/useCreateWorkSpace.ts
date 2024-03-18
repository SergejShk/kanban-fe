import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { createWorkSpaceApi } from '../../../services/work-spaces/createWorkSpace';

import { ApiError, ApiResult } from '../../../interfaces/api';
import { INewWorkSpaceBody, IWorkSpace } from '../../../interfaces/workSpaces';

export const useCreateWorkSpace = () => {
  return useMutation<
    ApiResult<IWorkSpace>,
    AxiosError<ApiError>,
    INewWorkSpaceBody
  >({
    mutationFn: async body => {
      const data = await createWorkSpaceApi(body);

      return data;
    },
  });
};
