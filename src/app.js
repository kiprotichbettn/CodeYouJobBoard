const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job'); //  Import external Job model

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Parse JSON bodies for POST requests
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ✅ Serve static files from root folder
app.use(express.static(path.join(__dirname, '..')));

// ✅ Serve main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ✅ API route to get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('❌ Error fetching jobs:', error.message);
    res.status(500).json({ error: 'Error fetching jobs from MongoDB' });
  }
});

// ✅ API route to add a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('❌ Error saving job:', error.message);
    res.status(400).json({ error: 'Error saving job to MongoDB' });
  }
});


// API endpoint for Google Sheets
/* app.get('/api/sheet', async (req, res) => {
  const spreadsheetId = process.env.XLSX_ID;
  const API_KEY = process.env.Google_API_KEY;

  console.log('Using API Key:', API_KEY ? 'Found' : 'Missing');
  console.log('Using Spreadsheet ID:', spreadsheetId ? 'Found' : 'Missing');

  // Dynamic range for the Sheets API. Currently, A:I are the in-use columns
  const range = encodeURIComponent(req.query.range || 'JobBoard!A:I');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?majorDimension=COLUMNS&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Google Sheets API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching Google Sheet' });
  }
}); */

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});