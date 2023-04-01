import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/react';
import { Checkbox, Button } from '@mantine/core';
import axios from 'axios';
import StickyNoteGrid from 'components/Layout';
import StickyNote, { ItemStickyNote } from 'components/stickynote';

const prisma = new PrismaClient()

export default function Project({ project, items}) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    const [deleting, setDeleting] = useState(false);
  const router = useRouter()
  const id = project.id

const deletePost = async () => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (!res.ok) throw Error(json.message);
    router.push('/');
  };
  

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
  const [newItemMaterial, setNewItemMaterial] = useState('')
  const [newItemHeight, setNewItemHeight] = useState('')
  const [newItemWidth, setNewItemWidth] = useState('')
  const [newItemDepth, setNewItemDepth] = useState('')
  const [newItemLength, setNewItemLength] = useState('')
  const [newItemAngle, setNewItemAngle] = useState('')


  const handleNewItemSubmit = async (e) => {
    e.preventDefault()
    const item = await fetch(`/api/projects/${id}/items`, {
      method: 'POST',
      body: JSON.stringify({ 
        title: newItemTitle,
        material: newItemMaterial,
        height: newItemHeight,
        width: newItemWidth,
        depth: newItemDepth,
        length: newItemLength,
        angle: newItemAngle,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    setNewItemTitle('')
    router.replace(router.asPath)
  }

  const [finished, setFinished] = useState(project.finished)

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

  const handleFinish = async () => {
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ finished: finished }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setFinished(!finished)
    router.replace(router.asPath)
  }


  if (!project || !items) return <div>Loading...</div>

  const [editing, setEditing] = useState(false)

  const [title, setTitle] = useState(project.title)
  const [content, setContent] = useState(project.content)

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)

  const handleEdit = async () => {
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setEditing(false)
  }



  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.content}</p>
      <h2>Items</h2>
    
      <ul>  <StickyNoteGrid>
        {items.map((item) => (
          <ItemStickyNote>
          <li key={item.id}>
            <div>
                Item: {item.title}
            </div>
            <Checkbox label="Finished" onClick={handleFinish} checked={item.finish}>
        </Checkbox>
            <div>
                Material: {item.material}
            </div>
            <div>
                Height: {item.height}
            </div>
            <div>
                Width: {item.width}
            </div>
            <div>
                Depth:  {item.depth}
            </div>
            <div>
                Length: {item.length}
            </div>
            <div>
                Angle: {item.angle}
            </div>
      
            {isAuthor && (
        <button disabled={deleting} nClick={() => handleItemDelete(item.id)}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
          </li>
          </ItemStickyNote>
        ))}
      </StickyNoteGrid>
      </ul>
      <form onSubmit={handleNewItemSubmit}>
        <input
          type="text"
          value={newItemTitle}
          placeholder='Item Title'
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <input
          type="text"
          value={newItemMaterial}
          placeholder='Item Material'
          onChange={(e) => setNewItemMaterial(e.target.value)}
        />
        <input
          type="text"
          value={newItemHeight}
          placeholder='Item Height'
          onChange={(e) => setNewItemHeight(e.target.value)}
        />
        <input
          type="text"
          value={newItemWidth}
          placeholder='Item Width'
          onChange={(e) => setNewItemWidth(e.target.value)}
        />
        <input
          type="text"
          value={newItemDepth}
          placeholder='Item Depth'
          onChange={(e) => setNewItemDepth(e.target.value)}
        />
        <input
          type="text"
          value={newItemLength} 
          placeholder='Item Length'
          onChange={(e) => setNewItemLength(e.target.value)}
        />
        <input
          type="text"
          value={newItemAngle}
          placeholder='Item Angle'
          onChange={(e) => setNewItemAngle(e.target.value)}
        />
        <button>Add item</button>
      </form>
        <Checkbox checked={finished} label="Finished Project" onClick={handleFinish}>
        </Checkbox>
        <div className="author">
        <Button onClick={handleDelete}>Delete Project</Button>
        <Button onClick={handleEdit}>Edit</Button>
        </div>
      <button onClick={() => router.push('/')}>Home</button>
    </div>
  )
}

export async function getServerSideProps(context) {
    const id = context.params.projectId
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