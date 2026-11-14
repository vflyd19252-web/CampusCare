import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'campuscare_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create the connection pool
export const pool = mysql.createPool(dbConfig);

// Helper function to auto-initialize database and tables on startup
export const initDatabase = async () => {
  try {
    // 1. Connect without database selected to ensure DB exists
    const adminConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await adminConnection.end();

    // 2. Connect with selected DB to create tables
    const connection = await pool.getConnection();

    // Students table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roll_no VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(25) DEFAULT '+91 98765 43210',
        department VARCHAR(100) DEFAULT 'Information Technology',
        semester VARCHAR(50) DEFAULT '1st Semester',
        room VARCHAR(100) DEFAULT 'Campus Hostel',
        avatar VARCHAR(10) DEFAULT 'ST',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Complaints table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500) DEFAULT NULL,
        status ENUM('Pending', 'Under Review', 'In Progress', 'Resolved', 'Rejected') DEFAULT 'Pending',
        internal_notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      );
    `);

    // Complaint timeline table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS complaint_timeline (
        id INT AUTO_INCREMENT PRIMARY KEY,
        complaint_id INT NOT NULL,
        status_title VARCHAR(100) NOT NULL,
        status_date VARCHAR(100) NOT NULL,
        completed BOOLEAN DEFAULT TRUE,
        note TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
      );
    `);

    // Check if demo student exists
    const [existingStudents] = await connection.query(
      'SELECT id FROM students WHERE roll_no = ? LIMIT 1',
      ['2101']
    );

    if (existingStudents.length === 0) {
      console.log('Seeding initial demo student (Ketan Arora - Roll No: 2101)...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      const [insertResult] = await connection.query(
        `INSERT INTO students (roll_no, name, email, password, phone, department, semester, room, avatar)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          '2101',
          'Ketan Arora',
          'ketan@jimsindia.org',
          hashedPassword,
          '+91 98765 43210',
          'Computer Applications / IT',
          '5th Semester',
          'Block A, Room 101',
          'KA'
        ]
      );

      const demoStudentId = insertResult.insertId;

      // Seed initial sample complaints for Ketan Arora
      const sampleComplaints = [
        {
          title: 'Broken Classroom Fan',
          category: 'Infrastructure',
          location: 'Block A, Classroom 101',
          description: "The ceiling fan in classroom 101 is not working since last week. It's very hot during lectures. Please look into this issue.",
          image_url: '/src/assets/ceiling-fan.svg',
          status: 'Pending',
          internal_notes: '',
          created_at: '2026-10-24 11:30:00'
        },
        {
          title: 'Projector HDMI Port Defective',
          category: 'IT/Internet',
          location: 'Seminar Hall 2',
          description: 'HDMI cable connector is bent causing flickering display during seminars.',
          image_url: null,
          status: 'Pending',
          internal_notes: '',
          created_at: '2026-10-18 12:10:00'
        },
        {
          title: 'Water Cooler Filter Replacement',
          category: 'Maintenance',
          location: 'Ground Floor Water Dispenser',
          description: 'Water dispenser indicator is showing filter change alarm.',
          image_url: null,
          status: 'Pending',
          internal_notes: '',
          created_at: '2026-10-16 15:45:00'
        },
        {
          title: 'Cafeteria Trash Bin Overflowing',
          category: 'Cleanliness',
          location: 'Main Canteen Courtyard',
          description: 'Bins were overflowing after lunch peak hours.',
          image_url: null,
          status: 'Resolved',
          internal_notes: 'Additional bins deployed.',
          created_at: '2026-10-12 13:30:00'
        },
        {
          title: 'Laboratory Power Socket Loose',
          category: 'Infrastructure',
          location: 'Lab 2, Workstation 14',
          description: 'Socket sparks slightly when laptop charger is plugged in.',
          image_url: null,
          status: 'Resolved',
          internal_notes: 'Socket modular box replaced.',
          created_at: '2026-10-10 10:00:00'
        },
        {
          title: 'Parking Shade Request for Two Wheelers',
          category: 'Infrastructure',
          location: 'Student Two Wheeler Parking Lot',
          description: 'Request to install tin roof shade over parking bay 3.',
          image_url: null,
          status: 'Rejected',
          internal_notes: 'Capital expansion proposal already under review by board for next fiscal budget.',
          created_at: '2026-09-25 16:00:00'
        }
      ];

      for (const comp of sampleComplaints) {
        const [compRes] = await connection.query(
          `INSERT INTO complaints (student_id, title, category, location, description, image_url, status, internal_notes, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            demoStudentId,
            comp.title,
            comp.category,
            comp.location,
            comp.description,
            comp.image_url,
            comp.status,
            comp.internal_notes,
            comp.created_at
          ]
        );

        // Add timeline steps for each sample complaint
        if (comp.title === 'Broken Classroom Fan') {
          await connection.query(
            `INSERT INTO complaint_timeline (complaint_id, status_title, status_date, completed, note) VALUES
             (?, 'Complaint Submitted', '24 Oct 2026, 11:30 AM', 1, 'Complaint logged successfully by student.'),
             (?, 'Under Review', 'Pending', 0, 'Awaiting inspection by electrical maintenance wing.'),
             (?, 'In Progress', '-', 0, ''),
             (?, 'Resolved', '-', 0, '')`,
            [compRes.insertId, compRes.insertId, compRes.insertId, compRes.insertId]
          );
        } else {
          await connection.query(
            `INSERT INTO complaint_timeline (complaint_id, status_title, status_date, completed, note) VALUES
             (?, 'Complaint Submitted', 'Oct 2026', 1, 'Complaint submitted successfully.')`,
            [compRes.insertId]
          );
        }
      }
      console.log('Demo complaints seeded successfully.');
    }

    connection.release();
    console.log('MySQL Database & Tables initialized successfully.');
  } catch (error) {
    console.error('MySQL Database Initialization Warning/Error:', error.message);
    console.warn('Note: Ensure MySQL service is running and credentials in .env are correct.');
  }
};
