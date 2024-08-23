// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincodes from '@/data/pincodes'
export default function handler(req, res) {
    res.status(200).json(pincodes);
  }
  