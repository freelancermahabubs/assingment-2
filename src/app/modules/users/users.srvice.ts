import { User } from './users.Interface';
import { UserModel } from './users.Model';

const createUser = async (userData: User): Promise<User> => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsers = async (): Promise<User[]> => {
    const result = await UserModel.find()
    return result
  }
export const UserServices = {
  createUser,
  getAllUsers
};
