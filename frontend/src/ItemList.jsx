import { useEffect, useState } from "react";
import axios from "axios";

function ItemList({ refreshFlag }) {
  const [items, setItems] = useState([]);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
