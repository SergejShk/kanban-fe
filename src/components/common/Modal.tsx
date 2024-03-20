import { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { Portal } from './Portal';

interface IProps {
  children: ReactNode;
  handleModalClose: () => void;
}

const Modal: FC<IProps> = ({ children, handleModalClose }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    body.style.overflow = 'hidden';
    window.addEventListener('keydown', onClicEscape);

    return () => {
      const body = document.querySelector('body');
      if (!body) return;

      body.style.overflow = 'auto';
      window.removeEventListener('keydown', onClicEscape);
    };
  });

  const onBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    e.target === e.currentTarget && handleModalClose();
  };

  const onClicEscape = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      handleModalClose();
    }
  };

  return (
    <Portal>
      <Backdrop onClick={onBackdropClick}>
        <ModalStyled>
          {children}
          <ButtonClose type="button" onClick={handleModalClose}>
            <svg width="20" height="20">
              <use xlinkHref="/icons/sprite.svg#close" />
            </svg>
          </ButtonClose>
        </ModalStyled>
      </Backdrop>
    </Portal>
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(10px);
  z-index: 100;
  overflow: auto;
`;

const ModalStyled = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 608px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px 20px;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
