import type { NextApiRequest, NextApiResponse } from "next";
import { DEMO_FILE_LIST } from "@/data/demo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileId = req.query.id as string;

  if (!fileId) {
    return res.status(400).json({ error: "Missing fileId" });
  }

  const file = DEMO_FILE_LIST.find((file) => file.id === fileId);

  res.status(200).json(file);
}
