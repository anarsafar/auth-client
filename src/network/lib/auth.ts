/* eslint-disable import/extensions */
/* eslint-disable no-console */
import FormTypes from '@/types/formInterface';
import {
  SignUpResInfo,
  LogInResInfo,
  LogOut,
  RefreshResponse,
} from '@/types/resInfoInterface';
import { instance } from '../instance';
import handleError from '@/utils/handleError';

const authUser = {
  signUp: async (data: FormTypes): Promise<SignUpResInfo> => {
    let result: SignUpResInfo = {};
    try {
      const response = await instance.post('auth/signup', data);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
  logIn: async (data: FormTypes): Promise<LogInResInfo> => {
    let result: LogInResInfo = {};
    try {
      const response = await instance.post('auth/login', data);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
  logOut: async (accessToken: string): Promise<LogOut> => {
    let result: LogOut = {};
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const response = await instance.post('auth/logout', null, config);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
  getNewAccessToken: async (accessToken: string): Promise<RefreshResponse> => {
    let result: RefreshResponse = {};
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const response = await instance.post('/refresh-token', null, config);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }
    return result;
  },
};

export default authUser;
