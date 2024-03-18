import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IWorkSpace } from '../../interfaces/workSpaces';

interface IProps {
  workSpaces: IWorkSpace[];
}

const WorkSpaceList: FC<IProps> = ({ workSpaces }) => {
  return (
    <WorkSpaceListStyled>
      {!!workSpaces.length &&
        workSpaces.map(workSpace => (
          <WorkSpaceItem key={workSpace.id}>
            <Card to={`${workSpace.id}`}>{workSpace.name}</Card>
          </WorkSpaceItem>
        ))}

      <WorkSpaceItem>
        <ButtonCard type="button">
          <svg width="50" height="50">
            <use xlinkHref="/icons/sprite.svg#plus" />
          </svg>
        </ButtonCard>
      </WorkSpaceItem>
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
  height: calc(100% - 20px);
  padding: 10px;
  color: #484848;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonCard = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
