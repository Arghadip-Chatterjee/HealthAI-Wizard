import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // SMTP user
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json();

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM, // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
