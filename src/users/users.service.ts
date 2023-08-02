import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async get(): Promise<AxiosResponse<any>> {
    const response = await this.httpService
      .get(`https://reqres.in/api/users`)
      .toPromise();
    return response.data;
  }

  async getById(userId: string): Promise<AxiosResponse<any>> {
    const response = await this.httpService
      .get(`https://reqres.in/api/users/${userId}`)
      .toPromise();
    return response.data;
  }

  async createUser(user: User): Promise<any> {
    const createdUser = new this.userModel(user);

    return createdUser.save();
    return { message: 'User created and notifications sent.' };
  }
}
