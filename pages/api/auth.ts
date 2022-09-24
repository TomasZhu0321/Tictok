import type { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from './../../utils/queries';
import { client } from '../../utils/client';
import { resolve } from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method ==='POST'){
    const user = req.body;
    client.createIfNotExists(user).then(() => {
    res.status(200).json('Login successful');
  }); 
}
}