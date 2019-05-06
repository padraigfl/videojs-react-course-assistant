import React from 'react';
import { styled } from 'linaria/react';
import { Heading as StyledHead } from '../styledShared';
import { colors, spacings } from '../../constants/styles';
import SettingsModal from './SettingsModal';

const SettingsButton = styled('button')`
  display: flex;
  background-color: transparent;
  border: none;
  color: ${colors.light};
  padding: 0px ${spacings.xs}px;
  align-self: center;
  align-content: center;
  margin-left: auto;
  font-size: 24px;
  filter: brightness(50%);
`;

const Heading = props => {
  const [modal, toggleModal] = React.useState();
  return (
    <StyledHead className={props.className}>
      {props.children}
      <SettingsButton onClick={() => toggleModal(true)}>
        {props.icon || '⚙'}
      </SettingsButton>
      <SettingsModal onClose={() => toggleModal(false)} display={modal}>
        {props.settingsView}
      </SettingsModal>
    </StyledHead>
  );
};

export default Heading;
