import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function post(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  console.log(session.user.email)

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  console.log(prismaUser)

  if (!prismaUser) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  
  const { title, content } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: prismaUser.id,
    },
  })
  res.status(201).json(post)
}

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'POST':
      post(req, res)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}