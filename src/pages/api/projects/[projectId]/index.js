import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

 
    
    const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    })


    if (!prismaUser) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

  switch (req.method) {
    case 'GET':
      // Get all projects
      const projects = await prisma.project.findMany()
      res.status(200).json(projects)
      break
    case 'POST':
      // Create a new project
      const { title, content } = req.body
      const newProject = await prisma.project.create({
        data: { title, content },
      })
      res.status(201).json(newProject)
      break
    case 'PUT':
      // Update an existing project
      const { id, ...data } = req.body
      const updatedProject = await prisma.project.update({
        where: { id: parseInt(id) },
        data,
      })
      res.status(200).json(updatedProject)
      break
    case 'DELETE':
      // Delete a project
      const projectId = parseInt(req.query.projectId)
      const deletedProject = await prisma.project.delete({
        where: { id: projectId},
      })
      res.status(200).json(deletedProject)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
