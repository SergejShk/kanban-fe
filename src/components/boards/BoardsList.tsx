import { FC } from 'react';
import styled from 'styled-components';

import Loader from '../common/Loader';

import { IBoard } from '../../interfaces/boards';
import Actions from '../common/Actions';

interface IProps {
  boards: IBoard[];
  isLoading: boolean;
  handleEditBoardClick: (id: number) => void;
  handleDeleteBoardClick: (id: number) => void;
}

const BoardsList: FC<IProps> = ({
  boards,
  isLoading,
  handleEditBoardClick,
  handleDeleteBoardClick,
}) => {
  return (
    <BoardsListStyled>
      {isLoading && <Loader />}

      {!!boards.length &&
        !isLoading &&
        boards.map(board => (
          <BoardItem key={board.id}>
            {board.name}
            <Actions
              cardId={board.id}
              handleEditClick={handleEditBoardClick}
              handleDeletelick={handleDeleteBoardClick}
            />
          </BoardItem>
        ))}
    </BoardsListStyled>
  );
};

export default BoardsList;

const BoardsListStyled = styled.ul`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  overflow-x: scroll;
  padding: 15px 0;
`;

const BoardItem = styled.li`
  position: relative;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;
  border-radius: 4px;
  background-color: #fff;
`;
