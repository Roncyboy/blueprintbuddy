import { PrismaClient } from "@prisma/client"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button } from "@mantine/core"

const prisma = new PrismaClient()

export default function Home({projects}) {
  const router = useRouter()
  console.log(projects)

  return (
    <div>
     
      <h1>Home</h1> 
      {/* <Button onClick={() => router.push('/addproject')}>Create Project</Button> */}
      {projects.map(project => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.content}</p>
          {/* <p>{project.items.length}</p> */}
        </Link>
        ))}

    </div>
  )
}

export async function getServerSideProps(context) {
const projects = await prisma.project.findMany()

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    }
  }
}
