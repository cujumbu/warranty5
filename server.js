import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Database setup
let db;

function setupDatabase() {
  db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log('Database opened successfully');
      db.run(`
        CREATE TABLE IF NOT EXISTS claims (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT,
          name TEXT,
          phoneNumber TEXT,
          orderNumber TEXT,
          returnAddress TEXT,
          brand TEXT,
          problem TEXT,
          claimNumber TEXT UNIQUE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table', err);
        } else {
          console.log('Claims table created successfully');
        }
      });
    }
  });
}

setupDatabase();

// API routes
app.post('/api/claims', (req, res) => {
  const { email, name, phoneNumber, orderNumber, returnAddress, brand, problem } = req.body;
  const claimNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  const query = `INSERT INTO claims (email, name, phoneNumber, orderNumber, returnAddress, brand, problem, claimNumber)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [email, name, phoneNumber, orderNumber, returnAddress, brand, problem, claimNumber], function(err) {
    if (err) {
      console.error('Error inserting claim', err);
      res.status(500).json({ error: 'Failed to submit claim' });
    } else {
      res.json({ claimNumber });
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});