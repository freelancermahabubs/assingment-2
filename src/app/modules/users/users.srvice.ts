import { User } from './users.Interface';
import { UserModel } from './users.Model';

const createUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

const updateUserIntoDB = async (id: string, userData: User) => {
  const result = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentsFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

const getUserOrdersFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user ? user.orders : null;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteStudentsFromDB,
  updateUserIntoDB,
  getUserOrdersFromDB,
};
