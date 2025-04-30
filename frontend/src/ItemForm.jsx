import { useState } from "react";
import axios from "axios";

function ItemForm({ onItemCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/items/", {
                title,
                description,
            });
            console.log("Created:", response.data);
            setTitle("");
            setDescription("");
            if (onItemCreated) {
                onItemCreated(); // refresh list
            }
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h2>Create Item</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ display: 'block', marginBottom: '1rem', width: '300px', height: '100px' }}
            />
            <button type="submit">Create</button>
        </form>
    );
}

export default ItemForm;
