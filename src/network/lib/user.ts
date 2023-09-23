/* eslint-disable import/extensions */
import { GetUserResInfo, UpdateUserResponse } from '@/types/resInfoInterface';
import { instance } from '../instance';
import handleError from '@/utils/handleError';
import { UpdateUser } from '@/types/userInterface';

const user = {
  getUser: async (accessToken: string): Promise<GetUserResInfo | null> => {
    let result: GetUserResInfo = {};

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const response = await instance.get('/profile', config);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }

    return result;
  },
  updateUser: async (
    accessToken: string,
    data: UpdateUser
  ): Promise<UpdateUserResponse> => {
    let result: UpdateUserResponse = {};

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('bio', data.bio);
      formData.append('phone', data.phone);
      formData.append('image', data.image);

      const response = await instance.put('/profile', formData, config);
      result = response.data;
    } catch (error) {
      result = handleError(error, result);
    }

    return result;
  },
};

export default user;
