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

// add to order db

const addProductToOrder = async (userId: number, productData: any) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);
  await user.save();

  return user.orders;
};
// get all orders
const getUserOrdersFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user ? user.orders : null;
};

const calculateTotalPrice = async (userId: number): Promise<number> => {
  const user: UserDocument | null = await UserModel.findOne({userId});

  if (!user) {
    throw new Error('User not found');
  }

  const totalPrice: number =
    user.orders?.reduce(
      (acc: number, order: number) => acc + order.price * order.quantity,
      0,
    ) || 0;
  return totalPrice;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteStudentsFromDB,
  updateUserIntoDB,
  getUserOrdersFromDB,
  addProductToOrder,
  calculateTotalPrice,
};
