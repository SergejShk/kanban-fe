import { FC } from 'react';
import styled from 'styled-components';

import WorkSpaceList from './WorkSpaceList';

const WorkSpaces: FC = () => {
  return (
    <WorkSpacesStyled>
      <WorkSpaceList workSpaces={[]} />
    </WorkSpacesStyled>
  );
};

export default WorkSpaces;

const WorkSpacesStyled = styled.div`
  min-width: calc(100% - 30px);
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
`;
