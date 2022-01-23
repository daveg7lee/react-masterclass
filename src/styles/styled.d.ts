import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    cardColor: string;
    boardColor: string;
    isDraggingOver: string;
    isDraggingFromThis: string;
    isDragging: string;
    textColor: string;
  }
}
