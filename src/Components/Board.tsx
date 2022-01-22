import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import styled from 'styled-components';
import React from 'react';

interface IProps {
  toDos: string[];
  boardId: string;
}

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  > div {
    min-height: 300px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin: 18px 0px;
  font-size: 18px;
`;

const Board = ({ toDos, boardId }: IProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default React.memo(Board);
