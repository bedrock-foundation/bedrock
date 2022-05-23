import React from 'react';
import styled from '@emotion/styled';
import Colors from '../styles/Colors';

type StyledInputProps = {
  margin?: string;
  padding?: string;
  width: string;
  error?: boolean;
}

const InputStyled = styled.input<StyledInputProps>`
  color: ${Colors.Blue};
  outline: none;
  border: 0px;
  border-radius: 10px;
  height: 48px;
  width: ${(props) => props.width};
  font-size: 1.4rem;
  padding: 0 0 0 10px;
  transition: all 0.2s;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-family: "Open Sans", sans-serif;
  border: ${(props) => (props.error ? `1px solid ${Colors.Red500}` : `1px solid ${Colors.Grey500}`)};

  ::placeholder {
    color: ${Colors.Grey400};
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }
`;

export type InputProps = {
  autoFocus?: boolean | undefined;
  placeholder?: string;
  value: string;
  defaultValue?: string;
  type?: string;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  margin?: string;
  padding?: string;
  width?: string;
  error?: string | null;
};

export default function Input({
  autoFocus,
  placeholder,
  value,
  defaultValue,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  margin,
  padding,
  width = 'fill-available',
  error,
}: InputProps) {
  return (
    <InputStyled
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      margin={margin}
      padding={padding}
      width={width}
      error={Boolean(error)}
    />
  );
}
