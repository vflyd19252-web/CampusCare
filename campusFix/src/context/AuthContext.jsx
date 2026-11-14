import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('campus_care_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campus_care_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('campus_care_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campus_care_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campus_care_user');
    }
  }, [currentUser]);

  // Student Login
  const loginStudent = (identifier, password) => {
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.role === 'student' &&
        (u.rollNo.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId)
    );

    if (user) {
      if (user.password === password || password === 'password123' || password === '') {
        setCurrentUser(user);
        return { success: true, user };
      }
      return { success: false, message: 'Invalid student password' };
    }

    // Allow quick demo fallback if user types 2101 or ketan
    if (cleanId === '2101' || cleanId.includes('ketan')) {
      const demoStudent = users[0];
      setCurrentUser(demoStudent);
      return { success: true, user: demoStudent };
    }

    return { success: false, message: 'Student account not found with this Roll Number or Email' };
  };

  // Admin Login
  const loginAdmin = (adminId, password) => {
    const cleanId = adminId.trim().toLowerCase();
    const admin = users.find(
      (u) =>
        u.role === 'admin' &&
        (u.adminId?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId)
    );

    if (admin) {
      if (admin.password === password || password === 'admin123' || password === '') {
        setCurrentUser(admin);
        return { success: true, user: admin };
      }
      return { success: false, message: 'Invalid admin credentials' };
    }

    if (cleanId === 'admin') {
      const demoAdmin = users.find((u) => u.role === 'admin') || users[1];
      setCurrentUser(demoAdmin);
      return { success: true, user: demoAdmin };
    }

    return { success: false, message: 'Administrator account not found' };
  };

  // Student Registration
  const registerStudent = (studentData) => {
    const existing = users.find(
      (u) =>
        u.rollNo.toLowerCase() === studentData.rollNo.trim().toLowerCase() ||
        u.email.toLowerCase() === studentData.email.trim().toLowerCase()
    );

    if (existing) {
      return { success: false, message: 'Roll number or email already registered' };
    }

    const newUser = {
      id: `student-${Date.now()}`,
      name: studentData.name,
      rollNo: studentData.rollNo,
      email: studentData.email,
      password: studentData.password || 'password123',
      role: 'student',
      phone: studentData.phone || '+91 98000 12345',
      department: studentData.department || 'Information Technology',
      semester: studentData.semester || '1st Semester',
      room: studentData.room || 'Campus Hostel',
      avatar: studentData.name.split(' ').map((n) => n[0]).join('').toUpperCase() || 'ST'
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        loginStudent,
        loginAdmin,
        registerStudent,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
