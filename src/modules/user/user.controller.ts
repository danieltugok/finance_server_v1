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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users.',
    type: UserEntity,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('activate/:id')
  active(@Param('id') id: string) {
    return this.userService.active(id);
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
