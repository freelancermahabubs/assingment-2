import { object, string, number, array, boolean } from 'zod';

// Zod validation schema for the Order
const OrderSchemaValidation = object({
  productName: string({ required_error: 'Product name is required' }),
  price: number({ required_error: 'Price is required' }),
  quantity: number({ required_error: 'Quantity is required' }),
});

// Zod validation schema for the User
const UserSchemaValidation = object({
  userId: number({ required_error: 'User ID is required' }),
  username: string({ required_error: 'Username is required' }),
  password: string({ required_error: 'Password is required' }),
  fullName: object({
    firstName: string({ required_error: 'First name is required' }),
    lastName: string({ required_error: 'Last name is required' }),
  }),
  age: number({ required_error: 'Age is required' }),
  email: string({ required_error: 'Email is required' }),
  isActive: boolean({ required_error: 'isActive is required' }),
  hobbies: array(string()).default([]),
  address: object({
    street: string({ required_error: 'Street is required' }),
    city: string({ required_error: 'City is required' }),
    country: string({ required_error: 'Country is required' }),
  }),
  orders: array(OrderSchemaValidation).default([]),
});

export default UserSchemaValidation