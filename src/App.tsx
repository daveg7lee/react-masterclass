import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const onDrageEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDrageEnd}>
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={0}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>Two</li>}
              </Draggable>
              <Draggable draggableId="third" index={2}>
                {() => <li>Third</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
