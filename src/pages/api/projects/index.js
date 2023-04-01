// Import the PrismaClient constructor from the prisma package
import { PrismaClient } from '@prisma/client'

// Instantiate PrismaClient
const prisma = new PrismaClient()

// const getPrismaUser = async (req) => {
//   const prismaUser = await prisma.user.findUnique({
//     where: {
//       email: req.session.user.email,
//     },
//   })

//   return prismaUser
// }


// Define the handler function for the POST request
const createProjectHandler = async (req, res) => {
  const { title, content, items, auth } = req.body

  // // Get the user from the database
  // const prismaUser = await prisma.user.findUnique({
  //   where: {
  //     email: auth.user.email,
  //   },
  // })


  // const prismaUser = await prisma.user.findUnique({
  //   where: {
  //     email: req.session.user.email,
  //   },
  // })

  // if (!prismaUser) {
  //   return res.status(404).json({ error: 'User not found' })
  // }

  try {
    // Create a new project in the database
    const project = await prisma.project.create({
      data: {
        title,
        content,
        items: {
          // Map over the items array and create a new item for each one
          create: items.map(item => ({
            title: item.title,
            material: item.material,
            height: item.height,
            width: item.width,
            depth: item.depth,
            length: item.length,
            angle: item.angle,
            finished: item.finished,
            projectId: item.projectId,
          })),
        },
      },
      // Include the items relation in the response
      include: {
        items: true,
      },
    })

    // Send a JSON response with the newly created project and its items
    res.status(201).json(project)
  } catch (error) {
    // Send an error response if the project creation failed
    res.status(500).json({ error: error.message })
  }
}

// Export the handler function
module.exports = createProjectHandler
