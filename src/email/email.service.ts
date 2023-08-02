import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP server
      port: 587, // Replace with the port used by your SMTP server
      secure: false,
      auth: {
        user: 'your_email@example.com', // Replace with your email address
        pass: 'your_email_password', // Replace with your email password
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'your_email@example.com', // Replace with your email address
      to,
      subject,
      text: body,
    });
  }
}
