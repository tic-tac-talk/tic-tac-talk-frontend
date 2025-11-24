import React from 'react';
import styled from '@emotion/styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  label?: string;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const StyledInput = styled.input<{ fullWidth?: boolean }>`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY[3]};
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.COLORS.INDIGO[5]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.LABEL.TERTIARY};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.COLORS.GRAY[0]};
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ fullWidth = true, label, id, ...rest }, ref) => {
    if (label) {
      return (
        <InputWrapper fullWidth={fullWidth}>
          <Label htmlFor={id}>{label}</Label>
          <StyledInput ref={ref} id={id} fullWidth={fullWidth} {...rest} />
        </InputWrapper>
      );
    }

    return <StyledInput ref={ref} id={id} fullWidth={fullWidth} {...rest} />;
  },
);

Input.displayName = 'Input';

export default Input;
