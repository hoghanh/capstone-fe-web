import styled, { css } from 'styled-components';
import { Button } from 'antd';
import color from 'styles/color';
import ReactShowMoreText from 'react-show-more-text';

const ButtonPrimary = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  height: auto;
  padding: 12px 32px;
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

const ShowMoreText = styled(ReactShowMoreText)``

export { ButtonPrimary, ButtonIcon, ShowMoreText };
