import Link from 'next/link'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function ProjectsPage({ projects }) {
  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <a>{project.title}</a>
              {/* <p>{project.item.length}</p> */}
            </Link>
          </li>
        ))}
        {!projects.length && <>
            <li>You have no projects yet.</li>
            <li><Link href="/addproject"><a>Create a project</a></Link></li>
        </>}
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { userId } = context.params
  
  const projects = await prisma.project.findMany({
    where: {
      authorId: userId
    }
  })

  return {
    props: {
      projects
    }
  }
}
