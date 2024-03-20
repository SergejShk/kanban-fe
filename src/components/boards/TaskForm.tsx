import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../common/Input';
import Textarea from '../common/Textarea';
import { Button } from '../common/Button';

import { ITask, ITaskFormValues } from '../../interfaces/tasks';

interface IProps {
  initialTask?: ITask;
  isLoading: boolean;
  error?: string;
  handleSaveClick: (formValues: ITaskFormValues) => void;
  handleCancelClick: () => void;
}

const TaskForm: FC<IProps> = ({
  initialTask,
  isLoading,
  error,
  handleSaveClick,
  handleCancelClick,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskFormValues>({
    defaultValues: {
      name: initialTask?.name || '',
      description: initialTask?.description || '',
    },
  });

  const descriptionValue = useWatch({
    name: 'description',
    control,
  });

  return (
    <FormStyled onSubmit={handleSubmit(handleSaveClick)}>
      <Input
        type="text"
        name="name"
        label={<NameLabel>Title</NameLabel>}
        register={register}
        rules={{ required: { value: true, message: 'Required' } }}
        error={errors.name && errors.name.message}
      />

      <Textarea
        name="description"
        label={<NameLabel>Description</NameLabel>}
        register={register}
        rules={{ required: { value: true, message: 'Required' } }}
        value={descriptionValue}
        error={(errors.description && errors.description.message) || error}
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

export default TaskForm;

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
