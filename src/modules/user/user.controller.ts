import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserPaginationEntity } from './entities/user.pagination.entity';

@Controller('api/v1/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create user.',
    type: CreateUserDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users.',
    type: UserEntity,
    isArray: true,
  })
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<UserEntity | UserPaginationEntity[]> {
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('activate/:id')
  async active(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.active(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('preference')
  updatePreference(
    @Request() req: any,
    @Body() updatePreference: UpdatePreferenceDto,
  ) {
    return this.userService.updatePreference(req.user.id, updatePreference);
  }
}
