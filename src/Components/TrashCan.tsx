import { FaRecycle } from 'react-icons/fa';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TrashCanWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;

  .trash {
    background: ${(props) => props.theme.cardColor};
    width: 33px;
    height: 40px;
    display: inline-block;
    margin: 0 auto;

    svg {
      position: absolute;
      top: 13px;
      right: 8px;
      color: gray;
    }

    position: relative;
    -webkit-border-bottom-right-radius: 6px;
    -webkit-border-bottom-left-radius: 6px;
    -moz-border-radius-bottomright: 6px;
    -moz-border-radius-bottomleft: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .trash span {
    position: absolute;
    height: 6px;
    width: 48px;
    background: ${(props) => props.theme.cardColor};
    top: -10px;
    left: -8px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 19% 100%;
    display: flex;
    justify-content: center;
  }
  .trash span:after {
    content: '';
    position: absolute;
    width: 13px;
    height: 4px;
    background: ${(props) => props.theme.cardColor};
    top: -6px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 19% 100%;
    left: 20px;
  }

  .trash:hover span {
    transform: rotate(-45deg);
    transition: transform 250ms;
  }
`;

const TrashCan = () => {
  return (
    <Droppable droppableId="trashcan">
      {(magic) => (
        <TrashCanWrapper ref={magic.innerRef} {...magic.droppableProps}>
          <span className="trash">
            <span></span>
            <FaRecycle />
          </span>
        </TrashCanWrapper>
      )}
    </Droppable>
  );
};

export default TrashCan;
