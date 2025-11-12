import User from '#App/users/models/user.model';
import { CreateOptions } from 'sequelize';

interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Создает нового пользователя
 */
export async function create(data: CreateUserData, repOptions?: CreateOptions): Promise<User> {
  const user = await User.create({
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  }, repOptions);

  return user;
}
