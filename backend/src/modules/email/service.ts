import nodemailer from 'nodemailer';
import { env } from '../../config/env';

export type SendEmailInput = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail(input: SendEmailInput) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: env.gmail.user,
      clientId: env.gmail.clientId,
      clientSecret: env.gmail.clientSecret,
      refreshToken: env.gmail.refreshToken
    }
  });

  return transporter.sendMail({
    from: env.gmail.user,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html
  });
}
