
import { User } from './users.Interface';
import { UserModel } from './users.Model';

const createUserIntoDB = async (userData: any) => {
try {
    const user: UserDocument = await UserModel.create(userData);

    // Exclude sensitive information (e.g., password) from the user object
    const sanitizedUser = sanitizeUser(user.toObject());

    return sanitizedUser;
  } catch (error) {
    throw error;
  }
};

const sanitizeUser = (userObject: any): any => {
  // Remove sensitive information (e.g., password) from the user object
  const { password, ...sanitizedUser } = userObject;
  return sanitizedUser;
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
