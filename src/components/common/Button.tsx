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
  color: #484848;
  background-color: #b6d9ee;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: #94caec;
  }

  &:disabled {
    cursor: auto;
    background-color: #b6d9ee;
  }
`;
