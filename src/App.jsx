import "./App.css";
import groceryCartImg from "./assets/grocery-cart.png";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        setGroceryItems([
          ...groceryItems,
          {
            quantity: 1,
            name: inputValue,
            completed: false,
          },
        ]);
        setInputValue("");
      }
    }
  };
  return (
    <main className="App">
      <div>
        <h1 className="success">You're Done!</h1>
        <div className="header">
          <h1>Shopping List</h1>
          <img src={groceryCartImg} alt="Shopping cart" />
          <input
            onChange={handleChangeInputValue}
            onKeyDown={handleAddGroceryItem}
            value={inputValue}
            className="item-input"
            type="text"
            placeholder="Add an Item"
          />
        </div>
      </div>
    </main>
  );
}

export default App;
