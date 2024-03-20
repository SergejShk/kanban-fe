import { ReactNode } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import styled from 'styled-components';

import { ErrorText } from './ErrorText';

type InputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  type: string;
  label?: string | ReactNode;
  placeholder?: string;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  error?: string;
  disabled?: boolean;
};

const Input = <TFormValues extends FieldValues>({
  name,
  type,
  label,
  placeholder,
  register,
  rules,
  error,
  disabled = false,
}: InputProps<TFormValues>) => {
  const hasError = !!error;

  return (
    <InputWrapper>
      <Label>
        {label && label}
        <InputStyled
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          {...(register && register(name, rules))}
          aria-invalid={hasError ? 'true' : 'false'}
          autoComplete="off"
          disabled={disabled}
        />
      </Label>
      {hasError && <ErrorText role="alert">{error}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 0.9;
  color: #484848;
`;

const InputStyled = styled.input`
  border-radius: 4px;
  border: 1px solid #6b7fca;
  background-color: #fff;
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0.72px;
  color: #484848;
  outline: none;
  padding: 10px;

  &:hover,
  &:focus {
    border-color: #4762c6;
  }

  &:disabled:hover,
  &:disabled:focus {
    border-color: #6b7fca;
  }
`;
