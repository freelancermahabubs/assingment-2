import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UsersRoutes } from './app/modules/users/users.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
// application Routes
app.use('/api', UsersRoutes);
const getAController = (req: Request, res: Response) => {
  res.send('Hello Server!');
};
app.get('/', getAController);

export default app;
