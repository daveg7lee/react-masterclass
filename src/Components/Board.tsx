import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import styled from 'styled-components';
import React, { useRef } from 'react';

interface IProps {
  toDos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 0px;
  padding-bottom: 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.isDraggingOver
      : props.isDraggingFromThis
      ? props.theme.isDraggingFromThis
      : 'transparent'};
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin: 18px 0px;
  font-size: 18px;
`;

const Board = ({ toDos, boardId }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={!!info.draggingFromThisWith}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default React.memo(Board);
