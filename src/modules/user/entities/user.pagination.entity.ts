import { UserEntity } from './user.entity';

// export class UserEntity implements User {
export class UserPaginationEntity {
  records: UserEntity[];
  total: number;
  pages: number;
}
