import { DragDropContext, Droppable, DragStart } from 'react-beautiful-dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BoardState, toDoState, TrashCanState } from './atom';
import Board from './Components/Board';
import TrashCan from './Components/TrashCan';
import { onDrageEnd } from './utils';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(BoardState);
  const setTrashCan = useSetRecoilState(TrashCanState);
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === 'DEFAULT') setTrashCan(true);
  };
  return (
    <DragDropContext
      onDragEnd={(info) => onDrageEnd(info, setBoards, setToDos, setTrashCan)}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Wrapper>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {boards.map((boardId, index) => (
                <Board
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                  key={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
