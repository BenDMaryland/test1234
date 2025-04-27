import { useState } from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleItemCreated = () => {
    setRefreshFlag((prev) => !prev); // toggle to trigger refresh
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
