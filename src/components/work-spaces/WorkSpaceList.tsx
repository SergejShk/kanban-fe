import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../common/Loader';
import Actions from '../common/Actions';

import { IWorkSpace } from '../../interfaces/workSpaces';

interface IProps {
  workSpaces: IWorkSpace[];
  isLoading: boolean;
  handleNewSpaceClick: () => void;
  handleEditSpaceClick: (id: number) => void;
  handleDeleteSpaceClick: (id: number) => void;
}

const WorkSpaceList: FC<IProps> = ({
  workSpaces,
  isLoading,
  handleNewSpaceClick,
  handleEditSpaceClick,
  handleDeleteSpaceClick,
}) => {
  return (
    <WorkSpaceListStyled>
      {isLoading && <Loader />}

      {!!workSpaces.length &&
        !isLoading &&
        workSpaces.map(workSpace => (
          <WorkSpaceItem key={workSpace.id}>
            <Card to={`${workSpace.id}`}>
              <CardTitle>{workSpace.name}</CardTitle>
              <Actions
                cardId={workSpace.id}
                editIconSize="18"
                deleteIconSize="20"
                positionBottom="5px"
                handleEditClick={handleEditSpaceClick}
                handleDeletelick={handleDeleteSpaceClick}
              />
            </Card>
          </WorkSpaceItem>
        ))}

      {!isLoading && (
        <WorkSpaceItem>
          <ButtonCard type="button" onClick={handleNewSpaceClick}>
            <svg width="50" height="50">
              <use xlinkHref="/icons/sprite.svg#plus" />
            </svg>
          </ButtonCard>
        </WorkSpaceItem>
      )}
    </WorkSpaceListStyled>
  );
};

export default WorkSpaceList;

const WorkSpaceListStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const WorkSpaceItem = styled.li`
  position: relative;
  flex-basis: calc((100% - 45px - 8px) / 4); // 100% - gap - borders
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #6b7fca;
`;

const Card = styled(Link)`
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  padding: 10px 10px 30px;
  color: #484848;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  white-space: pre-line;
  word-break: break-word;
  overflow-y: auto;
`;

const CardTitle = styled.p`
  white-space: pre-line;
  word-break: break-word;
  overflow-y: auto;
`;

const ButtonCard = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
