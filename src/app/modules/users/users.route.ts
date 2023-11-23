import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// will call controller func
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId/orders', UserController.getUserOrders);

export const UsersRoutes = router;
