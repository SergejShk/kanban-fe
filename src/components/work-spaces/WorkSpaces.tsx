import { FC, useState } from 'react';
import styled from 'styled-components';

import WorkSpaceList from './WorkSpaceList';
import Modal from '../common/Modal';

const WorkSpaces: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickNewSpace = () => setIsOpenModal(true);
  const onModalClose = () => setIsOpenModal(false);

  return (
    <>
      <WorkSpacesStyled>
        <WorkSpaceList workSpaces={[]} handleClickNewSpace={onClickNewSpace} />
      </WorkSpacesStyled>

      {isOpenModal && (
        <Modal handleModalClose={onModalClose}>hello modal</Modal>
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
