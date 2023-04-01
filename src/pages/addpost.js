import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import RulerInput from 'components/ruler';
import ProtractorInput from 'components/protractor';


export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/projects', { title, content })
        console.log(res.data)
        router.push('/')
    }
    
    return (
        <div>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content">Content</label>
            <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
            <RulerInput />
            <ProtractorInput />            
            <button type="submit">Add Post</button>
        </form>
        </div>
    )
    }