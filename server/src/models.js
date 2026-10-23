import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }, author: String, isbn: String, barcode: { type: String, unique: true, sparse: true },
  category: String, copies: { type: Number, default: 1 }, available: { type: Number, default: 1 }
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true }, cardCode: { type: String, unique: true, sparse: true }, department: String
}, { timestamps: true });

const loanSchema = new mongoose.Schema({
  studentName: { type: String, required: true }, studentId: String,
  email: { type: String, required: true }, book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now }, dueDate: { type: Date, required: true },
  returnedAt: Date, reminderSentAt: Date
}, { timestamps: true });

const seatSchema = new mongoose.Schema({
  seatCode: { type: String, required: true }, zone: String,
  studentName: String, studentId: String, startAt: Date, endAt: Date,
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved'], default: 'Available' }
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
  title: String, description: String, date: Date, location: String,
  status: { type: String, enum: ['Upcoming', 'Completed'], default: 'Upcoming' }
}, { timestamps: true });

const staffSchema = new mongoose.Schema({
  name: String, role: String, department: String, email: String, phone: String, officeHours: String
}, { timestamps: true });

const linkSchema = new mongoose.Schema({
  title: String, url: String, category: String, description: String
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Loan = mongoose.model('Loan', loanSchema);
export const Seat = mongoose.model('Seat', seatSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Staff = mongoose.model('Staff', staffSchema);
export const Resource = mongoose.model('Resource', linkSchema);
export const Website = mongoose.model('Website', linkSchema);
