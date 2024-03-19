import { FC, MouseEvent } from 'react';
import styled from 'styled-components';

interface IProps {
  cardId: number;
  handleEditClick: (cardId: number) => void;
  handleDeletelick: (cardId: number) => void;
}

const Actions: FC<IProps> = ({ cardId, handleEditClick, handleDeletelick }) => {
  const onActionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    switch (e.currentTarget.name) {
      case 'edit':
        return handleEditClick(cardId);

      case 'delete':
        return handleDeletelick(cardId);

      default:
        return;
    }
  };

  return (
    <ActionsStyled>
      <button type="button" name="edit" onClick={onActionClick}>
        <svg width="22" height="22">
          <use xlinkHref="/icons/sprite.svg#pencil" />
        </svg>
      </button>
      <button type="button" name="delete" onClick={onActionClick}>
        <svg width="24" height="24">
          <use xlinkHref="/icons/sprite.svg#trash" />
        </svg>
      </button>
    </ActionsStyled>
  );
};

export default Actions;

const ActionsStyled = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 5px;
`;
