// Import the PrismaClient constructor from the prisma package
const { PrismaClient } = require('@prisma/client')

// Instantiate PrismaClient
const prisma = new PrismaClient()

// Define the handler function for the POST request
const createProjectHandler = async (req, res) => {
  const { title, content, items } = req.body

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
    res.status(500).json({ error: 'Failed to create project' })
  }
}

// Export the handler function
module.exports = createProjectHandler
