import { User } from 'constants/users';

export const checkUserBody = (userBody: User | null) =>
  userBody && (userBody.id || !userBody?.username || !userBody.hobbys || !userBody.age);
