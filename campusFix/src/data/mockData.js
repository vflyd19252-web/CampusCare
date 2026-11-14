// Initial Mock Data for Campus Care
// Configured to match the exact counts and items in the reference images

export const initialUsers = [
  {
    id: 'student-2101',
    name: 'Ketan Arora',
    rollNo: '2101',
    email: 'ketan@jimsindia.org',
    password: 'password123',
    role: 'student',
    phone: '+91 98765 43210',
    department: 'Computer Applications / IT',
    semester: '5th Semester',
    room: 'Block A, Room 101',
    avatar: 'KA'
  },
  {
    id: 'admin-01',
    name: 'Admin User',
    adminId: 'admin',
    email: 'admin@jimsindia.org',
    password: 'admin123',
    role: 'admin',
    phone: '+91 98111 22334',
    department: 'Campus Estate & Maintenance',
    designation: 'Chief Administrator',
    avatar: 'AU'
  }
];

export const initialComplaints = [
  {
    id: 1,
    title: 'Broken Classroom Fan',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Infrastructure',
    status: 'Pending',
    date: '24 Oct 2026',
    time: '11:30 AM',
    location: 'Block A, Classroom 101',
    description: "The ceiling fan in classroom 101 is not working since last week. It's very hot during lectures. Please look into this issue.",
    image: '/src/assets/ceiling-fan.svg',
    timeline: [
      { status: 'Complaint Submitted', date: '24 Oct 2026, 11:30 AM', completed: true, note: 'Complaint logged successfully by student.' },
      { status: 'Under Review', date: 'Pending', completed: false, note: 'Awaiting inspection by electrical maintenance wing.' },
      { status: 'In Progress', date: '-', completed: false, note: '' },
      { status: 'Resolved', date: '-', completed: false, note: '' }
    ],
    internalNotes: ''
  },
  {
    id: 2,
    title: 'Water Leakage in Library',
    studentName: 'Priya Sharma',
    rollNo: '2045',
    studentEmail: 'priya@jimsindia.org',
    category: 'Maintenance',
    status: 'Resolved',
    date: '22 Oct 2026',
    time: '09:15 AM',
    location: 'Central Library, 2nd Floor Reading Hall',
    description: 'Continuous water seepage from AC duct onto study desks near row 4.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '22 Oct 2026, 09:15 AM', completed: true },
      { status: 'Under Review', date: '22 Oct 2026, 10:00 AM', completed: true },
      { status: 'In Progress', date: '22 Oct 2026, 01:30 PM', completed: true },
      { status: 'Resolved', date: '22 Oct 2026, 05:00 PM', completed: true, note: 'Drainage pipe cleared and sealed.' }
    ],
    internalNotes: 'Drain pipe unclogged by plumber Suresh.'
  },
  {
    id: 3,
    title: 'Wi-Fi Not Working',
    studentName: 'Rohan Mehta',
    rollNo: '2088',
    studentEmail: 'rohan@jimsindia.org',
    category: 'IT/Internet',
    status: 'Pending',
    date: '21 Oct 2026',
    time: '02:40 PM',
    location: 'Computer Lab 3, Ground Floor',
    description: 'Wi-Fi router shows red light and students cannot connect during practical sessions.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '21 Oct 2026, 02:40 PM', completed: true },
      { status: 'Under Review', date: 'Pending', completed: false },
      { status: 'In Progress', date: '-', completed: false },
      { status: 'Resolved', date: '-', completed: false }
    ],
    internalNotes: ''
  },
  {
    id: 4,
    title: 'Washroom Cleaning Issue',
    studentName: 'Aman Verma',
    rollNo: '2115',
    studentEmail: 'aman@jimsindia.org',
    category: 'Cleanliness',
    status: 'Resolved',
    date: '20 Oct 2026',
    time: '10:05 AM',
    location: 'Academic Block B, 1st Floor Boys Washroom',
    description: 'Sanitation issue and taps require maintenance in 1st floor washroom.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '20 Oct 2026, 10:05 AM', completed: true },
      { status: 'Under Review', date: '20 Oct 2026, 10:30 AM', completed: true },
      { status: 'In Progress', date: '20 Oct 2026, 11:45 AM', completed: true },
      { status: 'Resolved', date: '20 Oct 2026, 03:00 PM', completed: true, note: 'Housekeeping sanitized and replaced washer.' }
    ],
    internalNotes: 'Housekeeping supervisor verified.'
  },
  {
    id: 5,
    title: 'Street Light Not Working',
    studentName: 'Neha Singh',
    rollNo: '2033',
    studentEmail: 'neha@jimsindia.org',
    category: 'Infrastructure',
    status: 'Rejected',
    date: '19 Oct 2026',
    time: '07:20 PM',
    location: 'Pathway between Main Gate and Canteen',
    description: 'Pathway lights are flickering and creating unsafe dark spots in the evening.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '19 Oct 2026, 07:20 PM', completed: true },
      { status: 'Under Review', date: '20 Oct 2026, 09:00 AM', completed: true },
      { status: 'Rejected', date: '20 Oct 2026, 11:00 AM', completed: true, note: 'Entire corridor lighting being upgraded next month under campus solar project.' }
    ],
    internalNotes: 'Excluded because solar contractor is overhauling this area on Nov 5.'
  },

  // Additional complaints for Ketan Arora so his totals match: 12 Total (5 Pending, 6 Resolved, 1 Rejected)
  {
    id: 6,
    title: 'Projector HDMI Port Defective',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'IT/Internet',
    status: 'Pending',
    date: '18 Oct 2026',
    time: '12:10 PM',
    location: 'Seminar Hall 2',
    description: 'HDMI cable connector is bent causing flickering display during seminars.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '18 Oct 2026, 12:10 PM', completed: true },
      { status: 'Under Review', date: 'Pending', completed: false }
    ],
    internalNotes: ''
  },
  {
    id: 7,
    title: 'Water Cooler Filter Replacement',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Maintenance',
    status: 'Pending',
    date: '16 Oct 2026',
    time: '03:45 PM',
    location: 'Ground Floor Water Dispenser',
    description: 'Water dispenser indicator is showing filter change alarm.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '16 Oct 2026, 03:45 PM', completed: true },
      { status: 'Under Review', date: 'Pending', completed: false }
    ],
    internalNotes: ''
  },
  {
    id: 8,
    title: 'Broken Desk in Tutorial Room',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Infrastructure',
    status: 'Pending',
    date: '15 Oct 2026',
    time: '11:00 AM',
    location: 'Tutorial Room 204',
    description: 'Desk wooden top is coming loose and has sharp nails exposed.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '15 Oct 2026, 11:00 AM', completed: true },
      { status: 'Under Review', date: 'Pending', completed: false }
    ],
    internalNotes: ''
  },
  {
    id: 9,
    title: 'Library Air Conditioner Remote Missing',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Maintenance',
    status: 'Pending',
    date: '14 Oct 2026',
    time: '04:15 PM',
    location: 'Reference Section Library',
    description: 'AC is running at lowest temperature and remote is not at counter.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '14 Oct 2026, 04:15 PM', completed: true },
      { status: 'Under Review', date: 'Pending', completed: false }
    ],
    internalNotes: ''
  },
  {
    id: 10,
    title: 'Cafeteria Trash Bin Overflowing',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Cleanliness',
    status: 'Resolved',
    date: '12 Oct 2026',
    time: '01:30 PM',
    location: 'Main Canteen Courtyard',
    description: 'Bins were overflowing after lunch peak hours.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '12 Oct 2026, 01:30 PM', completed: true },
      { status: 'Resolved', date: '12 Oct 2026, 03:00 PM', completed: true }
    ],
    internalNotes: 'Additional bins deployed.'
  },
  {
    id: 11,
    title: 'Laboratory Power Socket Loose',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Infrastructure',
    status: 'Resolved',
    date: '10 Oct 2026',
    time: '10:00 AM',
    location: 'Lab 2, Workstation 14',
    description: 'Socket sparks slightly when laptop charger is plugged in.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '10 Oct 2026, 10:00 AM', completed: true },
      { status: 'Resolved', date: '10 Oct 2026, 01:00 PM', completed: true }
    ],
    internalNotes: 'Socket modular box replaced.'
  },
  {
    id: 12,
    title: 'Gym Dumbbell Rack Screw Loose',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Maintenance',
    status: 'Resolved',
    date: '08 Oct 2026',
    time: '06:00 PM',
    location: 'Campus Fitness Centre',
    description: 'Second tier dumbbell rack requires tightening.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '08 Oct 2026, 06:00 PM', completed: true },
      { status: 'Resolved', date: '09 Oct 2026, 09:00 AM', completed: true }
    ],
    internalNotes: 'Tightened with hex keys.'
  },
  {
    id: 13,
    title: 'Notice Board Glass Panel Jammed',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Infrastructure',
    status: 'Resolved',
    date: '05 Oct 2026',
    time: '11:45 AM',
    location: 'Academic Admin Corridor',
    description: 'Glass sliding panel on student notice board was stuck.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '05 Oct 2026, 11:45 AM', completed: true },
      { status: 'Resolved', date: '05 Oct 2026, 02:00 PM', completed: true }
    ],
    internalNotes: 'Sliding track lubricated.'
  },
  {
    id: 14,
    title: 'Auditorium Microphone Audio Hum',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'IT/Internet',
    status: 'Resolved',
    date: '02 Oct 2026',
    time: '03:15 PM',
    location: 'Main Auditorium Podia',
    description: 'Podium mic produces 50Hz ground hum noise.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '02 Oct 2026, 03:15 PM', completed: true },
      { status: 'Resolved', date: '03 Oct 2026, 11:00 AM', completed: true }
    ],
    internalNotes: 'Ground loop isolator installed on mixer input.'
  },
  {
    id: 15,
    title: 'Hostel Corridors Floor Mopping',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Cleanliness',
    status: 'Resolved',
    date: '28 Sep 2026',
    time: '08:30 AM',
    location: 'Boys Hostel Wing B 2nd Floor',
    description: 'Corridor required disinfectant mopping.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '28 Sep 2026, 08:30 AM', completed: true },
      { status: 'Resolved', date: '28 Sep 2026, 11:30 AM', completed: true }
    ],
    internalNotes: 'Routine cleaning completed.'
  },
  {
    id: 16,
    title: 'Parking Shade Request for Two Wheelers',
    studentName: 'Ketan Arora',
    rollNo: '2101',
    studentEmail: 'ketan@jimsindia.org',
    category: 'Infrastructure',
    status: 'Rejected',
    date: '25 Sep 2026',
    time: '04:00 PM',
    location: 'Student Two Wheeler Parking Lot',
    description: 'Request to install tin roof shade over parking bay 3.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '25 Sep 2026, 04:00 PM', completed: true },
      { status: 'Rejected', date: '26 Sep 2026, 12:00 PM', completed: true, note: 'Capital expansion proposal already under review by board for next fiscal budget.' }
    ],
    internalNotes: 'Policy matter; not an immediate maintenance ticket.'
  },

  // Additional campus-wide complaints to complete Admin 28 Total (12 Pending, 14 Resolved, 2 Rejected)
  {
    id: 17,
    title: 'Water Pressure Low in 3rd Floor Restrooms',
    studentName: 'Tanvi Kapoor',
    rollNo: '2067',
    studentEmail: 'tanvi@jimsindia.org',
    category: 'Maintenance',
    status: 'Pending',
    date: '24 Oct 2026',
    time: '09:00 AM',
    location: 'Management Block 3rd Floor',
    description: 'Overhead booster pump tripped causing very low tap pressure.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '24 Oct 2026, 09:00 AM', completed: true }],
    internalNotes: ''
  },
  {
    id: 18,
    title: 'Classroom 302 Projector Bulb Replacement',
    studentName: 'Varun Joshi',
    rollNo: '2012',
    studentEmail: 'varun@jimsindia.org',
    category: 'IT/Internet',
    status: 'Pending',
    date: '23 Oct 2026',
    time: '11:15 AM',
    location: 'Classroom 302',
    description: 'Projector turns off with overheat lamp warning after 10 minutes.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '23 Oct 2026, 11:15 AM', completed: true }],
    internalNotes: ''
  },
  {
    id: 19,
    title: 'E-Library Terminal 8 Keyboard Sticky',
    studentName: 'Ishaan Gupta',
    rollNo: '2099',
    studentEmail: 'ishaan@jimsindia.org',
    category: 'IT/Internet',
    status: 'Pending',
    date: '23 Oct 2026',
    time: '01:50 PM',
    location: 'Digital Library Wing',
    description: 'Spacebar and enter keys are sticking on PC-08.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '23 Oct 2026, 01:50 PM', completed: true }],
    internalNotes: ''
  },
  {
    id: 20,
    title: 'Cafeteria Table Leg Wobbly',
    studentName: 'Simran Gill',
    rollNo: '2050',
    studentEmail: 'simran@jimsindia.org',
    category: 'Maintenance',
    status: 'Pending',
    date: '22 Oct 2026',
    time: '02:00 PM',
    location: 'Cafeteria Corner Booth 6',
    description: 'Table rocks significantly risking tea spillages.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '22 Oct 2026, 02:00 PM', completed: true }],
    internalNotes: ''
  },
  {
    id: 21,
    title: 'Hand Dryer Inoperative',
    studentName: 'Arjun Singhal',
    rollNo: '2120',
    studentEmail: 'arjun@jimsindia.org',
    category: 'Cleanliness',
    status: 'Pending',
    date: '22 Oct 2026',
    time: '04:30 PM',
    location: 'Admin Block Ground Floor Restroom',
    description: 'Sensor does not trigger heating blower.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '22 Oct 2026, 04:30 PM', completed: true }],
    internalNotes: ''
  },
  {
    id: 22,
    title: 'Biometric Attendance Device Offline',
    studentName: 'Divya Aggarwal',
    rollNo: '2075',
    studentEmail: 'divya@jimsindia.org',
    category: 'IT/Internet',
    status: 'Pending',
    date: '21 Oct 2026',
    time: '09:10 AM',
    location: 'Academic Staff Room Entrance',
    description: 'Biometric reader screen shows server sync error.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '21 Oct 2026, 09:10 AM', completed: true }],
    internalNotes: ''
  },
  {
    id: 23,
    title: 'Fire Extinguisher Inspection Past Due',
    studentName: 'Kunal Saxena',
    rollNo: '2081',
    studentEmail: 'kunal@jimsindia.org',
    category: 'Infrastructure',
    status: 'Pending',
    date: '21 Oct 2026',
    time: '12:00 PM',
    location: 'Chemistry Lab Corridor',
    description: 'Pressure gauge indicator on extinguisher #4 is on empty mark.',
    image: '',
    timeline: [{ status: 'Complaint Submitted', date: '21 Oct 2026, 12:00 PM', completed: true }],
    internalNotes: ''
  },
  {
    id: 24,
    title: 'Classroom 104 Door Lock Latches Hard',
    studentName: 'Sneha Rao',
    rollNo: '2042',
    studentEmail: 'sneha@jimsindia.org',
    category: 'Infrastructure',
    status: 'Resolved',
    date: '19 Oct 2026',
    time: '08:45 AM',
    location: 'Block A, Classroom 104',
    description: 'Door requires heavy force to shut.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '19 Oct 2026, 08:45 AM', completed: true },
      { status: 'Resolved', date: '19 Oct 2026, 02:00 PM', completed: true }
    ],
    internalNotes: 'Striker plate adjusted.'
  },
  {
    id: 25,
    title: 'Elevator 2 Emergency Light Battery',
    studentName: 'Manish Tyagi',
    rollNo: '2109',
    studentEmail: 'manish@jimsindia.org',
    category: 'Maintenance',
    status: 'Resolved',
    date: '18 Oct 2026',
    time: '05:30 PM',
    location: 'Central Elevator 2',
    description: 'Backup emergency lamp was not illuminating during test switch.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '18 Oct 2026, 05:30 PM', completed: true },
      { status: 'Resolved', date: '19 Oct 2026, 11:30 AM', completed: true }
    ],
    internalNotes: '12V backup battery replaced by Schindler technicians.'
  },
  {
    id: 26,
    title: 'Campus Garden Lawn Sprinkler Head Clogged',
    studentName: 'Ritu Jain',
    rollNo: '2021',
    studentEmail: 'ritu@jimsindia.org',
    category: 'Maintenance',
    status: 'Resolved',
    date: '17 Oct 2026',
    time: '07:30 AM',
    location: 'Front Lawn Near Fountain',
    description: 'Rotary sprinkler was not oscillating.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '17 Oct 2026, 07:30 AM', completed: true },
      { status: 'Resolved', date: '17 Oct 2026, 10:00 AM', completed: true }
    ],
    internalNotes: 'Grit removed from nozzle.'
  },
  {
    id: 27,
    title: 'Drinking Water Tap Dripping',
    studentName: 'Gaurav Pathak',
    rollNo: '2091',
    studentEmail: 'gaurav@jimsindia.org',
    category: 'Maintenance',
    status: 'Resolved',
    date: '16 Oct 2026',
    time: '01:10 PM',
    location: '2nd Floor Canteen Balcony',
    description: 'Tap washer degraded causing water wastage.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '16 Oct 2026, 01:10 PM', completed: true },
      { status: 'Resolved', date: '16 Oct 2026, 04:30 PM', completed: true }
    ],
    internalNotes: 'Brass valve washer replaced.'
  },
  {
    id: 28,
    title: 'Private Vehicle Parking Permission in Staff Zone',
    studentName: 'Abhishek Roy',
    rollNo: '2019',
    studentEmail: 'abhishek@jimsindia.org',
    category: 'Infrastructure',
    status: 'Rejected',
    date: '15 Oct 2026',
    time: '03:00 PM',
    location: 'Faculty Reserved Car Port',
    description: 'Request for special sticker to park in faculty zone due to leg fracture.',
    image: '',
    timeline: [
      { status: 'Complaint Submitted', date: '15 Oct 2026, 03:00 PM', completed: true },
      { status: 'Rejected', date: '16 Oct 2026, 10:00 AM', completed: true, note: 'Special medical accessibility parking pass issued through Student Welfare Office instead of portal ticket.' }
    ],
    internalNotes: 'Directed student to Dean Student Welfare office for physical sticker.'
  }
];

export const CATEGORIES = [
  'Infrastructure',
  'Maintenance',
  'IT/Internet',
  'Cleanliness',
  'Electrical',
  'Hostel',
  'Academic'
];

export const STATUS_OPTIONS = [
  'Pending',
  'Under Review',
  'In Progress',
  'Resolved',
  'Rejected'
];
