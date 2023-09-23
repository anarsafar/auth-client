/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { AxiosError } from 'axios';
import { GetUserResInfo } from '@/types/resInfoInterface';

const handleError = (error: unknown, result: GetUserResInfo) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      result = error.response.data;
    } else {
      result = error;
    }
  } else {
    console.error('Axios error:', error);
  }
  return result;
};

export default handleError;
