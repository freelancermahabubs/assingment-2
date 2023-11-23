/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './users.srvice';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.id;
    const result = await UserServices.updateUserIntoDB(id, userData);
    res.status(200).json({
      succes: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteStudentsFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error.message,
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const productData = req.body;
    const updatedOrders = await UserServices.addProductToOrder(
      userId,
      productData,
    );

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: updatedOrders,
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// get order

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await UserServices.getUserOrdersFromDB(userId);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const totalPrice: number = await UserServices.calculateTotalPrice(userId);

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  getUserOrders,
  addProductToOrder,
  getTotalPrice,
};
