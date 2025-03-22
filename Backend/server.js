import 'dotenv/config';
import express from 'express';
import app from './src/app.js';
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});