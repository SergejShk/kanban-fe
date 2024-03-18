import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import WorkSpaceList from './WorkSpaceList';
import Modal from '../common/Modal';
import WorkSpaceForm from './WorkSpaceForm';

import { useCreateWorkSpace } from '../../hooks/services/work-spaces/useCreateWorkSpace';
import { useWorkSpacesList } from '../../hooks/services/work-spaces/useWorkSpacesList';

import { IWorkSpaceFormValues } from '../../interfaces/workSpaces';

const WorkSpaces: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    mutate: createNewWorkSpace,
    data: newWorkSpace,
    isPending: isPendingNewWorkSpace,
    error: errorNewWorkSpace,
  } = useCreateWorkSpace();
  const { data: workSpaces, isFetching, refetch } = useWorkSpacesList();

  useEffect(() => {
    if (!newWorkSpace?.data) return;

    onModalClose();
    refetch();
  }, [newWorkSpace, refetch]);

  const onClickNewSpace = () => setIsOpenModal(true);
  const onModalClose = () => setIsOpenModal(false);

  const onCreateNewSpace = (formValues: IWorkSpaceFormValues) => {
    createNewWorkSpace(formValues);
  };

  return (
    <>
      <WorkSpacesStyled>
        <WorkSpaceList
          workSpaces={workSpaces?.data || []}
          isLoading={isFetching}
          handleClickNewSpace={onClickNewSpace}
        />
      </WorkSpacesStyled>

      {isOpenModal && (
        <Modal handleModalClose={onModalClose}>
          <WorkSpaceForm
            isLoading={isPendingNewWorkSpace}
            error={errorNewWorkSpace?.response?.data}
            handleSaveClick={onCreateNewSpace}
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
