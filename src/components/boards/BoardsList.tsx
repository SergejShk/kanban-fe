import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Loader from '../common/Loader';
import Actions from '../common/Actions';
import Modal from '../common/Modal';

import TaskForm from './TaskForm';

import { IBoard } from '../../interfaces/boards';
import { ITask, ITaskFormValues } from '../../interfaces/tasks';
import { useCreateTask } from '../../hooks/services/tasks/useCreateTask';

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | undefined>(undefined);

  const {
    mutate: createNewTask,
    data: newTask,
    isPending: isPendingNewTask,
    error: errorNewTask,
  } = useCreateTask();

  useEffect(() => {
    if (!newTask?.data) return;

    onModalClose();
    // refetch();
  }, [newTask]);

  const onCreateTaskClick = () => setIsOpenModal(true);

  const onModalClose = () => {
    setActiveTask(undefined);
    setIsOpenModal(false);
  };

  const onCreateTask = (formValues: ITaskFormValues) => {
    const board = boards[0];

    const newTask = {
      id: uuidv4(),
      ...formValues,
    };
    const currentTasks = board.tasks || [];
    const body = {
      boardId: board.id,
      tasks: [...currentTasks, newTask],
    };

    createNewTask(body);
  };

  return (
    <>
      <BoardsListStyled>
        {isLoading && <Loader />}

        {!!boards.length &&
          !isLoading &&
          boards.map((board, idx) => (
            <BoardItem key={board.id}>
              <BoardTitle>{board.name}</BoardTitle>
              <BoardContent>
                {idx === 0 && (
                  <CreateTaskButton type="button" onClick={onCreateTaskClick}>
                    <svg width="50" height="50">
                      <use xlinkHref="/icons/sprite.svg#plus" />
                    </svg>
                  </CreateTaskButton>
                )}
                <Actions
                  cardId={board.id}
                  handleEditClick={handleEditBoardClick}
                  handleDeletelick={handleDeleteBoardClick}
                />
              </BoardContent>
            </BoardItem>
          ))}
      </BoardsListStyled>

      {isOpenModal && (
        <Modal handleModalClose={onModalClose}>
          <TaskForm
            initialTask={activeTask}
            isLoading={isPendingNewTask}
            error={errorNewTask?.response?.data}
            // handleSaveClick={activeBoard ? onUpdateBoard : onCreateBoard}
            handleSaveClick={onCreateTask}
            handleCancelClick={onModalClose}
          />
        </Modal>
      )}
    </>
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
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;
`;

const BoardTitle = styled.p`
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

const BoardContent = styled.div`
  position: relative;
  width: calc(100% - 40px);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: #fff;
  padding: 20px 20px 50px;
`;

const CreateTaskButton = styled.button`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #6b7fca;
`;
