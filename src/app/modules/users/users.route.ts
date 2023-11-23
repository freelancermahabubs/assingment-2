import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// will call controller func
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId', UserController.updateUser);
router.put('/:userId/orders', UserController.addProductToOrder);
router.get('/:userId/orders', UserController.getUserOrders);
router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const UsersRoutes = router;
