import { useEffect, useState } from "react";
import axios from "axios";

function ItemList({ refreshFlag }) {
  const [items, setItems] = useState([]);

function deleteHandler(item){
 
    axios.delete(`http://127.0.0.1:8000/items/${item.id}`)
    .then(response => {
        console.log('User deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      }, [refreshFlag]); // re-fetch when refreshFlag changes

setItems((currentItems)=>{
 

   let newthing=  currentItems.filter((currentItem)=>{
       if( currentItem!==item) return item
    })

console.log("newthing",newthing)
return newthing

})
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
              <button onClick={()=>deleteHandler(item)}>delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
