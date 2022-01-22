import { atom } from 'recoil';

interface ITodo {
  [key: string]: string[];
}

export const toDoState = atom<ITodo>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    doing: ['h', 'i'],
    done: ['j', 'k'],
  },
});
