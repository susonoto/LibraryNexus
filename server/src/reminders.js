import nodemailer from 'nodemailer';
import { Loan } from './models.js';

export async function sendDueReminders() {
  const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!hasSmtp) {
    console.warn('Email reminders skipped: configure SMTP_HOST, SMTP_USER and SMTP_PASS in .env.');
    return { sent: 0, skipped: true, reason: 'SMTP not configured' };
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const now = new Date();
  const horizon = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const loans = await Loan.find({
    returnedAt: null, dueDate: { $lte: horizon },
    $or: [{ reminderSentAt: null }, { reminderSentAt: { $exists: false } }]
  }).populate('book');
  let sent = 0;
  for (const loan of loans) {
    try {
      const overdue = loan.dueDate < now;
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: loan.email,
        subject: overdue ? `Overdue library book: ${loan.book?.title || 'Book'}` : `Library book due soon: ${loan.book?.title || 'Book'}`,
        text: `Hello ${loan.studentName},\n\nThis is a library reminder for "${loan.book?.title || 'your borrowed book'}".\nDue date: ${new Date(loan.dueDate).toLocaleDateString()}.\n${overdue ? 'The book is overdue. Please return it or contact the library to renew/reissue it.' : 'Please return the book or contact the library to renew/reissue it before the due date.'}\n\nLibrary Team`
      });
      loan.reminderSentAt = new Date();
      await loan.save();
      sent++;
    } catch (err) { console.error(`Reminder failed for ${loan.email}:`, err.message); }
  }
  return { sent, skipped: false };
}
