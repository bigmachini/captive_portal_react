import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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