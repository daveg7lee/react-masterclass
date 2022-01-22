import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});
