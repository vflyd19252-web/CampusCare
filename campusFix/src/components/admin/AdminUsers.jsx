import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';

const AdminUsers = () => {
  const { users } = useAuth();
  const { complaints } = useComplaints();

  // Combine mock students with users list
  const studentList = [
    { name: 'Ketan Arora', rollNo: '2101', email: 'ketan@jimsindia.org', dept: 'IT', role: 'Student' },
    { name: 'Priya Sharma', rollNo: '2045', email: 'priya@jimsindia.org', dept: 'Library / Arts', role: 'Student' },
    { name: 'Rohan Mehta', rollNo: '2088', email: 'rohan@jimsindia.org', dept: 'Computer Science', role: 'Student' },
    { name: 'Aman Verma', rollNo: '2115', email: 'aman@jimsindia.org', dept: 'Management', role: 'Student' },
    { name: 'Neha Singh', rollNo: '2033', email: 'neha@jimsindia.org', dept: 'Commerce', role: 'Student' },
    { name: 'Admin User', rollNo: 'STAFF-01', email: 'admin@jimsindia.org', dept: 'Estate Maintenance', role: 'Administrator' }
  ];

  return (
    <div className="cc-content-container">
      <div className="cc-page-header">
        <h1 className="cc-page-title">Registered Users</h1>
        <p className="cc-page-subtitle">
          Manage and monitor all student and administration accounts.
        </p>
      </div>

      <div className="cc-panel-card">
        <div className="cc-panel-card-header">
          <h2 className="cc-panel-card-title">Campus Members Directory</h2>
          <span className="badge bg-warning text-dark px-2 py-1 small">Total: {studentList.length}</span>
        </div>

        <div className="cc-table-responsive">
          <table className="cc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll / Staff ID</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Complaints Filed</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((u, i) => {
                const count = complaints.filter(
                  (c) => c.studentName?.toLowerCase() === u.name.toLowerCase()
                ).length;
                return (
                  <tr key={i}>
                    <td className="cc-td-muted">{i + 1}</td>
                    <td className="cc-td-title">{u.name}</td>
                    <td className="cc-td-muted">{u.rollNo}</td>
                    <td className="cc-td-muted">{u.email}</td>
                    <td className="text-white">{u.dept}</td>
                    <td>
                      <span className={`badge ${u.role === 'Administrator' ? 'bg-danger' : 'bg-primary'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="fw-bold text-warning">{count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
