import React from 'react';
import { styled } from 'linaria/react';
import { Header } from '../styledShared';
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
  const HTag = `h${props.level}`;
  return (
    <Header className={props.className}>
      <HTag>{props.children}</HTag>
      <SettingsButton onClick={() => toggleModal(true)}>
        {props.icon || '⚙'}
      </SettingsButton>
      <SettingsModal onClose={() => toggleModal(false)} display={modal}>
        {props.settingsView}
      </SettingsModal>
    </Header>
  );
};

Heading.defaultProps = {
  level: 5
};

export default Heading;
