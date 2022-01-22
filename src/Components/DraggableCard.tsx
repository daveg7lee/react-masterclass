import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IProps {
  toDo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.cardColor};
  user-select: none;
`;

const DraggableCard = ({ toDo, index }: IProps) => {
  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
