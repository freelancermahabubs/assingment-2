/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './users.srvice';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUser(userData);
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
    const result = await UserServices.getAllUsers();
    res.status(200).json({
      status: true,
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
// const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const result = await userServices.getSingleUser(id);
//     res.status(200).json({
//       status: 'success',
//       message: 'Single User fetched successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: 'fail',
//       message: error.message || 'Something went wrong',
//     });
//   }
// };
// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userData = req.body;
//     const id = req.params.id;
//     const result = await userServices.updateUser(id, userData);
//     res.status(200).json({
//       status: 'success',
//       message: 'User updated successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: 'fail',
//       message: error.message || 'Something went wrong',
//     });
//   }
// };
// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     await userServices.deleteUser(id);
//     res.status(200).json({
//       status: 'success',
//       message: 'User deleted successfully',
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: 'fail',
//       message: error.message || 'Something went wrong',
//     });
//   }
// };

export const UserController = {
  createUser,
  getAllUsers,
};
