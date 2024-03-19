import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../common/Input';
import { Button } from '../common/Button';

import { IBoard, IBoardFormValues } from '../../interfaces/boards';

interface IProps {
  initialBoard?: IBoard;
  isLoading: boolean;
  error?: string;
  handleSaveClick: (formValues: IBoardFormValues) => void;
  handleCancelClick: () => void;
}

const BoardForm: FC<IProps> = ({
  initialBoard,
  isLoading,
  error,
  handleSaveClick,
  handleCancelClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardFormValues>({
    defaultValues: { name: initialBoard?.name || '' },
  });

  return (
    <FormStyled onSubmit={handleSubmit(handleSaveClick)}>
      <Input
        type="text"
        name="name"
        label={<NameLabel>Title</NameLabel>}
        register={register}
        rules={{ required: { value: true, message: 'Required' } }}
        error={(errors.name && errors.name.message) || error}
      />

      <ButtonWrapper>
        <Button disabled={isLoading}>Save</Button>
        <Button type="button" disabled={isLoading} onClick={handleCancelClick}>
          Cancel
        </Button>
      </ButtonWrapper>
    </FormStyled>
  );
};

export default BoardForm;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const NameLabel = styled.span`
  font-size: 18px;
  margin-bottom: -5px;
`;
