// pages/api/projects/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('portfolio'); // Change the DB name as needed
  const collection = db.collection('projects');

  switch (req.method) {
    case 'GET':
      try {
        const projects = await collection.find({}).toArray();
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const project = req.body;
        const result = await collection.insertOne(project);
        // Append the inserted ID to the project data
        project._id = result.insertedId;
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
      break;
  }
}
