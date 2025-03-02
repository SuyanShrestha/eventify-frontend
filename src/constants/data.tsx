export const Gallery = {
  path: "gallery/",
  img: [
    { imgSrc: "1.jpg", imgAlt: "Wedding", imgTitle: "Wedding" },
    { imgSrc: "2.jpg", imgAlt: "Concert", imgTitle: "Concert" },
    {
      imgSrc: "3.jpg",
      imgAlt: "Destination Parties",
      imgTitle: "Destination Parties",
    },
  ],
};

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
    venue: "Kathmandu Convention Hall",
    imgSrc: "/gallery/1.jpg",
    attendees: [
      { attendeeId: "user_1", isCheckedIn: false },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
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
    eventType: "remote",
    venue: "Google Meet",
    imgSrc: "/gallery/2.jpg",
    attendees: [
      { attendeeId: "user_1", isCheckedIn: false },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
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
    eventType: "remote",
    venue: "Google Meet",
    imgSrc: "/gallery/3.jpg",
    attendees: [
      { attendeeId: "user_1", isCheckedIn: false },
      { attendeeId: "user_2", isCheckedIn: true },
      { attendeeId: "org_3", isCheckedIn: false },
    ],
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
    eventType: "physical",
    venue: "Tundikhel Grounds, Kathmandu",
    imgSrc: "/gallery/DummyImage2.jpg",
    attendees: [],
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
    venue: "Google Meet",
    imgSrc: "/gallery/DummyConcert.png",
    attendees: [],
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
    eventType: "physical",
    venue: "Art & Creativity Center, Lalitpur",
    imgSrc: "/gallery/1.jpg",
    attendees: [],
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
    eventType: "physical",
    venue: "Nagarkot Hill Resort",
    imgSrc: "/gallery/2.jpg",
    attendees: [],
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
    eventType: "remote",
    venue: "Google Meet",
    imgSrc: "/gallery/3.jpg",
    attendees: [],
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
  {
    bookingId: "b4",
    eventId: 4,
    userId: "org_1",
    bookingCreated: "June 02 2025 16:20:00 GMT+0545 (Nepal Time)",
  },
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
