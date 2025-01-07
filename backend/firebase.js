import { MongoClient } from 'mongodb';
import admin from 'firebase-admin';
import serviceAccount from './cc.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateData() {
  const mongoUri = 'mongodb://localhost:27017/careersDB';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('careers');

    const careers = await collection.find({}).toArray();

    for (const career of careers) {
      const { _id, ...careerData } = career;
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
