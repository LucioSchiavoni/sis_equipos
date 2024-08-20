import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from './actions/auth-actions';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { username, password, name } = req.body;
    try {
        console.log(username, password, name)
      const user = await createUser(username, password, name);
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(400).json({ success: false, message: 'User already exists' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
