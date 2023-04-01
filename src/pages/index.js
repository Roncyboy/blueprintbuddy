import { PrismaClient } from "@prisma/client"
import { useRouter } from "next/router"

const prisma = new PrismaClient()

export default function Home({posts}) {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push('/addpost')}>Add Post</button>
      <h1>Home</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}