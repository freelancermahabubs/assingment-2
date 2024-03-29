/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { UserServices } from './users.srvice';
import UserSchemaValidation from './users.Validation';
import { ZodError } from 'zod';
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = UserSchemaValidation.parse(userData);

    const newUser = await UserServices.createUserIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
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
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.getSingleUserFromDB(Number(userId));
    res.json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData: any = req.body;
    const updatedData = UserSchemaValidation.parse(updatedUserData);
    const updatedUser = await UserServices.updateUserIntoDB(
      Number(userId),
      updatedData,
    );
    res.json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteStudentsFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// add Order
const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const productData = req.body;

    await UserServices.addProductToOrder(Number(userId), productData);

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

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
    const orders = await UserServices.getUserOrdersFromDB(Number(userId));

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
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const totalPrice: number = await UserServices.calculateTotalPrice(Number(userId));

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

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
