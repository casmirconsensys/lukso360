// pages/api/user-data.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, walletAddress, safeAddress } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const collection = db.collection('userData');

    // Insert user data into MongoDB
    await collection.insertOne({ name, walletAddress, safeAddress });

    client.close();

    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
