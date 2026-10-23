import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cron from 'node-cron';
<<<<<<< HEAD
import { Book, Loan, Seat, Event, Staff, Resource, Website, Student } from './models.js';
=======
import { Book, Loan, Seat, Event, Staff, Resource, Website } from './models.js';
>>>>>>> origin/main
import { sendDueReminders } from './reminders.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'LibraryNexus API' }));
<<<<<<< HEAD
app.get('/api/students', async (_req, res, next) => { try { res.json(await Student.find().sort({ name: 1 })); } catch(e) { next(e); } });
app.post('/api/students', async (req, res, next) => { try { res.status(201).json(await Student.create(req.body)); } catch(e) { next(e); } });
app.get('/api/books', async (_req, res, next) => { try { res.json(await Book.find().sort({ title: 1 })); } catch(e) { next(e); } });
app.post('/api/books', async (req, res, next) => { try { res.status(201).json(await Book.create(req.body)); } catch(e) { next(e); } });

// Barcode/QR workflow: book labels resolve to Book.barcode or ISBN; library cards resolve to cardCode or studentId.
app.post('/api/scan/issue', async (req, res, next) => {
  try {
    const bookCode = String(req.body.bookCode || '').trim();
    const studentCode = String(req.body.studentCode || '').trim();
    if (!bookCode || !studentCode) return res.status(400).json({ message: 'Scan both a book label and a student library card.' });
    const book = await Book.findOne({ $or: [{ barcode: bookCode }, { isbn: bookCode }] });
    if (!book) return res.status(404).json({ message: `No book matches scanned code: ${bookCode}` });
    const student = await Student.findOne({ $or: [{ cardCode: studentCode }, { studentId: studentCode }] });
    if (!student) return res.status(404).json({ message: `No student matches scanned card: ${studentCode}. Add the student and card code first.` });
    if (book.available < 1) return res.status(409).json({ message: 'No available copies of this book.' });
    const active = await Loan.findOne({ book: book._id, studentId: student.studentId, returnedAt: null });
    if (active) return res.status(409).json({ message: 'This student already has an active loan for this book.' });
    const issueDate = new Date(); const dueDate = new Date(issueDate); dueDate.setDate(dueDate.getDate() + 15);
    const loan = await Loan.create({ studentName: student.name, studentId: student.studentId, email: student.email, book: book._id, issueDate, dueDate });
    book.available -= 1; await book.save();
    res.status(201).json({ message: 'Book issued successfully', loan: await loan.populate('book'), student, dueDate });
  } catch(e) { next(e); }
});
app.post('/api/scan/return', async (req, res, next) => {
  try {
    const code = String(req.body.bookCode || '').trim();
    const book = await Book.findOne({ $or: [{ barcode: code }, { isbn: code }] });
    if (!book) return res.status(404).json({ message: `No book matches scanned code: ${code}` });
    const loan = await Loan.findOne({ book: book._id, returnedAt: null }).sort({ issueDate: 1 });
    if (!loan) return res.status(404).json({ message: 'No active loan found for this book.' });
    loan.returnedAt = new Date(); await loan.save();
    book.available = Math.min(book.copies, book.available + 1); await book.save();
    res.json({ message: `Returned: ${book.title} — ${loan.studentName}`, loan });
  } catch(e) { next(e); }
});
app.post('/api/scan/seat', async (req, res, next) => {
  try {
    const code = String(req.body.seatCode || '').trim();
    const seat = await Seat.findOne({ seatCode: code });
    if (!seat) return res.status(404).json({ message: `No seat matches scanned code: ${code}` });
    if (seat.status === 'Occupied') { seat.status = 'Available'; seat.studentName = ''; seat.studentId = ''; seat.startAt = null; seat.endAt = null; }
    else { seat.status = 'Occupied'; seat.startAt = new Date(); }
    await seat.save(); res.json({ message: `${seat.seatCode} is now ${seat.status.toLowerCase()}.`, seat });
  } catch(e) { next(e); }
});

=======
app.get('/api/books', async (_req, res, next) => { try { res.json(await Book.find().sort({ title: 1 })); } catch(e) { next(e); } });
app.post('/api/books', async (req, res, next) => { try { res.status(201).json(await Book.create(req.body)); } catch(e) { next(e); } });
>>>>>>> origin/main
app.get('/api/loans', async (_req, res, next) => { try { res.json(await Loan.find().populate('book').sort({ createdAt: -1 })); } catch(e) { next(e); } });
app.post('/api/loans', async (req, res, next) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.available < 1) return res.status(409).json({ message: 'No available copies' });
    const issueDate = req.body.issueDate ? new Date(req.body.issueDate) : new Date();
    const dueDate = new Date(issueDate); dueDate.setDate(dueDate.getDate() + 15);
    const loan = await Loan.create({ ...req.body, book: book._id, issueDate, dueDate });
    book.available -= 1; await book.save();
    res.status(201).json(await loan.populate('book'));
  } catch(e) { next(e); }
});
app.patch('/api/loans/:id/return', async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    if (!loan.returnedAt) {
      loan.returnedAt = new Date(); await loan.save();
      await Book.findByIdAndUpdate(loan.book, { $inc: { available: 1 } });
    }
    res.json(loan);
  } catch(e) { next(e); }
});
const simpleRoutes = [
  ['/api/seats', Seat], ['/api/events', Event], ['/api/staff', Staff],
  ['/api/resources', Resource], ['/api/websites', Website]
];
for (const [path, Model] of simpleRoutes) {
  app.get(path, async (_req, res, next) => { try { res.json(await Model.find().sort({ createdAt: -1 })); } catch(e) { next(e); } });
  app.post(path, async (req, res, next) => { try { res.status(201).json(await Model.create(req.body)); } catch(e) { next(e); } });
}
app.get('/api/dashboard', async (_req, res, next) => {
  try {
    const [books, loans, seats, events, staff] = await Promise.all([
      Book.countDocuments(), Loan.countDocuments({ returnedAt: null }),
      Seat.countDocuments({ status: 'Occupied' }), Event.countDocuments({ status: 'Upcoming' }), Staff.countDocuments()
    ]);
    const dueSoon = await Loan.find({ returnedAt: null, dueDate: { $lte: new Date(Date.now() + 3*86400000) } }).populate('book').sort({ dueDate: 1 }).limit(8);
    const recent = await Loan.find().populate('book').sort({ createdAt: -1 }).limit(6);
    res.json({ stats: { books, activeLoans: loans, occupiedSeats: seats, upcomingEvents: events, staff }, dueSoon, recent });
  } catch(e) { next(e); }
});
app.post('/api/reminders/run', async (_req, res, next) => { try { res.json(await sendDueReminders()); } catch(e) { next(e); } });

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 400).json({ message: err.message || 'Request failed' });
});

const port = Number(process.env.PORT || 5000);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/librarynexus')
  .then(() => {
    app.listen(port, () => console.log(`LibraryNexus API running on http://localhost:${port}`));
    const hour = Math.min(23, Math.max(0, Number(process.env.REMINDER_HOUR || 9)));
    cron.schedule(`0 ${hour} * * *`, () => sendDueReminders().catch(console.error));
  })
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
