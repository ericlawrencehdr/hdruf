import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { listBucket } from '@/src/util/aws'

type Data = {
  data?: any,
  error?: string
}


// Load config from AWS
const mockData = {
  models: [
    {
      name: 'U Florida Biomed Life Science Building',
      id: 'uf_biomed',
      modelUrl: '/assets/models/UF_Biomed.gltf',
      dataUrl: '/assets/data/UF_Biomed.json',
      offset: {x: 0, y: 0, z: 0},
      default: true
    },
    {
      name: 'Lightweight Model',
      id: 'lightweight_model',
      modelUrl: '/assets/models/toyota_4runner_mk4_stock.glb',
      dataUrl: '/assets/data/toyota_data.json',
      offset: {x: 0, y: 0, z: 0},
      default: true
    }
  ]
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session = await getServerSession(req, res, authOptions)
  let buckets = await listBucket()
  
  if (req.body.mockData) {
    return res.status(200).json({ data: mockData })
  }

  if (!session) {
    return res.status(401).json({error: 'You must log in to view this content'})
  }

  return res.status(200).json({ data: mockData })

  let data = {}
  // Load config from aws

  return res.status(200).json({ data })
}
