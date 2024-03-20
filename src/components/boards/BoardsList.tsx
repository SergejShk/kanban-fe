import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Loader from '../common/Loader';
import Actions from '../common/Actions';
import Modal from '../common/Modal';

import TaskForm from './TaskForm';

import { updateTasksApi } from '../../services/tasks/updateTasks';

import { useCreateTask } from '../../hooks/services/tasks/useCreateTask';

import { IBoard } from '../../interfaces/boards';
import { ITask, ITaskFormValues } from '../../interfaces/tasks';

interface IProps {
  boards: IBoard[];
  isLoading: boolean;
  refetch: () => void;
  handleEditBoardClick: (id: number) => void;
  handleDeleteBoardClick: (id: number) => void;
}

const BoardsList: FC<IProps> = ({
  boards,
  isLoading,
  refetch,
  handleEditBoardClick,
  handleDeleteBoardClick,
}) => {
  const [boardsList, setBoardsList] = useState<IBoard[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | undefined>(undefined);
  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const {
    mutate: createNewTask,
    data: newTask,
    isPending: isPendingNewTask,
    error: errorNewTask,
  } = useCreateTask();

  useEffect(() => {
    setBoardsList(boards);
  }, [boards]);

  useEffect(() => {
    if (!newTask?.data) return;

    onModalClose();
    refetch();
  }, [newTask, refetch]);

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

  const updateItemsListOnSameCard = (tasksList: ITask[], task: ITask) => {
    return tasksList.map(it => {
      if (currentTask && it.id === task.id) {
        return currentTask;
      }
      if (currentTask && it.id === currentTask.id) {
        return task;
      }
      return it;
    });
  };

  const replaceItems = (
    tasksList: ITask[],
    itemAdd: ITask,
    itemDelete: ITask
  ) => {
    return tasksList.map(it => {
      if (it.id === itemDelete.id) {
        return itemAdd;
      }
      return it;
    });
  };

  const handleDragStart = (board: IBoard, task: ITask) => {
    setCurrentBoard(board);
    setCurrentTask(task);
  };

  const handleDropItem = async (
    e: React.DragEvent<HTMLLIElement>,
    board: IBoard,
    task: ITask
  ) => {
    e.preventDefault();
    if (!currentBoard || !currentTask) return;

    const updatedBoards = async () => {
      return await Promise.all(
        boardsList.map(async b => {
          if (b.id === board.id && b.id === currentBoard.id) {
            const updatedItems = updateItemsListOnSameCard(b.tasks, task);
            await updateTasksApi({ boardId: b.id, tasks: updatedItems });
            return { ...b, tasks: updatedItems };
          }
          if (b.id === board.id && b.id !== currentBoard.id) {
            const updatedItems = replaceItems(b.tasks, currentTask, task);
            await updateTasksApi({ boardId: b.id, tasks: updatedItems });
            return { ...b, tasks: updatedItems };
          }
          if (b.id !== board.id && b.id === currentBoard.id) {
            const updatedItems = replaceItems(b.tasks, task, currentTask);
            await updateTasksApi({ boardId: b.id, tasks: updatedItems });
            return { ...b, tasks: updatedItems };
          }

          return b;
        })
      );
    };

    try {
      const newBoards = await updatedBoards();
      setBoardsList(newBoards);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropBoard = async (
    e: React.DragEvent<HTMLLIElement>,
    board: IBoard
  ) => {
    e.preventDefault();

    if (!currentBoard || !currentTask) return;

    const target = e.target as HTMLElement;
    if (target.classList.contains('task')) return;

    board.tasks.push(currentTask);
    const currentItemIndex = currentBoard.tasks.indexOf(currentTask);
    currentBoard.tasks.splice(currentItemIndex, 1);

    const updatedBoards = async () => {
      return await Promise.all(
        boardsList.map(async b => {
          if (b.id === board.id) {
            await updateTasksApi({ boardId: board.id, tasks: board.tasks });
            return board;
          }
          if (b.id === currentBoard.id) {
            await updateTasksApi({
              boardId: currentBoard.id,
              tasks: currentBoard.tasks,
            });
            return currentBoard;
          }
          return b;
        })
      );
    };

    try {
      const newBoards = await updatedBoards();
      setBoardsList(newBoards);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <BoardsListStyled>
        {isLoading && <Loader />}

        {!!boardsList.length &&
          !isLoading &&
          boardsList.map((board, idx) => (
            <BoardItem
              key={board.id}
              onDrop={e => handleDropBoard(e, board)}
              onDragOver={handleDragOver}
            >
              <BoardTitle>{board.name}</BoardTitle>
              <BoardContent>
                <TasksList>
                  {board.tasks.length > 0 &&
                    board.tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        id={task.id}
                        className="task"
                        draggable={true}
                        onDragStart={() => handleDragStart(board, task)}
                        onDrop={e => handleDropItem(e, board, task)}
                        onDragOver={handleDragOver}
                      >
                        <TaskTitle className="task">{task.name}</TaskTitle>
                        <TaskDescription className="task">
                          {task.description}
                        </TaskDescription>
                      </TaskItem>
                    ))}
                </TasksList>

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
  gap: 5px;
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

const TasksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const TaskItem = styled.li`
  cursor: grab;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #6b7fca;
  padding: 5px;
`;

const TaskTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  white-space: pre-line;
  word-break: break-word;
`;

const TaskDescription = styled.p`
  font-size: 14px;
  white-space: pre-line;
  word-break: break-word;
`;
