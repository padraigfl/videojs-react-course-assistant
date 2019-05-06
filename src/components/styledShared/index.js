import { styled } from 'linaria/react';
import { colors, spacings } from '../../constants/styles';

export const ListWrapper = styled('div')`
  max-width: 350px;
  width: 30%;
  min-width: 250px;
  overflow-y: scroll;
  background-color: ${colors.dark1};
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const List = styled('div')`
  overflow: scroll;
  max-height: 100%;
`;

export const ListEntry = styled('div')`
  position: relative;
  display: flex;
  max-height: 100px;
  padding: ${spacings.xs}px;
  box-shadow: 0px 0px 0px 1px ${colors.accent};
  background-color: ${colors.dark1};
  overflow: hidden;
  a {
    display: block;
    color: ${colors.brand};
    font-weight: bold;
    &:hover {
      color: ${colors.accent};
    }
  }
`;

export const Heading = styled('div')`
  padding: ${spacings.xs}px;
  font-size: ${spacings.m}px;
  font-weight: bold;
  color: ${colors.light};
  background-color: ${colors.brand};
  display: flex;
  &.invert {
    color: ${colors.brand};
    background-color: ${colors.light};
  }
`;
