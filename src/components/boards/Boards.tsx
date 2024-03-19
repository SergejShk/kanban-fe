import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import CardsList from './BoardsList';
import BoardForm from './BoardForm';

import { Button } from '../common/Button';
import Modal from '../common/Modal';

import { IBoard, IBoardFormValues } from '../../interfaces/boards';
import { useCreateBoard } from '../../hooks/services/boards/useCreateBoard';

const Boards: FC = () => {
  const params = useParams();
  const workSpaceId = params?.workSpaceId || '';

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeBoard, setActiveBoard] = useState<IBoard | undefined>(undefined);

  const {
    mutate: createNewBoard,
    data: newBoard,
    isPending: isPendingNewBoard,
    error: errorNewBoard,
  } = useCreateBoard();

  useEffect(() => {
    if (!newBoard?.data) return;

    onModalClose();
    // refetch();
  }, [newBoard]);

  const onCreateBoardClick = () => setIsOpenModal(true);

  const onModalClose = () => {
    setActiveBoard(undefined);
    setIsOpenModal(false);
  };

  const onCreateBoard = (formValues: IBoardFormValues) => {
    if (!workSpaceId || Number.isNaN(workSpaceId)) return;
    createNewBoard({ ...formValues, workSpaceId: Number(workSpaceId) });
  };
  const onUpdateBoard = (formValues: IBoardFormValues) => {
    console.log(formValues);
  };

  return (
    <>
      <BoardsStyled>
        <Button type="button" onClick={onCreateBoardClick}>
          Create board
        </Button>
        <CardsList />
      </BoardsStyled>

      {isOpenModal && (
        <Modal handleModalClose={onModalClose}>
          <BoardForm
            initialBoard={activeBoard}
            isLoading={isPendingNewBoard}
            error={errorNewBoard?.response?.data}
            handleSaveClick={activeBoard ? onUpdateBoard : onCreateBoard}
            handleCancelClick={onModalClose}
          />
        </Modal>
      )}
    </>
  );
};

export default Boards;

const BoardsStyled = styled.div``;
