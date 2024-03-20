import { ReactNode, useImperativeHandle, useRef } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import styled from 'styled-components';

import { ErrorText } from './ErrorText';

import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';

type TextareaProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<TFormValues>;
  value: string;
  label?: string | ReactNode;
  error?: string;
};

const Textarea = <TFormValues extends FieldValues>({
  name,
  rules,
  register,
  value,
  label,
  error,
}: TextareaProps<TFormValues>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { ref, ...restRegister } = register(name, rules);
  useImperativeHandle(ref, () => textAreaRef.current);

  useAutosizeTextArea(textAreaRef.current, value, 20);

  const hasError = !!error;

  return (
    <TextareaWrapper>
      <Label>
        {label && label}
        <TextareaStyled
          ref={textAreaRef}
          id={name}
          {...restRegister}
          rows={1}
        />
      </Label>
      {hasError && <ErrorText role="alert">{error}</ErrorText>}
    </TextareaWrapper>
  );
};

export default Textarea;

export const TextareaStyled = styled.textarea`
  resize: none;
  width: calc(100% - 20px);
  padding: 10px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #6b7fca;
  font-size: 18px;
  font-family: Inter;
  color: #484848;
`;

const TextareaWrapper = styled.div`
  position: relative;
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
