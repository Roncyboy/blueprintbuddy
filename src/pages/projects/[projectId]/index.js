import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/react';

const prisma = new PrismaClient()

export default function Project({ project, items}) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    const [deleting, setDeleting] = useState(false);
  const router = useRouter()
  const id = project.id

  useEffect(() => {
    if (deleting) {
      deletePost();
    }
  }, [deleting]);

  console.log(project)
    console.log(project.authorId)

  const isAuthor = project.author === session?.user?.email;

  const handleDelete = () => {
    setDeleting(true);
  };
  const [newItemTitle, setNewItemTitle] = useState('')

  const handleNewItemSubmit = async (e) => {
    e.preventDefault()
    const item = await fetch(`/api/projects/${id}/items`, {
      method: 'POST',
      body: JSON.stringify({ title: newItemTitle }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    setNewItemTitle('')
    router.replace(router.asPath)
  }

  const handleItemTitleChange = async (itemId, newTitle) => {
    await fetch(`/api/projects/${id}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: newTitle }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.replace(router.asPath)
  }

  const handleItemDelete = async (itemId) => {
    await fetch(`/api/projects/${id}/items/${itemId}`, {
      method: 'DELETE',
    })
    router.replace(router.asPath)
  }

  if (!project || !items) return <div>Loading...</div>

  return (
    <div>
      <h1>{project.title}1</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.title}
              onChange={(e) =>
                handleItemTitleChange(item.id, e.target.value)
              }
            />
            {isAuthor && (
        <button disabled={deleting} nClick={() => handleItemDelete(item.id)}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewItemSubmit}>
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <button>Add item</button>
      </form>
      <button onClick={() => router.push('/')}>Home</button>
    </div>
  )
}

export async function getServerSideProps(context) {
    const id = context.params.projectId
    console.log(id)
    const project = await prisma.project.findUnique({
        where: {
        id: Number(id),
        },
        include: {
        items: true,
        },
    })
    const items = await prisma.item.findMany({
        where: {
        projectId: Number(id),
        },
    })

    return {
        props: {
        project : JSON.parse(JSON.stringify(project)),
        items : JSON.parse(JSON.stringify(items)),
        },
    }
}