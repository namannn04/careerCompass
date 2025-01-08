const { MongoClient } = require('mongodb');
const admin = require('firebase-admin');
const serviceAccount = require('./cc.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function migrateData() {
  const mongoUri = 'mongodb://localhost:27017/careersDB';
  const client = new MongoClient(mongoUri);

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db();
    const collection = database.collection('careers');

    // Get all careers from MongoDB
    const careers = await collection.find({}).toArray();

    // Migrate each career to Firestore
    for (const career of careers) {
      const { _id, ...careerData } = career;
      // Using Firestore Admin SDK to set data in 'careers' collection
      await db.collection('careers').doc(_id.toString()).set(careerData);
      console.log(`Migrated career: ${career.title || _id}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.close();
  }
}

migrateData();
