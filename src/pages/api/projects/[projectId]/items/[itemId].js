import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const projectId = req.query.projectId

  switch (req.method) {
    case 'GET':
      try {
        const items = await prisma.item.findMany({
          where: { projectId: parseInt(projectId) },
        })
        res.status(200).json({ data: items })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'POST':
      try {
        const item = await prisma.item.create({
          data: { ...req.body, projectId: parseInt(projectId) },
        })
        res.status(200).json({ message: 'Item created', data: item })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'PUT':
      try {
        const item = await prisma.item.update({
          where: { id: parseInt(req.body.id) },
          data: { ...req.body, projectId: parseInt(projectId) },
        })
        res.status(200).json({ message: 'Item updated', data: item })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    case 'DELETE':
      try {
        const deletedItem = await prisma.item.delete({
          where: { id: parseInt(req.query.itemId) },
        })
        res.status(200).json({ message: 'Item deleted', data: deletedItem })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
      break
  }
}
