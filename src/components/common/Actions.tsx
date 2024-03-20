import { FC, MouseEvent } from 'react';
import styled from 'styled-components';

interface IProps {
  cardId: number;
  editIconSize?: string;
  deleteIconSize?: string;
  positionBottom?: string;
  handleEditClick: (cardId: number) => void;
  handleDeletelick: (cardId: number) => void;
}

const Actions: FC<IProps> = ({
  cardId,
  editIconSize,
  deleteIconSize,
  positionBottom,
  handleEditClick,
  handleDeletelick,
}) => {
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
    <ActionsStyled $positionBottom={positionBottom}>
      <button type="button" name="edit" onClick={onActionClick}>
        <svg width={editIconSize || '22'} height={editIconSize || '22'}>
          <use xlinkHref="/icons/sprite.svg#pencil" />
        </svg>
      </button>
      <button type="button" name="delete" onClick={onActionClick}>
        <svg width={deleteIconSize || '24'} height={deleteIconSize || '24'}>
          <use xlinkHref="/icons/sprite.svg#trash" />
        </svg>
      </button>
    </ActionsStyled>
  );
};

export default Actions;

const ActionsStyled = styled.div<{ $positionBottom?: string }>`
  position: absolute;
  bottom: ${({ $positionBottom }) => $positionBottom || '10px'};
  right: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 5px;
`;
