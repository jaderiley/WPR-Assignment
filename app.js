const express = require('express');
const path = require('path');
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the dist directory
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

//routes
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 


 
