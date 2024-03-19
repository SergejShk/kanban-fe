import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useLogOut } from '../../hooks/services/auth/useLogout';

const Header: FC = () => {
  const { mutate, isPending } = useLogOut();

  const handleLogOutClick = () => {
    mutate();
  };

  return (
    <HeaderStyled>
      <Link to="/work-spaces">
        <Logo>Kanban</Logo>
      </Link>

      <LogOutBtn type="button" onClick={handleLogOutClick} disabled={isPending}>
        Log out
      </LogOutBtn>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 30px);
  background-color: #6b7fca;
  padding: 19px 15px;
`;

const Logo = styled.p`
  color: #fff;
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
`;

const LogOutBtn = styled.button`
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  border-style: none;
  background-color: transparent;
  margin-left: auto;

  &:disabled {
    cursor: auto;
  }
`;
