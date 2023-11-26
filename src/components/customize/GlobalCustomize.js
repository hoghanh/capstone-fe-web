import styled, { css } from 'styled-components';
import { Button } from 'antd';
import color from 'styles/color';

const ButtonPrimary = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  height: auto;
  padding-right: 32px;
  padding-left: 32px;
  padding-bottom: 12px;
  padding-top: 12px;
  background-color: ${color.colorBluishCyan};
  border-radius: 25px;
  color: ${color.colorBlueWhale};
  border: none;
  ${(props) =>
    props.$primary &&
    css`
      background-color: ${color.colorWhite};
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    `}
  ${(props) =>
    props.$warning &&
    css`
      background-color: ${color.colorWarning};
      color: ${color.colorWhite};
    `}
    ${(props) =>
    props.$info &&
    css`
      background-color: ${color.colorInfo};
    `}
`;

const ButtonIcon = styled(Button)`
  width: auto;
  height: auto;
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  border-radius: 25px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid ${color.colorWhite};
`;

export { ButtonPrimary, ButtonIcon };
