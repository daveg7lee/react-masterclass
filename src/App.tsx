import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BoardState, toDoState } from './atom';
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
  gap: 16px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(BoardState);
  return (
    <DragDropContext
      onDragEnd={(info) => onDrageEnd(info, setBoards, setToDos)}
    >
      <Wrapper>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {boards.map((boardId, index) => (
                <Board boardId={boardId} toDos={toDos[boardId]} index={index} />
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
