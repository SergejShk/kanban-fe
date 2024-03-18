import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../common/Input';
import { Button } from '../common/Button';

import { IWorkSpaceFormValues } from '../../interfaces/workSpaces';

interface IProps {
  isLoading: boolean;
  error?: string;
  handleSaveClick: (formValues: IWorkSpaceFormValues) => void;
  handleCancelClick: () => void;
}

const WorkSpaceForm: FC<IProps> = ({
  isLoading,
  error,
  handleSaveClick,
  handleCancelClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkSpaceFormValues>();

  return (
    <FormStyled onSubmit={handleSubmit(handleSaveClick)}>
      <Input
        type="text"
        name="name"
        label={<NameLabel>Name</NameLabel>}
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

export default WorkSpaceForm;

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
