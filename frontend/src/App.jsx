import { useState } from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";


function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
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


  return (
    <div style={{ padding: '2rem' }}>
      <h1>CRUD App</h1>
      <ItemForm onItemCreated={handleItemCreated} />
      <ItemList refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;
