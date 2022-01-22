import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IProps {
  toDo: string;
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
`;

const DraggableCard = ({ toDo, index }: IProps) => {
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
