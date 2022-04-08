import { useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const [items,setItems] = useState([])
  const [content,setContent] = useState('');
  function appendListItem() {
    if(content){
    setItems((prev)=>[...prev,content])
    setContent("")
    }
  }
  function deleteListItem(index) {
    setItems(items.filter((_,filterIndex)=>filterIndex!==index))
  }
  return (
    <>
      <input type="text" onChange={(e)=>setContent(e.target.value)} value={content}/>
      <button onClick={appendListItem}>Adding</button>
      <DragAndDropList items={items} setItems={setItems} deleteListItem={deleteListItem}/>
    </>
  )
}

const DragAndDropList =({items,setItems,deleteListItem}) => {
  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };
  console.log(items);
  return(
    <DragDropContext onDragEnd = {onDragEnd} >
        <Droppable droppableId="droppable">
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef} >
               {items.map((item, index)=>(
                 <Draggable key={`ID-${item}-${index}`} draggableId={`ID-${item}-${index}`} index={index}>
                   {(provided)=>(
                     <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                   >
                    <div style={{width:"20vh",padding:"1em",margin:"1em",backgroundColor:"grey",position:"relative"}}>
                    <span>{item}</span>
                    <button style={{position:"absolute",right:0,bottom:0}} onClick={()=>deleteListItem(index)}>Deleting</button>
                    </div>
                    </div>
                   )}
                 </Draggable>
                ))}
          </div>
        )}
        </Droppable>
    </DragDropContext>
  )
}


export default App;