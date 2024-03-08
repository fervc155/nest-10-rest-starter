// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as exphbs from 'express-handlebars';
import * as nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import * as path from 'path';

class Email {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Set up your email transporter configuration (e.g., SMTP, sendmail)
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS,
      },
    });


    this.transporter.use(
      'compile',
      nodemailerExpressHandlebars({
        viewEngine: exphbs.create(),
        viewPath: './views',
      }),
    );
  }

  async send(to: string, subject: string, context: any, template="base"): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      template,
      context,
    };

    try {
      await this.transporter.sendMail(mailOptions);

    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}


export default new Email()