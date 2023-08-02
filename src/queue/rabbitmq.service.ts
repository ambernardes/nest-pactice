import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private channel: amqp.Channel;

  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ connection URL
      this.channel = await connection.createChannel();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error.message);
    }
  }

  async publishEvent(
    eventData: any,
    exchange: string,
    routingKey: string,
  ): Promise<void> {
    try {
      if (!this.channel) {
        await this.connect();
      }

      await this.channel.assertExchange(exchange, 'direct', { durable: false });
      await this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(eventData)),
      );
    } catch (error) {
      console.error('Error publishing RabbitMQ event:', error.message);
    }
  }
}
