import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { UniqueEmailValidator } from './validation/uniqueEmail.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, UniqueEmailValidator],
})
export class UserModule {}
