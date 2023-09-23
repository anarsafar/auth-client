/* eslint-disable import/extensions */
/* eslint-disable no-console */
import {
  ChangePasswordResponse,
  ResetPassword,
} from '@/types/resInfoInterface';
import { instance } from '../instance';
import handleError from '@/utils/handleError';

const password = {
  resetPassword: async (data: { email: string }): Promise<ResetPassword> => {
    let result: ResetPassword = {};
    try {
      const response = await instance.post('/request-reset', data);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
  changePassword: async (
    data: {
      currentPassword: string;
      newPassword: string;
    },
    accessToken: string
  ): Promise<ChangePasswordResponse> => {
    let result: ChangePasswordResponse = {};
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const response = await instance.put('/change-password', data, config);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
};

export default password;
