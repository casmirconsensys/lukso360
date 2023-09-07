// pages/api/connect.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, walletAddress } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db();

      const collection = db.collection('users'); // Use a collection named 'users'

      // Check if user already exists based on wallet address
      const existingUser = await collection.findOne({ walletAddress });
      if (!existingUser) {
        await collection.insertOne({ name, walletAddress });
      }

      res.status(201).json({ message: 'User data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
  } else if (req.method === 'GET') {
    const { walletAddress } = req.query;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db();

      const collection = db.collection('users');

      const user = await collection.findOne({ walletAddress });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
