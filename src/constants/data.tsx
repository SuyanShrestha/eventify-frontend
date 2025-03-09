//  Static data

export const Gallery = {
  path: "gallery/",
  img: [
    { imgSrc: "1.jpg", imgAlt: "TedX", imgTitle: "TedX" },
    { imgSrc: "2.jpg", imgAlt: "Crocheting", imgTitle: "Crocheting" },
    {
      imgSrc: "3.jpg",
      imgAlt: "Exhibition",
      imgTitle: "Exhibition",
    },
  ],
};

export const testimonials = [
  {
    id: 1,
    content:
      "This platform completely transformed how we organize our annual conference. The interface is intuitive, and the support team is always ready to help with any questions we had.",
    author: "Shristi Shrestha",
    position: "Event Director, TechSummit",
    avatar: "/people/shristi.jpg",
  },
  {
    id: 2,
    content:
      "As an attendee, I've discovered some amazing events through this platform that I would have otherwise missed. The recommendation system really understands my interests!",
    author: "Bishesh Maharjan",
    position: "Software Engineer",
    avatar: "/people/bishesh.jpg",
  },
  {
    id: 3,
    content:
      "We've seen a 40% increase in ticket sales since moving our events to this platform. The analytics tools have been invaluable for understanding our audience better.",
    author: "Prekshya Dali",
    position: "Marketing Manager, Mandala Events",
    avatar: "/people/prekshya.jpg",
  },
];

//  Dummy data to be replaced after API

