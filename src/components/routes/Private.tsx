import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../common/Header';

import { useAuthContext } from '../../context/AuthContext';

interface IProps {
  component: React.ComponentType;
}

const Private: FC<IProps> = ({ component: Component }) => {
  const { auth } = useAuthContext();

  return auth.email ? (
    <>
      <Header />
      <Container>
        <Component />
      </Container>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default Private;

const Container = styled.div`
  background-color: #b4c0ee;
  min-width: calc(100% - 30px);
  min-height: calc(100vh - 60px - 30px);
  padding: 15px;
`;
