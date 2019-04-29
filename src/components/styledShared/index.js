import { styled } from 'linaria/react';
import { colors, spacings } from '../../constants/styles';

export const ListWrapper = styled('div')`
  max-width: 350px;
  width: 30%;
  min-width: 250px;
  height: 100%;
  overflow-y: scroll;
  background-color: #${colors.light};
`;

export const ListEntry = styled('div')`
  display: flex;
  max-height: 100px;
  margin: ${spacings.xs}px;
  margin-top: ${spacings.s}px;
  overflow: hidden;
  a {
    display: block;
    color: #${colors.brand};
    font-weight: bold;
    &:hover {
      color: #${colors.dark2};
    }
  }
`;
