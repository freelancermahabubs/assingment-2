import { User } from './users.Interface';
import { UserModel } from './users.Model';

const createUser = async (userData: User): Promise<User> => {
  const result = await UserModel.create(userData);
  return result;
};

export const UserServices = {
  createUser,
};
