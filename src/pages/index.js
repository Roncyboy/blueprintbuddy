import { PrismaClient } from "@prisma/client"
import { useRouter } from "next/router"
import RulerInput from 'components/Ruler'
import Link from "next/link"

const prisma = new PrismaClient()

export default function Home({projects}) {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push('/addproject')}>Add Project</button>
      <button onClick={() => router.push('/api/auth/signin')}>Sign In</button>
      <h1>Home</h1>
      {projects.map(project => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.content}</p>
          {/* <p>{project.item.length}</p> */}
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
