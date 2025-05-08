// routes/pageRoutes.js

const express = require('express');
const router = express.Router();

// Data
const events = [
  { title: 'High Score Showdown', date: '2025-05-25', location: 'Online', image: '/images/HighScoreEvent.png' },
  { title: 'LAN Legends', date: '2025-06-05', location: 'Pixelverse HQ', image: '/images/LanEvent.png' },
  { title: 'Cosplay & Cartridges', date: '2025-06-17', location: 'RetroCon', image: '/images/Cos&Cart.png' },
  { title: 'Retro Remix', date: '2025-07-02', location: 'Virtual Dance Arena', image: '/images/RetroRemix.png' },
  { title: "Cartridge Collector's Fest", date: '2025-07-15', location: 'Johannesburg', image: '/images/raw.png' },
  { title: 'Arcade Night Throwback', date: '2025-08-01', location: 'Pixel Bar', image: '/images/Arcade.png' }
];

const team = [
  { name: 'Erick', role: 'Team Lead', game: 'Donkey Kong', icon: '/images/icons/Pacman.png' },
  { name: 'Zane', role: 'Frontend Dev', game: 'Pac-Man', icon: '/images/icons/Ghost1.png' },
  { name: 'Mel', role: 'Backend Dev', game: 'Galaga', icon: '/images/icons/Ghost2.png' },
  { name: 'Tumi', role: 'Data Manager', game: 'Tetris', icon: '/images/icons/Ghost3.png' }
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

// Home page
router.get('/', (req, res) => {
  // Get next 3 upcoming events
  const now = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  
  res.render('pages/home', { 
    upcomingEvents,
    nextEvent: upcomingEvents[0]
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
  res.render('pages/thankyou', { quote: randomQuote });
});

module.exports = router;
