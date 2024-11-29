import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form data
app.post('/handle-form', (req, res) => {

  const { mac, ip, username, error } = req.body;
  const link_login = req.body['link-login'];
  const link_login_only = req.body['link-login-only'];
  const link_orig = req.body['link-orig'];

  const queryParams = new URLSearchParams({ mac, ip, username, link_login, link_login_only, link_orig, error }).toString();
  const url_string = `https://hotspot.kredoh.co.ke/?${queryParams}`
  console.log(`Server is calling ${url_string}`);
  res.redirect(url_string);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});