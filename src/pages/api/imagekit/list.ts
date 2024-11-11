import type { NextApiRequest, NextApiResponse } from "next";
import { DEMO_FILE_LIST } from "@/data/demo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(DEMO_FILE_LIST);
}
