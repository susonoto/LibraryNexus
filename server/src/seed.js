import 'dotenv/config';
import mongoose from 'mongoose';
<<<<<<< HEAD
import { Book, Loan, Seat, Event, Staff, Resource, Website, Student } from './models.js';

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/librarynexus');
await Promise.all([Book, Loan, Seat, Event, Staff, Resource, Website, Student].map(M => M.deleteMany({})));
const books = await Book.insertMany([
 { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', barcode: 'BK-ATOMIC-001', category: 'Personal Development', copies: 5, available: 4 },
 { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', barcode: 'BK-CLEAN-002', category: 'Computer Science', copies: 4, available: 3 },
 { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', isbn: '9780135957059', barcode: 'BK-PRAG-003', category: 'Computer Science', copies: 3, available: 3 },
 { title: 'Introduction to Algorithms', author: 'Cormen et al.', isbn: '9780262046305', barcode: 'BK-ALGO-004', category: 'Computer Science', copies: 6, available: 5 },
 { title: 'Deep Learning', author: 'Goodfellow et al.', isbn: '9780262035613', barcode: 'BK-DL-005', category: 'AI & Data Science', copies: 2, available: 2 }
]);
await Student.insertMany([
 { name: 'Aarav Sharma', studentId: 'CS2026-014', email: 'aarav@example.edu', cardCode: 'CARD-CS2026-014', department: 'Computer Science' },
 { name: 'Meera Patel', studentId: 'CS2026-031', email: 'meera@example.edu', cardCode: 'CARD-CS2026-031', department: 'Computer Science' },
 { name: 'Rohan Das', studentId: 'IT2026-008', email: 'rohan@example.edu', cardCode: 'CARD-IT2026-008', department: 'Information Technology' },
 { name: 'Ishita Verma', studentId: 'EC2026-022', email: 'ishita@example.edu', cardCode: 'CARD-EC2026-022', department: 'Electronics' }
=======
import { Book, Loan, Seat, Event, Staff, Resource, Website } from './models.js';

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/librarynexus');
await Promise.all([Book, Loan, Seat, Event, Staff, Resource, Website].map(M => M.deleteMany({})));
const books = await Book.insertMany([
 { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', category: 'Personal Development', copies: 5, available: 4 },
 { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Computer Science', copies: 4, available: 3 },
 { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', isbn: '9780135957059', category: 'Computer Science', copies: 3, available: 3 },
 { title: 'Introduction to Algorithms', author: 'Cormen et al.', isbn: '9780262046305', category: 'Computer Science', copies: 6, available: 5 },
 { title: 'Deep Learning', author: 'Goodfellow et al.', isbn: '9780262035613', category: 'AI & Data Science', copies: 2, available: 2 }
>>>>>>> origin/main
]);
const issue = new Date(); issue.setDate(issue.getDate() - 12);
const due = new Date(issue); due.setDate(due.getDate() + 15);
await Loan.create([
 { studentName: 'Aarav Sharma', studentId: 'CS2026-014', email: 'aarav@example.edu', book: books[0]._id, issueDate: issue, dueDate: due },
 { studentName: 'Meera Patel', studentId: 'CS2026-031', email: 'meera@example.edu', book: books[1]._id, issueDate: new Date(Date.now()-5*86400000), dueDate: new Date(Date.now()+10*86400000) },
 { studentName: 'Rohan Das', studentId: 'IT2026-008', email: 'rohan@example.edu', book: books[3]._id, issueDate: new Date(Date.now()-18*86400000), dueDate: new Date(Date.now()-3*86400000) }
]);
await Seat.insertMany([
 { seatCode: 'A-01', zone: 'Silent Zone', status: 'Occupied', studentName: 'Aarav Sharma', studentId: 'CS2026-014', startAt: new Date(Date.now()-3600000), endAt: new Date(Date.now()+2*3600000) },
 { seatCode: 'A-02', zone: 'Silent Zone', status: 'Available' },
 { seatCode: 'A-03', zone: 'Silent Zone', status: 'Reserved', studentName: 'Meera Patel', startAt: new Date(Date.now()+3600000), endAt: new Date(Date.now()+4*3600000) },
 { seatCode: 'B-01', zone: 'Group Study', status: 'Occupied', studentName: 'Rohan Das', studentId: 'IT2026-008', startAt: new Date(Date.now()-1800000), endAt: new Date(Date.now()+90*60000) },
 { seatCode: 'B-02', zone: 'Group Study', status: 'Available' },
 { seatCode: 'C-01', zone: 'Reading Hall', status: 'Available' }
]);
await Event.insertMany([
 { title: 'National Reading Day', description: 'Reading circle, book exhibition and student recommendations.', date: new Date(Date.now()+7*86400000), location: 'Central Library Hall', status: 'Upcoming' },
 { title: 'Research Discovery Workshop', description: 'Learn to find scholarly papers and evaluate sources.', date: new Date(Date.now()-14*86400000), location: 'Digital Learning Lab', status: 'Completed' },
 { title: 'Book Exchange Week', description: 'Bring a book, share a story, discover a new author.', date: new Date(Date.now()+21*86400000), location: 'Library Lobby', status: 'Upcoming' }
]);
await Staff.insertMany([
 { name: 'Dr. Ananya Rao', role: 'Head Librarian', department: 'Library Administration', email: 'library.head@example.edu', phone: '+91 90000 00001', officeHours: 'Mon–Fri · 10:00–16:00' },
 { name: 'Vikram Singh', role: 'Assistant Librarian', department: 'Circulation', email: 'circulation@example.edu', phone: '+91 90000 00002', officeHours: 'Mon–Sat · 09:00–15:00' },
 { name: 'Priya Nair', role: 'Library Staff', department: 'Digital Resources', email: 'digital.library@example.edu', phone: '+91 90000 00003', officeHours: 'Mon–Fri · 11:00–17:00' }
]);
await Resource.insertMany([
 { title: 'NPTEL', url: 'https://nptel.ac.in/', category: 'Learning', description: 'Online courses from IITs and IISc.' },
 { title: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/', category: 'Digital Library', description: 'Searchable learning resources across disciplines.' },
 { title: 'Shodhganga', url: 'https://shodhganga.inflibnet.ac.in/', category: 'Research', description: 'Indian theses and dissertations repository.' },
 { title: 'Google Scholar', url: 'https://scholar.google.com/', category: 'Research', description: 'Search scholarly literature and citations.' },
 { title: 'KIHA / College Resource Portal', url: 'https://example.edu/', category: 'College Resource', description: 'Replace with your institution’s verified KIHA portal URL.' }
]);
await Website.insertMany([
 { title: 'College Main Website', url: 'https://example.edu/', category: 'Official', description: 'Replace with your official college website.' },
 { title: 'Student Portal', url: 'https://example.edu/student', category: 'Student Services', description: 'Replace with your student portal URL.' },
 { title: 'Learning Management System', url: 'https://example.edu/lms', category: 'Learning', description: 'Replace with your LMS URL.' },
 { title: 'Examination Portal', url: 'https://example.edu/exams', category: 'Academic', description: 'Replace with your examination portal URL.' }
]);
console.log('Seeded demo LibraryNexus data.');
await mongoose.disconnect();
