import React, { useEffect, useState } from 'react'

const getLocalData = () => {
  const todoList = localStorage.getItem("todolist");
  if(todoList) 
    return JSON.parse(todoList);
  else 
    return [];
}

const Todo = () => {
  const[inputData, setInputData] = useState("");
  const[items, setItems] = useState(getLocalData());
  const[editItemIndex, setEditItemIndex] = useState();
  const[isEditToogle, SetIsEditToggle] = useState(false);

  const addItems = (e) => {
    if(!inputData) 
      alert("Please fill the data");
    else if (inputData && isEditToogle) {
      const editedData = items.map((curElem) => {
        if(curElem.id === editItemIndex) 
          return {...curElem, name: inputData};
        else 
          return curElem;
      });
      setItems(editedData);
      SetIsEditToggle(false);
      setInputData("");
      setEditItemIndex("");
    }
    else {
      const newInputData = {
        id : new Date().getTime().toString(),
        name : inputData,
      }
      setItems([...items, newInputData]);
      setInputData("");
    } 
    e.preventDefault();
  }

  const editItem = (index) => {
    const item_to_update = items.find((curElem) => {
      return curElem.id === index;
    })
    // console.log(item_to_update.name);
    setInputData(item_to_update.name);
    setEditItemIndex(index);
    SetIsEditToggle(true);
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id != index;
    })
    setItems(updatedItems);
  }

  const removeAll = () => {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items])
  

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/todo2.png" alt="todo logo" />
            <figcaption>Add You List Here </figcaption>
          </figure>
          <div className="addItems" onSubmit={addItems}>
            <form>
            <input type="text" placeholder='Add Items' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} onSubmit={addItems} />
            {
              (isEditToogle) ? (
                <i className="fa-solid fa-pen-to-square" onClick={addItems}></i>
              ) : (
                <i className="fa-solid fa-plus add-btn" onClick={addItems}></i>
              )
            }
             </form>
          </div>
          <div className="showItems">
            {
              items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                      <i className="fa-solid fa-pen-to-square" onClick={() => editItem(curElem.id)}></i>
                      <i className="fa-solid fa-trash" onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo