import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './queue/rabbitmq.service';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/payever')],
  controllers: [AppController],
  providers: [AppService, RabbitMQService],
})
export class AppModule {}
