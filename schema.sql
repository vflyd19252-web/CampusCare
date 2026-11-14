CREATE DATABASE IF NOT EXISTS campuscare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campuscare;
CREATE TABLE IF NOT EXISTS students (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(120) NOT NULL, roll_no VARCHAR(40) NOT NULL UNIQUE,
 email VARCHAR(190) NOT NULL UNIQUE, department VARCHAR(120) NOT NULL,
 semester VARCHAR(30) NOT NULL, room VARCHAR(80) NULL,
 password_hash VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS complaints (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 student_id BIGINT UNSIGNED NOT NULL, title VARCHAR(180) NOT NULL,
 category VARCHAR(100) NOT NULL, location VARCHAR(180) NOT NULL,
 description TEXT NOT NULL, image_path VARCHAR(255) NULL,
 status ENUM('Pending','In Progress','Resolved','Rejected') NOT NULL DEFAULT 'Pending',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_complaints_student_created(student_id,created_at),
 INDEX idx_complaints_status(status),
 CONSTRAINT fk_complaints_student FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS complaint_updates (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, complaint_id BIGINT UNSIGNED NOT NULL,
 status ENUM('Pending','In Progress','Resolved','Rejected') NOT NULL,
 note VARCHAR(500) NULL, updated_by_role ENUM('student','admin','system') NOT NULL DEFAULT 'system',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_updates_complaint_created(complaint_id,created_at),
 CONSTRAINT fk_updates_complaint FOREIGN KEY(complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
) ENGINE=InnoDB;
