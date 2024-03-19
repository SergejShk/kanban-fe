import { FC } from 'react';
import styled from 'styled-components';

const BoardsList: FC = () => {
  return (
    <BoardsListStyled>
      <BoardItem>1</BoardItem>
      <BoardItem>2</BoardItem>
      <BoardItem>3</BoardItem>
      <BoardItem>4</BoardItem>
      <BoardItem>5</BoardItem>
      <BoardItem>6</BoardItem>
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
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;
  border-radius: 4px;
  background-color: #fff;
`;
