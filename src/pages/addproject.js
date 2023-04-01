import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Select, TextInput, NumberInput, Button } from '@mantine/core';
import Container from 'components/container';
import FlexBox from 'components/flexbox';
import styled from 'styled-components';
const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 1rem;
  max-width: 30%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 1rem;
    
    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      margin-bottom: 0.5rem;
    }
  }


`;


export default function NewProjectPage() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const { data: session, status } = useSession();

    console.log(session);
    const auth = session?.user?.email;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [items, setItems] = useState([]);
    
    const [newItem, setNewItem] = useState({
        title: "",
        material: "",
        height: "0",
        width: "0",
        depth: "0",
        length: "0",
        angle: "0",
      });

    const onSubmit = async (data) => {
        const res = await axios.post('/api/projects', {
            title,
            content,
            items,
            auth,
        });
        

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
      height: "0",
      width: "0",
      depth: "0",
      length: "0",
      angle: "0",
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
        setItems([...items, { title: '', material: '', height: "0", width: "0", depth: "0", length: "0", angle: "0" }]);
    };

  return (
    <StyledBox>
      <h1>New Project</h1>
      <FlexBox>
      <form onSubmit={handleSubmit(onSubmit)}>
             <label>
        Title:
        <TextInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content:
        <TextInput value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
        <h2>Items</h2>
        <Button type="button" onClick={addItem}>
          Add Item
        </Button>
        {items.map((_, i) => (
            <FlexBox align='space-between' direction="column" padding="10px" key={i}>   
                <label>
                    Item Name:
                    <TextInput type="text" name="title" value={items[i].title} onChange={(e) => handleItemChange(e, i)} />
                </label>
                <label>
                    <TextInput 
                    label="Material"
                    placeholder="Pick one"
                    type="text" name="material" value={items[i].material} onChange={(e) => handleItemChange(e, i)} />
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
                <Button type="button" onClick={() => handleRemoveItem(i)}>
                    Remove Item
                </Button>
            </FlexBox >
        ))}
        <Button type="submit">Create Project</Button>
      </form>
      </FlexBox>
    </StyledBox>
  );
}
