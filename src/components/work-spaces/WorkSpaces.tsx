import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import WorkSpaceList from './WorkSpaceList';
import Modal from '../common/Modal';
import WorkSpaceForm from './WorkSpaceForm';

import { useCreateWorkSpace } from '../../hooks/services/work-spaces/useCreateWorkSpace';
import { useWorkSpacesList } from '../../hooks/services/work-spaces/useWorkSpacesList';
import { useUpdateWorkSpace } from '../../hooks/services/work-spaces/useUpdateWorkSpace';
import { useDeleteWorkSpace } from '../../hooks/services/work-spaces/useDeleteWorkSpace';

import { IWorkSpace, IWorkSpaceFormValues } from '../../interfaces/workSpaces';

const WorkSpaces: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeWorkSpace, setActiveWorkSpace] = useState<
    IWorkSpace | undefined
  >(undefined);

  const {
    mutate: createNewWorkSpace,
    data: newWorkSpace,
    isPending: isPendingNewWorkSpace,
    error: errorNewWorkSpace,
  } = useCreateWorkSpace();
  const { data: workSpaces, isFetching, refetch } = useWorkSpacesList();
  const {
    mutate: updateWorkSpace,
    data: updatedWorkSpace,
    isPending: isPendingUpdateWorkSpace,
    error: errorUpdateWorkSpace,
  } = useUpdateWorkSpace();
  const {
    mutate: deleteWorkSpace,
    isPending: isPendingDeleteWorkSpace,
    isSuccess,
  } = useDeleteWorkSpace();

  useEffect(() => {
    if (!newWorkSpace?.data) return;

    onModalClose();
    refetch();
  }, [newWorkSpace, refetch]);

  useEffect(() => {
    if (!updatedWorkSpace?.data) return;

    setActiveWorkSpace(undefined);
    onModalClose();
    refetch();
  }, [updatedWorkSpace, refetch]);

  useEffect(() => {
    if (!isSuccess) return;

    setActiveWorkSpace(undefined);
    refetch();
  }, [isSuccess, refetch]);

  const onNewSpaceClick = () => setIsOpenModal(true);

  const onEditClick = (id: number) => {
    const selectedWorkSpace = workSpaces?.data.find(
      workSpace => workSpace.id === id
    );
    setActiveWorkSpace(selectedWorkSpace);
    setIsOpenModal(true);
  };

  const onDeleteClick = (id: number) => {
    deleteWorkSpace(id);
  };

  const onModalClose = () => setIsOpenModal(false);

  const onCreateNewSpace = (formValues: IWorkSpaceFormValues) => {
    createNewWorkSpace(formValues);
  };

  const onUpdateWorkSpace = (formValues: IWorkSpaceFormValues) => {
    if (!activeWorkSpace) return;
    const id = activeWorkSpace.id;
    updateWorkSpace({ ...formValues, id });
  };

  return (
    <>
      <WorkSpacesStyled>
        <WorkSpaceList
          workSpaces={workSpaces?.data || []}
          isLoading={isFetching || isPendingDeleteWorkSpace}
          handleNewSpaceClick={onNewSpaceClick}
          handleEditSpaceClick={onEditClick}
          handleDeleteSpaceClick={onDeleteClick}
        />
      </WorkSpacesStyled>

      {isOpenModal && (
        <Modal handleModalClose={onModalClose}>
          <WorkSpaceForm
            initialWorkSpace={activeWorkSpace}
            isLoading={isPendingNewWorkSpace || isPendingUpdateWorkSpace}
            error={
              errorNewWorkSpace?.response?.data ||
              errorUpdateWorkSpace?.response?.data
            }
            handleSaveClick={
              activeWorkSpace ? onUpdateWorkSpace : onCreateNewSpace
            }
            handleCancelClick={onModalClose}
          />
        </Modal>
      )}
    </>
  );
};

export default WorkSpaces;

const WorkSpacesStyled = styled.div`
  min-width: calc(100% - 30px);
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
`;