export const eventsData = [
  {
    id: 1,
    organizerId: "org_2",
    title: "Tech Conference 2025",
    subtitle: "Innovations in AI and Blockchain",
    startDate: "March 15 2025 10:00:00 GMT+0545 (Nepal Time)",
    endDate: "March 15 2025 18:00:00 GMT+0545 (Nepal Time)",
    details: `
  ## Event Overview
  Join us for the Tech Conference 2025, an exclusive event that brings together the brightest minds in the fields of **Artificial Intelligence**, **Blockchain**, and **Cybersecurity**. This year's theme, *Innovations in AI and Blockchain*, focuses on how these technologies are reshaping industries and transforming the world. 

  ## Speakers & Sessions
  The conference will feature renowned keynote speakers who are pioneers in their fields, including:
  - **Dr. Jane Doe**, AI Specialist at GlobalTech Inc.
  - **John Smith**, Blockchain Expert at BlockChainX
  - **Sarah Lee**, Cybersecurity Researcher at SecuTech

  Additionally, we'll have a range of thought-provoking **panel discussions**, **workshops**, and **breakout sessions** to dive deeper into topics such as:
  - The future of AI in healthcare and finance
  - Blockchain’s impact on supply chain management
  - Building secure and scalable systems in the age of cyber threats

  ## Networking Opportunities
  Connect with like-minded professionals, researchers, and industry leaders. Attendees will have the chance to interact during coffee breaks, networking lunches, and a **VIP evening mixer**. This is a great opportunity to expand your network and discover potential collaborations.

  ## Event Details
  - **Date**: March 15, 2025
  - **Time**: 10:00 AM to 6:00 PM (Nepal Time)
  - **Venue**: Kathmandu Convention Hall, Kathmandu, Nepal

  ## Tickets
  Early bird tickets are now available for **$199.99**. Don't miss out on this opportunity to be part of one of the most anticipated tech events of the year! Secure your spot today!

  **Note**: Limited seats available, so be sure to register early!

  ## Contact
  For more information, please contact our event team at: [contact@techglobal.com](mailto:contact@techglobal.com).

  **Follow us on social media for updates**:  
  - Twitter: [@TechGlobal](https://twitter.com/TechGlobal)  
  - Facebook: [Tech Global](https://facebook.com/TechGlobal)
  `,
    ticketPrice: 199.99,
    eventType: "physical",
    eventCategoryId: "c1",
    venue: "Kathmandu Convention Hall",
    imgSrc: "/gallery/1.jpg",
    isSaved: true,
    attendees: [
      { attendeeId: "user_1", isCheckedIn: true },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
    ],
    feedbacks: [
      {
        feedbackId: "f1",
        userId: "user_1",
        username: "Lionel Mausi",
        feedbackContent: "Great event! Learned a lot about scaling startups.",
      },
      {
        feedbackId: "f2",
        userId: "user_1",
        username: "Lionel Mausi",
        feedbackContent:
          "Also made some valuable connections with other entrepreneurs.",
      },
      {
        feedbackId: "f3",
        userId: "org_3",
        username: "Tech Conference Host",
        feedbackContent: "Looking forward to next summit!",
      },
    ],
  },
  {
    id: 2,
    organizerId: "org_1",
    title: "Entrepreneurs Summit",
    subtitle: "Scaling Startups Successfully",
    startDate: "March 01 2025 17:00:00 GMT+0545 (Nepal Time)",
    endDate: "April 10 2025 20:00:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "March 31 2025 23:59:59 GMT+0545 (Nepal Time)",
    details: "The Entrepreneurship Summit brings together entrepreneurs...",
    ticketPrice: 99.99,
    availableTickets: 100,
    eventType: "remote",
    eventCategoryId: "c2",
    venue: "Google Meet",
    imgSrc: "/gallery/2.jpg",
    isSaved: false,
    attendees: [
      { attendeeId: "user_1", isCheckedIn: false },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
    ],
    feedbacks: [
      {
        feedbackId: "f4",
        userId: "user_2",
        username: "Lionel Mausi",
        feedbackContent: "Great event! Learned a lot about scaling startups.",
      },
      {
        feedbackId: "f5",
        userId: "user_2",
        username: "Lionel Mausi",
        feedbackContent:
          "Also made some valuable connections with other entrepreneurs.",
      },
      {
        feedbackId: "f6",
        userId: "org_3",
        username: "Tech Conference Host",
        feedbackContent: "Looking forward to next summit!",
      },
    ],
  },
  {
    id: 3,
    organizerId: "org_2",
    title: "Digital Marketing Workshop",
    subtitle: "Master SEO & Social Media Strategies in Nepal",
    startDate: "March 02 2025 14:00:00 GMT+0545 (Nepal Time)",
    endDate: "May 5 2025 16:00:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "April 25 2025 23:59:59 GMT+0545 (Nepal Time)",
    details:
      "This hands-on workshop covers the essentials of digital marketing...",
    ticketPrice: 49.99,
    availableTickets: 150,
    eventType: "remote",
    eventCategoryId: "c2",
    venue: "Google Meet",
    imgSrc: "/gallery/3.jpg",
    isSaved: true,
    attendees: [
      { attendeeId: "user_1", isCheckedIn: false },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
    ],
    feedbacks: [],
  },
  {
    id: 4,
    organizerId: "org_2",
    title: "Music Festival 2025",
    subtitle: "A Celebration of Sound",
    startDate: "March 01 2025 12:00:00 GMT+0545 (Nepal Time)",
    endDate: "June 20 2025 23:00:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "June 15 2025 23:59:59 GMT+0545 (Nepal Time)",
    details: "Experience an unforgettable day filled with live performances...",
    ticketPrice: 29.99,
    availableTickets: 100,
    eventType: "physical",
    eventCategoryId: "c4",
    venue: "Tundikhel Grounds, Kathmandu",
    imgSrc: "/gallery/DummyImage2.jpg",
    isSaved: true,
    attendees: [],
    feedbacks: [],
  },
  {
    id: 5,
    organizerId: "org_2",
    title: "Cybersecurity Awareness Seminar",
    subtitle: "Protect Yourself Online",
    startDate: "March 6 2025 10:30:00 GMT+0545 (Nepal Time)",
    endDate: "March 12 2025 12:30:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "July 1 2025 23:59:59 GMT+0545 (Nepal Time)",
    details:
      "This seminar is designed to educate individuals and businesses...",
    ticketPrice: 0,
    eventType: "remote",
    eventCategoryId: "c1",
    venue: "Google Meet",
    imgSrc: "/gallery/DummyConcert.png",
    isSaved: false,
    attendees: [],
    feedbacks: [],
  },
  {
    id: 6,
    organizerId: "org_1",
    title: "Photography Masterclass",
    subtitle: "Capture the Perfect Shot",
    startDate: "August 15 2024 09:00:00 GMT+0545 (Nepal Time)",
    endDate: "August 15 2024 15:00:00 GMT+0545 (Nepal Time)",
    details: "Join a professional photographer in this hands-on masterclass...",
    ticketPrice: 79.99,
    availableTickets: 100,
    eventType: "physical",
    eventCategoryId: "c3",
    venue: "Art & Creativity Center, Lalitpur",
    imgSrc: "/gallery/1.jpg",
    isSaved: false,
    attendees: [],
    feedbacks: [],
  },
  {
    id: 7,
    organizerId: "org_1",
    title: "Yoga & Wellness Retreat",
    subtitle: "Find Your Inner Peace",
    startDate: "September 5 2024 07:00:00 GMT+0545 (Nepal Time)",
    endDate: "September 5 2024 19:00:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "August 31 2024 23:59:59 GMT+0545 (Nepal Time)",
    details:
      "A full-day retreat dedicated to physical, mental, and spiritual well-being...",
    ticketPrice: 49.99,
    availableTickets: 1020,
    eventType: "physical",
    eventCategoryId: "c5",
    venue: "Nagarkot Hill Resort",
    imgSrc: "/gallery/2.jpg",
    isSaved: false,
    attendees: [],
    feedbacks: [],
  },
  {
    id: 8,
    organizerId: "org_1",
    title: "Blockchain & Crypto Conference",
    subtitle: "Understanding Decentralized Finance",
    startDate: "October 22 2025 13:00:00 GMT+0545 (Nepal Time)",
    endDate: "October 22 2025 17:00:00 GMT+0545 (Nepal Time)",
    bookingDeadline: "October 15 2025 23:59:59 GMT+0545 (Nepal Time)",
    details: "Industry leaders and blockchain enthusiasts gather to discuss...",
    ticketPrice: 149.99,
    availableTickets: 100,
    eventType: "remote",
    eventCategoryId: "c3",
    venue: "Google Meet",
    imgSrc: "/gallery/3.jpg",
    isSaved: false,
    attendees: [],
    feedbacks: [],
  },
];

