import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function NewProjectPage() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [items, setItems] = useState([]);
    
    const [newItem, setNewItem] = useState({
        title: "",
        material: "",
        height: 0,
        width: 0,
        depth: 0,
        length: 0,
        angle: 0,
      });

    const onSubmit = async (data) => {
        const res = await axios.post('/api/projects', { title, content, items });

        console.log(data);
        router.push('/');
    };

  const handleAddItem = () => {
    setProject((prevState) => ({
      ...prevState,
      items: [...prevState.items, newItem],
    }));
    setNewItem({
      title: "",
      material: "",
      height: 0,
      width: 0,
      depth: 0,
      length: 0,
      angle: 0,
    });
  };

    const handleRemoveItem = (i) => {
        setItems(items.filter((_, index) => index !== i));
    };

    const handleItemChange = (e, i) => {
        const { name, value } = e.target;
        const list = [...items];
        list[i][name] = value;
        setItems(list);
    };

    const addItem = () => {
        setItems([...items, { title: '', material: '', height: 0, width: 0, depth: 0, length: 0, angle: 0 }]);
    };

  return (
    <div>
      <h1>New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
             <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
        <h2>Items</h2>
        {items.map((_, i) => (
            <div key={i}>   
                <label>
                    Title:
                    <input type="text" name="title" value={items[i].title} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Material:
                    <input type="text" name="material" value={items[i].material} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Height:
                    <input type="number" name="height" value={items[i].height} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Width:
                    <input type="number" name="width" value={items[i].width} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Depth:
                    <input type="number" name="depth" value={items[i].depth} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Length:
                    <input type="number" name="length" value={items[i].length} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    Angle:
                    <input type="number" name="angle" value={items[i].angle} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <button type="button" onClick={() => handleRemoveItem(i)}>
                    Remove Item
                </button>
            </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
