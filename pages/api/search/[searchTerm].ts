import type { NextApiRequest, NextApiResponse } from "next";
import { searchPostsQuery } from "../../../utils/queries";
import { allUsersQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";
import { resolve } from "path";
import Search from '../../search/[searchTerm]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    const videosQuery = searchPostsQuery(searchTerm);
    const videos = await client.fetch(videosQuery);
    res.status(200).json(videos);
  }
}

