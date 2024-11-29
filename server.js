const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint to handle form data
app.post('/handle-form', (req, res) => {
  const { mac, ip, username, link_login, link_login_only, link_orig, error } = req.body;
  const queryParams = new URLSearchParams({ mac, ip, username, link_login, link_login_only, link_orig, error }).toString();
  res.redirect(`/?${queryParams}`);
});

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});