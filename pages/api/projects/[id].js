// pages/api/projects/[id].js
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('portfolio');
  const collection = db.collection('projects');

  switch (req.method) {
    case 'GET':
      try {
        const project = await collection.findOne({ _id: new ObjectId(id) });
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updateDoc = { $set: req.body };
        const result = await collection.updateOne({ _id: new ObjectId(id) }, updateDoc);
        if (result.modifiedCount === 0) {
          return res.status(404).json({ success: false, message: 'Project not found or no changes made' });
        }
        // Optionally, fetch the updated document
        const updatedProject = await collection.findOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true, data: updatedProject });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
      break;
  }
}
