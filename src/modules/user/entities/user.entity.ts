// import { User } from '@prisma/client';

// export class UserEntity implements User {
export class UserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  preferences: {
    isDark: boolean;
    language: string;
    dashboard: {
      id: string;
      name: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  activetedAt: Date;
}
