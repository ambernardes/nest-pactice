import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';
import { Model } from 'mongoose';

describe('User Model', () => {
  let userModel: Model<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot('mongodb://localhost:27017/test')],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({}).exec();
  });

  afterAll(async () => {
    await userModel.deleteMany({}).exec();
    await userModel.db.close();
  });

  it('should be defined', () => {
    const user = new userModel();
    expect(user).toBeDefined();
  });

  it('should have all properties defined', async () => {
    const user = new userModel({
      id: 1,
      email: 'user@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'https://example.com/avatar.png',
    });
    await user.save();

    const fetchedUser = await userModel
      .findOne({ email: 'user@example.com' })
      .exec();
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser.id).toBe(1);
    expect(fetchedUser.email).toBe('user@example.com');
    expect(fetchedUser.first_name).toBe('John');
    expect(fetchedUser.last_name).toBe('Doe');
    expect(fetchedUser.avatar).toBe('https://example.com/avatar.png');
  });
});
