// mongoTest.js
require('dotenv').config();
const mongoose = require('mongoose');

// 1️⃣ Connect to your MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ Connection failed:', err));

// 2️⃣ Define a simple schema + model
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  datePosted: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// 3️⃣ Insert one test record
async function runTest() {
  try {
    const newJob = await Job.create({
      title: 'Backend Developer',
      company: 'CodeYou',
      location: 'Remote'
    });
    console.log('✅ Test job added:', newJob);

    // 4️⃣ Fetch and display all jobs
    const allJobs = await Job.find();
    console.log('📋 Current jobs in DB:', allJobs);

  } catch (err) {
    console.error('⚠️ Error during test:', err);
  } finally {
    mongoose.connection.close();
  }
}

runTest();
