import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user';

@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get(): Promise<any> {
    // Retrieve data from external API and return user in JSON representation.
    return this.usersService.get();
  }

  @Get(':userId')
  async getById(@Param('userId') userId: string): Promise<any> {
    // Retrieve data from external API and return user in JSON representation.
    return this.usersService.getById(userId);
  }

  @Post()
  async createUser(@Body() user: User): Promise<any> {
    // Handle request to create user in the database.
    // Send dummy email and rabbit event.

    return this.usersService.createUser(user);
  }
}
