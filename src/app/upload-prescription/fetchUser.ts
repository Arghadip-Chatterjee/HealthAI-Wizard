import prisma from '../../../prisma/lib/prisma';
import { User } from './types';

export const fetchUser = async (userId: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};
