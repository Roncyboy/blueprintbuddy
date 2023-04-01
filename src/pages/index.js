import { PrismaClient } from "@prisma/client"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button } from "@mantine/core"
import StickyNote from "components/stickynote"
import StickyNoteGrid from "components/Layout"

const prisma = new PrismaClient()

export default function Home({projects}) {
  const router = useRouter()

  return (
    <div>
     
      <h1>Home</h1> 
      {/* <Button onClick={() => router.push('/addproject')}>Create Project</Button> */}
      <StickyNoteGrid>
      {projects.map(project => (
        <div key={project.id} onClick={()=> router.push(`/projects/${project.id}`)}>
        <StickyNote >
          <h2>{project.title}</h2>
          <p>{project.content}</p>
          {/* <p>{project.items.length}</p> */}
        </StickyNote>
        </div>
        ))}
      </StickyNoteGrid>

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
