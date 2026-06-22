// ==========================================
// QueueLess - Dummy Queue Data
// ==========================================

// NOTE:
// Abhi hardcoded data use ho raha hai.
//
// Future Backend Integration
// (Hitesh Choudhary / Chai Aur Code Style)
//
// GET:
// /api/v1/operator/queue
//
// Example:
//
// const response = await api.get(
//   "/operator/queue"
// )
//
// setQueue(response.data.data)
//
// ==========================================

const queueData = [
  {
    id: 1,
    token: "A-045",
    name: "Priya Verma",
    service: "General Consultation",
    eta: "3 min",
    color: "green",
    status: "waiting",
  },

  {
    id: 2,
    token: "A-046",
    name: "Amit Singh",
    service: "General Consultation",
    eta: "6 min",
    color: "green",
    status: "waiting",
  },

  {
    id: 3,
    token: "A-047",
    name: "Sneha Gupta",
    service: "Eye Checkup",
    eta: "9 min",
    color: "green",
    status: "waiting",
  },

  {
    id: 4,
    token: "A-048",
    name: "Vikas Yadav",
    service: "Dental Checkup",
    eta: "12 min",
    color: "orange",
    status: "waiting",
  },

  {
    id: 5,
    token: "A-049",
    name: "Neha Mishra",
    service: "General Consultation",
    eta: "15 min",
    color: "orange",
    status: "waiting",
  },

  {
    id: 6,
    token: "A-050",
    name: "Rohit Kumar",
    service: "Physiotherapy",
    eta: "18 min",
    color: "red",
    status: "waiting",
  },

  {
    id: 7,
    token: "A-051",
    name: "Anjali Sharma",
    service: "Eye Checkup",
    eta: "21 min",
    color: "red",
    status: "waiting",
  },

  {
    id: 8,
    token: "A-052",
    name: "Karan Patel",
    service: "Dental Checkup",
    eta: "24 min",
    color: "red",
    status: "waiting",
  },
];

// ==========================================
// Current Serving Token
// ==========================================

export const currentServingData = {
  token: "A-044",
  name: "Rahul Sharma",
  service: "General Consultation",
  eta: "3 min",
  status: "serving",
};

// ==========================================
// Dashboard Stats
// ==========================================

export const dashboardStats = {
  peopleWaiting: 8,
  averageWaitTime: "12 min",
  servedToday: 124,
};

// ==========================================
// Quick Actions
// ==========================================

export const quickActions = [
  {
    id: 1,
    title: "View Queue",
    subtitle: "See all tokens",
    type: "queue",
  },

  {
    id: 2,
    title: "Today's Summary",
    subtitle: "View analytics",
    type: "analytics",
  },

  {
    id: 3,
    title: "Token History",
    subtitle: "View all history",
    type: "history",
  },
];

export default queueData;