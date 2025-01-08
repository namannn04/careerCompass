const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Ensure the Firebase Admin SDK is properly configured
  databaseURL: 'https://careercompass-dab7f.firebaseio.com',
});

const db = admin.firestore();

// API routes to fetch data from Firestore
app.get('/api/careers', async (req, res) => {
  try {
    const snapshot = await db.collection('careers').get();
    const careers = snapshot.docs.map(doc => doc.data());
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/careers/:careerName', async (req, res) => {
  const { careerName } = req.params;
  try {
    const doc = await db.collection('careers').doc(careerName).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/careers/:careerName/path', async (req, res) => {
  const { careerName } = req.params;
  try {
    const doc = await db.collection('careers').doc(careerName).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(doc.data().careerPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
