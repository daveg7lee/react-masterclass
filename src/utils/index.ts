import { DropResult } from 'react-beautiful-dnd';
import { SetterOrUpdater } from 'recoil';
import { ITodoState } from '../atom';

export const onDrageEnd = (
  info: DropResult,
  setBoards: SetterOrUpdater<string[]>,
  setToDos: SetterOrUpdater<ITodoState>
) => {
  const { destination, source } = info;
  if (!destination) return;

  if (source.droppableId === 'boards') {
    setBoards((prev) => {
      const boardCopy = [...prev];
      const item = boardCopy.splice(source.index, 1)[0];
      boardCopy.splice(destination.index, 0, item);
      return boardCopy;
    });
  } else if (destination.droppableId === 'trashcan') {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      boardCopy.splice(source.index, 1);
      return { ...allBoards, [source.droppableId]: boardCopy };
    });
  } else if (source.droppableId === destination?.droppableId) {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      const item = boardCopy.splice(source.index, 1)[0];
      boardCopy.splice(destination.index, 0, item);
      return {
        ...allBoards,
        [source.droppableId]: boardCopy,
      };
    });
  } else if (destination.droppableId !== source.droppableId) {
    setToDos((allBoards) => {
      const destinationCopy = [...allBoards[destination.droppableId]];
      const sourceCopy = [...allBoards[source.droppableId]];
      const item = sourceCopy.splice(source.index, 1)[0];
      destinationCopy.splice(destination.index, 0, item);
      return {
        ...allBoards,
        [source.droppableId]: sourceCopy,
        [destination.droppableId]: destinationCopy,
      };
    });
  }
};
