import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Name is required!',
    }),
    password: string({
      required_error: 'Password is required!',
    }).min(8, 'Password is too short - should be 8 chars minimum!'),
    passwordConfirmation: string({
      required_error: 'Confirmation password is required!',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match!',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
