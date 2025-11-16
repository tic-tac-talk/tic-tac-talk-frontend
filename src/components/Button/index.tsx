import React from 'react';
import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

interface StyledButtonProps {
  variant: string;
  fullWidth: boolean;
  theme?: Theme;
}

const getVariantStyles = (variant: string, theme: Theme): string => {
  const variants = {
    secondary: `
      background-color: white;
      box-shadow: inset 0 0 0 1px ${theme.COLORS.INDIGO[1]};
      color: ${theme.COLORS.LABEL.SECONDARY};
    `,
    primary: `
      background-color: ${theme.COLORS.INDIGO[5]};
      color: white;
    `,
  };

  return variants[variant as keyof typeof variants] || variants.primary;
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px ${({ fullWidth }) => (fullWidth ? '0' : '32px')};
  font-weight: 500;
  font-size: 16px;
  border-radius: 12px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant, theme }) => theme && getVariantStyles(variant, theme)}

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
