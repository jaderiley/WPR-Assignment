// routes/pageRoutes.js

const express = require('express');
const router = express.Router();

// Data
const events = [
  { title: "Pac-man's Prejudice", date: '2025/05/25', location: 'Online', image: '/images/HighScoreEvent.png' },
  { title: 'LAN Legends', date: '2025/06/05', location: 'Smart City', image: '/images/LanEvent.png' },
  { title: 'Cosplay & Cartridges', date: '2025/06/17', location: 'Belgium Campus, Preotia', image: '/images/Cos&Cart.png' },
  { title: 'Just Dance Retro Remix', date: '2025/07/02', location: 'Smart City', image: '/images/RetroRemix.png' },
  { title: "Cartridge Collector's Fest", date: '2025/07/15', location: 'Sports Field', image: '/images/raw.png' },
  { title: 'Throwback Thrusday', date: '2025/08/01', location: 'All Belgium Campuses', image: '/images/Arcade.png' }
];

const team = [
  { name: 'Jason Maracha Bond', role: 'Team Lead', game: 'Donkey Kong', icon: '/images/icons/Pacman.png' },
  { name: 'Erik Knoetze', role: 'Frontend Dev', game: 'Pac-Man', icon: '/images/icons/Ghost1.png' },
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
