import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? props.theme.isDragging : props.theme.cardColor};
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
  font-weight: 500;
`;

const DraggableCard = ({ toDoId, toDoText, index }: IProps) => {
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => {
        return (
          <Card
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
            isDragging={snapshot.isDragging}
          >
            {toDoText}
          </Card>
        );
      }}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
