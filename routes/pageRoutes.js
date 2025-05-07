// routes/pageRoutes.js

const express = require('express');
const router = express.Router();

// In-memory data storage
const teamInfo = [
    {
        name: "John Doe",
        role: "Team Lead",
        bio: "Experienced developer with a passion for community building"
    },
    {
        name: "Jane Smith",
        role: "Backend Developer",
        bio: "Specializes in Node.js and database management"
    },
    {
        name: "Mike Johnson",
        role: "Frontend Developer",
        bio: "Expert in modern web technologies and UI/UX"
    },
    {
        name: "Sarah Williams",
        role: "Data Manager",
        bio: "Data enthusiast with strong analytical skills"
    }
];

const events = [
    {
        title: "Community Meetup",
        date: "2024-05-15",
        location: "Main Hall",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        description: "Join us for our monthly community gathering"
    },
    {
        title: "Community Meetup",
        date: "2025-05-15",
        location: "Main Hall",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        description: "Join us for our monthly community gathering"
    },
    {
        title: "Tech Workshop",
        date: "2025-05-20",
        location: "Conference Room",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
        description: "Learn about the latest web technologies"
    },
    {
        title: "Networking Event",
        date: "2025-05-25",
        location: "Community Center",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        description: "Connect with fellow community members"
    }
];

// Store contact form submissions
const contactSubmissions = [];

// Routes
router.get('/', (req, res) => {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0,0,0,0);
    // Filter and sort upcoming events
    const upcoming = events
        .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0,0,0,0);
            return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    res.render('pages/home', { 
        title: 'Home',
        upcomingEvents: upcoming
    });
});

router.get('/about', (req, res) => {
    res.render('pages/about', { 
        title: 'About Us',
        teamInfo: teamInfo
    });
});

router.get('/events', (req, res) => {
    const { search, filter } = req.query;
    let filteredEvents = [...events];

    // Apply search filter if search term is provided
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    }

    // Apply date filter if specified
    if (filter) {
        const today = new Date();
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            if (filter === 'upcoming') {
                return eventDate >= today;
            } else if (filter === 'past') {
                return eventDate < today;
            }
            return true;
        });
    }

    // Sort events by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.render('pages/events', { 
        title: 'Events',
        events: filteredEvents,
        search: search || '',
        filter: filter || ''
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', { 
        title: 'Contact Us'
    });
});

router.post('/contact', express.urlencoded({ extended: true }), (req, res) => {
    const { name, email, message } = req.body;
    contactSubmissions.push({ name, email, message, date: new Date() });
    res.redirect('/thankyou');
});

router.get('/thankyou', (req, res) => {
    res.render('pages/thankyou', { 
        title: 'Thank You'
    });
});

module.exports = router;
