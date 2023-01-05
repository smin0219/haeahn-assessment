import {
  Modal as MtModal,
  OutlinedInput,
  Stack,
  TextField,
  ToggleButtonGroup as MtToggleButtonGroup,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CardHeader = styled(Stack)`
  padding-left: 38px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #dadada;
`;

export const ModalHeadText = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ModalLableText = styled(Typography)`
  font-size: 14px;
  font-weight: 350;
  color: #666666;
  padding-bottom: 8px;
`;

export const ModalTextField = styled(TextField)`
  div {
    background-color: #ffffff;
    border-radius: 4px;
  }
  display: flex;
  flex: 1;
  padding-bottom: 16px;
`;
export const ToggleTextField = styled(TextField)`
  div {
    background-color: #ffffff;
    border-radius: 4px;
  }
`;

export const ModalInput = styled(OutlinedInput)`
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
`;

export const ModalDatePicker = styled(DatePicker)`
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
`;

export const TypeButtonGroup = styled(MtToggleButtonGroup)`
  display: flex;
  flex: 1;
  button {
    font-size: 14px;
    font-weight: 350;
    background-color: #eeeeee !important;
    border-radius: 4px !important;
    color: #222222;
    display: flex;
    margin-right: 7px;
    height: 40px;
    border: 1px solid #e2e2e2 !important;
    min-width: 100px;
  }
  .Mui-selected {
    background-color: #3d4abc !important;
    color: #ffffff !important;
    border: none !important;
  }
`;

export const CenterModal = styled(MtModal)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  span:focus {
    outline: 0;
  }

  ${({ bound }) =>
    bound
      ? `
  & > div > * {
    max-height: calc(100vh - 240px);
    overflow-y: scroll;
  }
  
  `
      : ''}
`;

export function useModalToggle(onClose = _.noop) {
  const [on, toggle] = useToggle(false);

  const open = useCallback(() => {
    toggle(true);
  }, [toggle]);

  const close = useCallback(() => {
    toggle(false);
    onClose();
  }, [toggle, onClose]);

  return { on, open, close, toggle };
}
