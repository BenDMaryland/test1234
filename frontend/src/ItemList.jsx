import { useEffect, useState } from "react";
import axios from "axios";

function ItemList({ refreshFlag }) {
    const [items, setItems] = useState([]);
    const [iseditable, setIsEditable] = useState(false);


    const buttonStyle = {
        padding: '0.5rem 1rem', fontSize: '1rem'
    }
    const [editItemId, setEditItemId] = useState(null);
    const [editItemName, setEditItemName] = useState("");

    const handleItemCreated = () => {
        setRefreshFlag((prev) => !prev); // toggle to trigger refresh
    };

    const startEditing = (item) => {
        setEditItemId(item.id);
        setEditItemName(item.name);
    };

    const cancelEditing = () => {
        setEditItemId(null);
        setEditItemName("");
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/items/${editItemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: editItemName }),
            });

            if (response.ok) {
                console.log("Item updated!");
                setEditItemId(null);
                setEditItemName("");
                setRefreshFlag((prev) => !prev); // Refresh items
            } else {
                console.error("Failed to update item.");
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    function deleteHandler(item) {
        axios
            .delete(`http://127.0.0.1:8000/items/${item.id}`)
            .then((response) => {
                console.log("Item deleted successfully:", response.data);
                // Remove the deleted item from the local state
                setItems((currentItems) => {
                    return currentItems.filter((currentItem) => currentItem.id !== item.id);
                });
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    }




    useEffect(() => {
        axios.get("http://127.0.0.1:8000/items/")
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
    }, [refreshFlag]); // re-fetch when refreshFlag changes


    return (
        <div>
            <h2>Items</h2>
            {items.length === 0 ? (
                <p>No items yet.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <div key={item.id}>
                            {editItemId === item.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editItemName}
                                        onChange={(e) => setEditItemName(e.target.value)}
                                    />
                                    <button onClick={handleUpdate}>Save</button>
                                    <button onClick={cancelEditing}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {item.name}
                                    <button onClick={() => startEditing(item)}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}

                </ul>
            )}
        </div>
    );
}

export default ItemList;
