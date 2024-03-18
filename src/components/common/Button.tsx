import styled from 'styled-components';

export const Button = styled.button<{
  $minHeight?: string;
  $minWidth?: string;
}>`
  min-height: ${({ $minHeight }) => $minHeight || ''};
  min-width: ${({ $minWidth }) => $minWidth || ''};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.8px;
  border-radius: 4px;
  padding: 3px 10px;
  color: #fff;
  background-color: #6b7fca;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: #566ec4;
  }

  &:disabled {
    cursor: auto;
    background-color: #6b7fca;
  }
`;
