import { Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ITodo, toDoState } from '../atom';

interface IProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
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
  min-height: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 15px;
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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 100%;
    height: 34px;
    border: none;
    background-color: ${(props) => props.theme.cardColor};
    padding: 0px 8px;
    outline: none;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin: 18px 0px;
  font-size: 18px;
`;

const Error = styled.p`
  color: orangered;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });
  const onValid = ({ toDo }: IForm) => {
    clearErrors();
    const newToDo = { id: Date.now(), text: toDo };
    setValue('toDo', '');
    setToDos((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });
  };
  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(magic) => (
        <Wrapper
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          ref={magic.innerRef}
        >
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              type="text"
              placeholder={`Add task on ${boardId}`}
              autoComplete="off"
              {...register('toDo', { required: 'we need some text!!' })}
            />
            {errors.toDo && <Error>{errors.toDo.message}</Error>}
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={!!info.draggingFromThisWith}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default React.memo(Board);
