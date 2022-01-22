import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import styled from 'styled-components';
import React from 'react';

interface IProps {
  toDos: string[];
  boardId: string;
}

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Board = ({ toDos, boardId }: IProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard toDo={toDo} index={index} key={toDo} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default React.memo(Board);
