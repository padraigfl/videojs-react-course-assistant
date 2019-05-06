import React from 'react';
import ReactDOM from 'react-dom';
import { styled } from 'linaria/react';
import { colors, spacings } from '../../constants/styles';
import { CancelButton } from '../styledShared';

const Overlay = styled('div')`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
`;
const Settings = styled('div')`
  position: relative;
  background-color: ${colors.light};
  margin: auto;
  width: 90%;
  max-width: 400px;
  padding: ${spacings.m}px;
  display: block;
`;

const SettingsModal = props => {
  return props.display
    ? ReactDOM.createPortal(
        <Overlay onClick={props.onClose}>
          <Settings onClick={e => e.stopPropagation()}>
            {props.children}
            <CancelButton
              style={{ color: colors.dark2 }}
              onClick={props.onClose}
            >
              X
            </CancelButton>
          </Settings>
        </Overlay>,
        document.getElementById('settings')
      )
    : null;
};

export default SettingsModal;
