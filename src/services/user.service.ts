import { DocumentDefinition, FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import { Response } from 'express';

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >,
  res: Response
) {
  try {
    const user = await findUser({ email: input.email });

    if (!user) {
      const user = await UserModel.create(input);

      return omit(user.toJSON(), 'password');
    } else {
      res.status(409);
      res.send('User with this Email already exists!');
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword(email: string, password: string) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function getUsers() {
  const user = await UserModel.find();

  if (!user) return false;

  return omit(user, 'password');
}

export async function getUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {
  const user = await findUser({ email: input.email });

  if (!user) return false;

  return omit(user, 'password');
}

export async function deleteUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {}
