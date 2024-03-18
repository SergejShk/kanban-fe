import { FC } from 'react';
import styled from 'styled-components';

const Home: FC = () => {
  return <HomeStyled>Home page</HomeStyled>;
};

export default Home;

const HomeStyled = styled.div`
  min-width: calc(100% - 30px);
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
`;
