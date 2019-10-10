import { styled } from 'linaria/react';
import { colors, spacings } from '../../constants/styles';

export const ListSection = styled('section')`
  max-width: 350px;
  width: 30%;
  min-width: 250px;
  overflow-y: scroll;
  background-color: ${colors.dark1};
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const List = styled('ul')`
  overflow: scroll;
  max-height: 100%;
  padding-left: 0px;
  margin-top: 0px;
`;

export const ListEntry = styled('li')`
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

export const Header = styled('header')`
  margin: 0px;
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
  @media (max-width: 500px) {
    font-size: ${spacings.s}px;
  }
`;

export const EllipsisTextLine = styled('div')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CancelButton = styled('button')`
  position: absolute;
  top: 0px;
  right: 0px;
  color: ${colors.light};
  border: none;
  outline: none;
  font-size: 20px;
  background-color: transparent;
  padding-top: ${spacings.xs / 2}px;
`;
