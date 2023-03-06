import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

type Data = {
  data?: any,
  error?: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({error: 'You must log in to view this content'})
  }

  const data = {
    models: [
      {
        name: 'Trap and Transport Facility at Gorge Powerhouse ',
        id: 'gorge_powerhouse_a',
        url: '/models/GorgePowerhouse6.glTF',
        offset: {x: 15, y: -5.5, z: -5},
      },

      {
        name: 'Trap and Transport Facility at Gorge Dam',
        id: 'gorge_dam',
        url: '/models/GorgeDam.glTF',
        offset: {x: 14, y: -8, z: 0},
        rotation: {y: Math.PI/7},
      },

      {
        name: 'Floating Screen Structure at Diablo Dam',
        id: 'diablo_dam',
        url: '/models/DiabloDam.glTF',
        offset: {x: -9, y: 2.2, z: -4.8},
        rotation: {y: Math.PI/2},
      },

      {
        name: 'Floating Surface Collector in Ross Dam Forebay',
        id: 'ross_dam',
        url: '/models/RossDam.glTF',
        offset: {x: 5, y: 11.5, z: 17},
        rotation: {y: Math.PI/1.2},
        default: true
      },
      // {
      //   name: 'Gorge Powerhouse',
      //   id: 'gorge_powerhouseS',
      //   url: '/models/GorgePowerhouse.glTF',
      //   offset: {x: 15, y: -5.5, z: -5},
      // },
      
      
      
    ]
  }
  res.status(200).json({ data })
}
