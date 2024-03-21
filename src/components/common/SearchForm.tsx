import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled from 'styled-components';

import { Button } from './Button';

interface IProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: FC<IProps> = ({ setQuery }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        name="search"
        type="text"
        onChange={onSearchChange}
        value={search}
        autoComplete="off"
      />
      <Button type="submit" $minHeight="43px">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;

const Form = styled.form`
  width: 500px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 15px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #6b7fca;
  background-color: #fff;
  font-size: 18px;
  letter-spacing: 0.72px;
  color: #484848;
  padding: 10px;

  &:hover,
  &:focus {
    border-color: #4762c6;
  }
`;
