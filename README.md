# Community Portal Website

A dynamic community portal website built with Node.js, Express, and EJS.

## 🚀 Technologies Used

- Node.js (v18+)
- Express.js (v4+)
- EJS (v3+)
- Bootstrap 5
- Git & GitHub
- Nodemon (for development)

## 👥 Team Members and Roles

- Team Lead: John Doe
- Backend Developer: Jane Smith
- Frontend Developer: Mike Johnson
- Data Manager: Sarah Williams

## 🛠 Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd community-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
community-portal/
├── public/
│   ├── css/
│   │   └── style.css
│   └── images/
├── routes/
│   └── pageRoutes.js
├── views/
│   ├── pages/
│   │   ├── home.ejs
│   │   ├── about.ejs
│   │   ├── events.ejs
│   │   ├── contact.ejs
│   │   └── thankyou.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── app.js
├── package.json
└── README.md
```

## 🎯 Features

- Dynamic page rendering with EJS templates
- Responsive design using Bootstrap 5
- Contact form with in-memory storage
- Events display with images and details
- Team information page
- Clean and modern UI

## 📝 Notes

- The contact form submissions are stored in memory and will be cleared when the server restarts
- Event images should be placed in the `public/images` directory
- The website is fully responsive and works on all modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
