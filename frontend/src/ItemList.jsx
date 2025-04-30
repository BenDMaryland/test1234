import { useEffect, useState } from "react";
import axios from "axios";

function ItemList({ refreshFlag }) {
    const [items, setItems] = useState([]);
    const [iseditable, setIsEditable] = useState(false);


    const buttonStyle = {
        padding: '0.5rem 1rem', fontSize: '1rem'
    }

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

    function editeHandler(item) {

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
                        <li key={item.id}>
                            <strong>{item.title}</strong>: {item.description}
                            <button style={buttonStyle} onClick={() => deleteHandler(item)}>delete</button>
                            <button style={buttonStyle} onClick={() => setIsEditable(!iseditable)}>edit</button>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;
