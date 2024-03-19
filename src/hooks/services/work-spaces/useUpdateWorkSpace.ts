import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { updateWorkSpaceApi } from '../../../services/work-spaces/updateWorkSpace';

import { ApiError, ApiResult } from '../../../interfaces/api';
import {
  IUpdateWorkSpaceBody,
  IWorkSpace,
} from '../../../interfaces/workSpaces';

export const useUpdateWorkSpace = () => {
  return useMutation<
    ApiResult<IWorkSpace>,
    AxiosError<ApiError>,
    IUpdateWorkSpaceBody
  >({
    mutationFn: async body => {
      const data = await updateWorkSpaceApi(body);

      return data;
    },
  });
};
