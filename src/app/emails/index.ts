// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'express-handlebars';
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

    const handlebarsOptions = handlebars({
      extname: '.hbs',
      layoutsDir: path.resolve(__dirname, 'views/layouts'), // Change this path based on your project structure
      partialsDir: path.resolve(__dirname, 'views/partials'), // Change this path based on your project structure
      defaultLayout: 'main',
    });

    this.transporter.use('compile', nodemailer.createTransport({
      viewEngine: handlebarsOptions,
      viewPath: path.resolve(__dirname, 'views'),
    }));
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