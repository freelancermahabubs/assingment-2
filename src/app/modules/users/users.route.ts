import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// will call controller func
router.post('/users', UserController.createUser);

export const UsersRoutes = router;
