// routes/pageRoutes.js

const express = require('express');
const router = express.Router();

// Data
const events = [
  { title: "Cartridge Collector's Fest", date: '2025-05-25', location: 'Sports Field', image: '/images/raw.png', description: 'Celebrate cartridge collecting!' },
  { title: 'LAN Legends', date: '2025-06-05', location: 'Smart City', image: '/images/LanEvent.png', description: 'LAN party extravaganza!' },
  { title: 'Cosplay & Cartridges', date: '2025-06-17', location: 'Belgium Campus, Pretoria', image: '/images/Cos&Cart.png', description: 'Cosplay and retro gaming fun!' },
  { title: 'Just Dance Retro Remix', date: '2025-07-02', location: 'Smart City', image: '/images/RetroRemix.png', description: 'Dance to retro beats!' },
  { title: "Pac-man's Prejudice", date: '2025-07-15', location: 'Online', image: '/images/HighScoreEvent.png', description: 'Join us for a high-score challenge!' },
  { title: 'Throwback Thursday', date: '2025-08-01', location: 'All Belgium Campuses', image: '/images/Arcade.png', description: 'Relive arcade classics!' }
];

const team = [
  { name: 'Jason Maracha Bond', role: 'Team Lead', game: 'Donkey Kong', icon: '/images/icons/Pacman.png' },
  { name: 'Erick Knoetze', role: 'Frontend Dev', game: 'Pac-Man', icon: '/images/icons/Ghost1.png' },
  { name: 'Jade Riley', role: 'Backend Dev', game: 'Galaga', icon: '/images/icons/Ghost2.png' },
  { name: 'Shiva Ganesh', role: 'Data Manager', game: 'Snake', icon: '/images/icons/Ghost3.png' }
];

const gameQuotes = [
  "It's dangerous to go alone! Take this.",
  "All your base are belong to us.",
  "Do a barrel roll!",
  "The cake is a lie.",
  "Would you kindly?",
  "War. War never changes."
];

// Store contact submissions in memory
const contactSubmissions = [];
const registrations = {};

// Home page
router.get('/', (req, res) => {
  const now = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  res.render('pages/home', {
    upcomingEvents,
    nextEvent: upcomingEvents[0],
    registrations
  });
});


// About page
router.get('/about', (req, res) => {
  res.render('pages/about', { team });
});

// Events page
router.get('/events', (req, res) => {
  res.render('pages/events', { events });
});


// Registration page
router.get('/register/:title', (req, res) => {
  const event = events.find(e => e.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') === req.params.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'));
  if (event) {
    res.render('pages/register', { event });
  } else {
    res.status(404).send('Event not found');
  }
});

// Handle registration submission
router.post('/register/:title', express.json(), (req, res) => {
  const event = events.find(e =>
    e.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') ===
    req.params.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
  );

  if (!event) return res.status(404).send('Event not found');
  console.log('BODY:', req.body);
  const { registration } = req.body;
  const { name, email } = registration;

  if (!registrations[event.title]) {
    registrations[event.title] = [];
  }

  registrations[event.title].push({
    name,
    email,
    timestamp: new Date()
  });

  return res.status(200).json({ success: true });
});

router.get('/registration-complete', (req, res) => {
  const { eventName, eventDate, eventLocation } = req.query;
  const quote = gameQuotes[Math.floor(Math.random() * gameQuotes.length)];
  
  // Get registrations only for this specific event
  const eventRegistrations = registrations[eventName] || [];
  
  // Get the most recent registration (the one that just happened)
  const latestRegistration = eventRegistrations[eventRegistrations.length - 1];

  res.render('pages/registration-complete', {
    quote,
    event: {
      name: eventName,
      date: eventDate,
      location: eventLocation
    },
    registrations: eventRegistrations,
    latestRegistration // Pass the latest registration separately
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

// Handle contact form submission
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  contactSubmissions.push({ name, email, message, timestamp: new Date() });
  res.redirect('/thankyou');
});

// Thank you page
router.get('/thankyou', (req, res) => {
  const randomQuote = gameQuotes[
    Math.floor(Math.random() * gameQuotes.length)
  ];
  const lastSubmission = contactSubmissions[contactSubmissions.length - 1];
  res.render('pages/thankyou', { quote: randomQuote, submission: lastSubmission });
});

module.exports = router;