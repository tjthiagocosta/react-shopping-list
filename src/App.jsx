import "./App.css";
import groceryCartImg from "./assets/grocery-cart.png";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isListDone, setIsListDone] = useState(false);

  useEffect(() => {
    determineIsListDone();
  }, [groceryItems]);

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const determineIsListDone = () => {
    if (!groceryItems.length) {
      return setIsListDone(false);
    }

    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });
    setIsListDone(isAllCompleted);
  };

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];
        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue.toLocaleLowerCase()
        );
        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue.toLocaleLowerCase(),
            quantity: 1,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }
        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
  };

  const handleRemoveGroceryItem = (name) => {
    const updatedGroceryList = [...groceryItems].filter(
      (item) => item.name !== name
    );
    setGroceryItems(updatedGroceryList);
  };

  const handleUpdateCompletedStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  };

  const renderGroceryList = () => {
    return groceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) => {
              handleUpdateCompletedStatus(e.target.checked, index);
            }}
            value={item.completed}
            checked={item.completed}
          />
          <p>
            {item.name}
            {item.quantity > 1 && <span> x{item.quantity}</span>}
          </p>
        </div>
        <div>
          <button
            className="remove-button"
            onClick={() => handleRemoveGroceryItem(item.name)}
          >
            X
          </button>
        </div>
      </li>
    ));
  };
  return (
    <main className="App">
      <div>
        {isListDone && <h1 className="success">You're Done!</h1>}
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
        <ul>{renderGroceryList()}</ul>
      </div>
    </main>
  );
}

export default App;
