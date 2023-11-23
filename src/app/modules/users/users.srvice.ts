
import { UserModel } from './users.Model';

const createUserIntoDB = async (userData: any) => {
  const user = await UserModel.create(userData);

  const { password, ...sanitizedUser } = user.toObject();

  return sanitizedUser;
};

const getAllUsersFromDB = async () => {
  const users = await UserModel.find({}, 'username fullName age email address');

  const sanitizedUsers = users.map(user => sanitizeUser(user.toObject()));

  return sanitizedUsers;
};

const sanitizeUser = (userObject: any) => {
  const { password, ...sanitizedUser } = userObject;
  return sanitizedUser;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId }, '-password');

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const sanitizedUser = sanitizeUser(user.toObject());
  return sanitizedUser;
};

const updateUserIntoDB = async (userId: number, updatedUserData: any) => {
  const user = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const sanitizedUser = sanitizeUser(user.toObject());
  return sanitizedUser;
};

const deleteStudentsFromDB = async (userId: number) => {
  const user = await UserModel.findOneAndDelete({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user;
};

// add to order db

const addProductToOrder = async (userId: number, productData: any) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
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

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user ? user.orders : null;
};

const calculateTotalPrice = async (userId: number): Promise<number> => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const totalPrice: number =
    user.orders?.reduce(
      (acc, order) => acc + order.price * order.quantity,
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
