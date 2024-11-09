const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb://localhost:27017/careersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});

const careerSchema = new mongoose.Schema({
  careerName: String,
  skillsRequired: [String],
  resources: {
    online: [String],
    offline: [String],
  },
  careerPath: [
    {
      level: String,
      options: [String],
    },
  ],
});



const Career = mongoose.model('Career', careerSchema);

app.get('/api/careers', async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/careers/:careerName', async (req, res) => {
  const { careerName } = req.params;
  try {
    const career = await Career.findOne({ careerName: careerName });
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/careers/:careerName/path', async (req, res) => {
  const { careerName } = req.params;
  try {
    const career = await Career.findOne({ careerName: careerName }, 'careerPath');
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career.careerPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));