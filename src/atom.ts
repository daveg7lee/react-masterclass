import { atom } from 'recoil';

interface ITodo {
  [key: string]: string[];
}

export const toDoState = atom<ITodo>({
  key: 'toDo',
  default: {
    'To Do': ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f'],
  },
});
