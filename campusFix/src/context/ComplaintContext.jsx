import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialComplaints } from '../data/mockData';

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('campus_care_complaints');
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  useEffect(() => {
    localStorage.setItem('campus_care_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Format today's date formatted like '24 Oct 2026'
  const getFormattedDate = () => {
    const now = new Date();
    const day = now.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = 2026; // match reference year
    return `${day} ${month} ${year}`;
  };

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Add new complaint
  const addComplaint = (newTicket, user) => {
    const today = getFormattedDate();
    const timeNow = getFormattedTime();
    const newId = complaints.length > 0 ? Math.max(...complaints.map((c) => c.id)) + 1 : 1;

    const createdComplaint = {
      id: newId,
      title: newTicket.title.trim(),
      studentName: user?.name || 'Ketan Arora',
      rollNo: user?.rollNo || '2101',
      studentEmail: user?.email || 'ketan@jimsindia.org',
      category: newTicket.category,
      status: 'Pending',
      date: today,
      time: timeNow,
      location: newTicket.location.trim(),
      description: newTicket.description.trim(),
      image: newTicket.image || '/src/assets/ceiling-fan.svg',
      timeline: [
        {
          status: 'Complaint Submitted',
          date: `${today}, ${timeNow}`,
          completed: true,
          note: 'Complaint successfully registered by student.'
        },
        {
          status: 'Under Review',
          date: 'Pending',
          completed: false,
          note: 'Assigned to facility coordinator.'
        },
        {
          status: 'In Progress',
          date: '-',
          completed: false,
          note: ''
        },
        {
          status: 'Resolved',
          date: '-',
          completed: false,
          note: ''
        }
      ],
      internalNotes: ''
    };

    setComplaints((prev) => [createdComplaint, ...prev]);
    return createdComplaint;
  };

  // Update complaint status by Admin
  const updateComplaintStatus = (id, newStatus, internalNote = '') => {
    const todayTime = `${getFormattedDate()}, ${getFormattedTime()}`;

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== Number(id)) return c;

        // Build updated timeline
        const updatedTimeline = [
          c.timeline?.[0] || { status: 'Complaint Submitted', date: `${c.date}, ${c.time || '11:00 AM'}`, completed: true },
          {
            status: 'Under Review',
            date: newStatus === 'Pending' ? 'Pending' : (c.timeline?.[1]?.completed ? c.timeline[1].date : todayTime),
            completed: newStatus !== 'Pending',
            note: 'Reviewed by administration.'
          },
          {
            status: 'In Progress',
            date: ['In Progress', 'Resolved'].includes(newStatus)
              ? (c.timeline?.[2]?.completed ? c.timeline[2].date : todayTime)
              : '-',
            completed: ['In Progress', 'Resolved'].includes(newStatus),
            note: ['In Progress', 'Resolved'].includes(newStatus) ? 'Assigned technician on-site.' : ''
          },
          {
            status: newStatus === 'Rejected' ? 'Rejected' : 'Resolved',
            date: ['Resolved', 'Rejected'].includes(newStatus) ? todayTime : '-',
            completed: ['Resolved', 'Rejected'].includes(newStatus),
            note: internalNote || (newStatus === 'Resolved' ? 'Issue verified resolved.' : '')
          }
        ];

        return {
          ...c,
          status: newStatus,
          timeline: updatedTimeline,
          internalNotes: internalNote ? `${c.internalNotes ? c.internalNotes + ' | ' : ''}${internalNote}` : c.internalNotes
        };
      })
    );
  };

  // Get complaint by ID
  const getComplaintById = (id) => {
    return complaints.find((c) => c.id === Number(id));
  };

  // Filter complaints for student
  const getStudentComplaints = (user) => {
    if (!user) return [];
    return complaints.filter(
      (c) =>
        c.rollNo?.toLowerCase() === user.rollNo?.toLowerCase() ||
        c.studentEmail?.toLowerCase() === user.email?.toLowerCase() ||
        c.studentName?.toLowerCase() === user.name?.toLowerCase()
    );
  };

  // Compute stat metrics
  const getStats = (role, user) => {
    const list = role === 'student' ? getStudentComplaints(user) : complaints;
    const total = list.length;
    const pending = list.filter((c) => c.status === 'Pending' || c.status === 'Under Review').length;
    const resolved = list.filter((c) => c.status === 'Resolved').length;
    const rejected = list.filter((c) => c.status === 'Rejected').length;

    return { total, pending, resolved, rejected };
  };

  // Reset to initial mock data
  const resetToMockData = () => {
    setComplaints(initialComplaints);
    localStorage.setItem('campus_care_complaints', JSON.stringify(initialComplaints));
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        getComplaintById,
        getStudentComplaints,
        getStats,
        resetToMockData
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);
