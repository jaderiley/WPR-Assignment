const express = require('express');
const router = express.Router();

// In-memory storage
const aboutTeam = [
    { name: 'Jason', role: 'Team Lead, Documentation manager' },
    { name: 'Jade', role: 'Backend Developer' },
    { name: 'Erick', role: 'Data manager' },
    { name: 'Shiva', role: 'Frontend Developer' }
        

];
//adding events
const events = [
    { title: 'example', date: '2025-05-10', location: '88 wet street', image: '/images/example.jpg' }
];

let messages = [];

// Routes
router.get('/', (req, res) => res.render('home', { events }));
router.get('/about', (req, res) => res.render('about', { aboutTeam }));
router.get('/events', (req, res) => res.render('events', { events }));
router.get('/contact', (req, res) => res.render('contact'));
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    messages.push({ name, email, message });
    res.redirect('/thank-you');
});
router.get('/thank-you', (req, res) => res.render('thank-you'));

module.exports = router;