export const usersData = [
  {
    id: "org_1",
    username: "Event Master",
    password: "securePass123",
    role: "organizer",
  },
  {
    id: "org_2",
    username: "Food Festival Team",
    password: "tastyTreats@2024",
    role: "organizer",
  },
  {
    id: "user_1",
    username: "Suyan Shrestha",
    password: "admin789",
    role: "user",
  },
  {
    id: "user_2",
    username: "Lionel Mausi",
    password: "giga456",
    role: "user",
  },
  {
    id: "org_3",
    username: "Tech Conference Host",
    password: "techInnovate2025",
    role: "organizer",
  },
];

export const bookingsData = [
  {
    bookingId: "b1",
    eventId: 1,
    userId: "org_1",
    bookingCreated: "February 25 2025 10:30:00 GMT+0545 (Nepal Time)",
  },
  {
    bookingId: "b2",
    eventId: 3,
    userId: "org_1",
    bookingCreated: "March 26 2025 12:15:00 GMT+0545 (Nepal Time)",
  },
  {
    bookingId: "b3",
    eventId: 5,
    userId: "org_1",
    bookingCreated: "January 27 2025 14:45:00 GMT+0545 (Nepal Time)",
  },
  // {
  //   bookingId: "b4",
  //   eventId: 4,
  //   userId: "org_1",
  //   bookingCreated: "June 02 2025 16:20:00 GMT+0545 (Nepal Time)",
  // },
  {
    bookingId: "b5",
    eventId: 2,
    userId: "user_1",
    bookingCreated: "March 29 2025 18:00:00 GMT+0545 (Nepal Time)",
  },
  {
    bookingId: "b6",
    eventId: 4,
    userId: "user_2",
    bookingCreated: "June 01 2025 09:30:00 GMT+0545 (Nepal Time)",
  },
  {
    bookingId: "b7",
    eventId: 6,
    userId: "org_2",
    bookingCreated: "June 02 2024 11:10:00 GMT+0545 (Nepal Time)",
  },
];

export const categoriesData = [
  { id: "c1", name: "Educational" },
  { id: "c2", name: "Career" },
  { id: "c3", name: "Exhibition" },
  { id: "c4", name: "Entertainment" },
  { id: "c5", name: "Traditional" },
  { id: "c6", name: "Others" },
];

export const notificationsData = [
  {
    id: 1,
    event: 1,
    message: "Your event 'Annual Meetup' has been updated with new details.",
    is_read: false,
    created_at: "2025-03-09T08:00:00Z",
  },
  {
    id: 2,
    event: 3,
    message: "Reminder: 'Tech Expo 2025' is starting in 2 days.",
    is_read: true,
    created_at: "2025-03-08T14:45:00Z",
  },
  {
    id: 3,
    event: 5,
    message: "Your RSVP for 'Startup Pitch Night' has been confirmed.",
    is_read: false,
    created_at: "2025-03-08T18:20:00Z",
  },
  {
    id: 4,
    event: 4,
    message: "The location for 'AI & Machine Learning Conference' has changed.",
    is_read: true,
    created_at: "2025-03-07T10:10:00Z",
  },
  {
    id: 5,
    event: 2,
    message: "'Web Development Bootcamp' is now live!",
    is_read: false,
    created_at: "2025-03-09T09:30:00Z",
  },
  {
    id: 6,
    event: 1,
    message: "Reminder: 'Annual Meetup' starts tomorrow at 10 AM.",
    is_read: false,
    created_at: "2025-03-08T22:00:00Z",
  },
  {
    id: 7,
    event: 3,
    message: "'Tech Expo 2025' has a new guest speaker lineup announced!",
    is_read: true,
    created_at: "2025-03-07T16:30:00Z",
  },
  {
    id: 8,
    event: 5,
    message: "Your seat for 'Startup Pitch Night' has been reserved.",
    is_read: false,
    created_at: "2025-03-09T06:15:00Z",
  },
  {
    id: 9,
    event: 4,
    message: "'AI & Machine Learning Conference' will begin in 1 hour.",
    is_read: false,
    created_at: "2025-03-09T11:00:00Z",
  },
  {
    id: 10,
    event: 2,
    message: "New schedule added to 'Web Development Bootcamp'.",
    is_read: true,
    created_at: "2025-03-08T19:40:00Z",
  },
];
