import styled from '@emotion/styled';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 8px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};
`;

export const TableRow = styled.tr<{ isEven?: boolean }>`
  background-color: ${(props) =>
    props.isEven ? props.theme.COLORS.GRAY[0] : 'white'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.INDIGO[0]};
  }
`;

export const TableHeader = styled.th`
  padding: 16px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.COLORS.GRAY[6]};
  background-color: ${(props) => props.theme.COLORS.GRAY[1]};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[2]};

  &:first-of-type {
    width: 50%;
  }

  &:not(:first-of-type) {
    width: 25%;
  }
`;

export const TableCell = styled.td`
  padding: 14px;
  font-size: 0.9rem;
  text-align: center;
  color: ${(props) => props.theme.COLORS.GRAY[7]};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[1]};

  &:first-of-type {
    width: 50%;
  }

  &:not(:first-of-type) {
    width: 25%;
  }

  ${TableRow}:last-child & {
    border-bottom: none;
  }
`;

export const SeverityBadge = styled.span<{
  severity: 'low' | 'medium' | 'high';
}>`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.05em;

  background-color: ${(props) => {
    switch (props.severity) {
      case 'low':
        return props.theme.COLORS.GREEN[0];
      case 'medium':
        return props.theme.COLORS.YELLOW[0];
      case 'high':
        return props.theme.COLORS.RED[0];
      default:
        return undefined;
    }
  }};
  color: ${(props) => {
    switch (props.severity) {
      case 'low':
        return props.theme.COLORS.GREEN[8];
      case 'medium':
        return props.theme.COLORS.YELLOW[8];
      case 'high':
        return props.theme.COLORS.RED[8];
      default:
        return undefined;
    }
  }};
  border: 0.5px solid
    ${(props) => {
      switch (props.severity) {
        case 'low':
          return props.theme.COLORS.GREEN[1];
        case 'medium':
          return props.theme.COLORS.YELLOW[1];
        case 'high':
          return props.theme.COLORS.RED[1];
        default:
          return undefined;
      }
    }};
`;
