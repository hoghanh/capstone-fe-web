// CustomCard.js
import { Card, Col, Divider, Row } from 'antd';
import color from '../../styles/color';

const CustomCard = ({ children, ...rest }) => {
  return (
    <Card style={{ boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)', padding: 10, ...rest.style }}>
      {children}
    </Card>
  );
};

const CustomRow = ({ children, ...rest }) => {
  return (
    <Row style={{ padding: 10, ...rest.style }}>
      {children}
    </Row>
  );
};

const CustomCol = ({ children, ...rest }) => {
  return (
    <Col {...rest} style={{ padding: 10, ...rest.style }}>
      {children}
    </Col>
  );
};

const SizeBox = ({ children, ...rest }) => {
  return (
    <div style={{ padding: 10, ...rest.style }}>
      {children}
    </div>
  );
};

const CustomDivider = ({...rest})=>{
  return <Divider style={{...rest.style, backgroundColor: color.colorBlueWhale, margin: '0 0 10px 0'}}/>
}

export { CustomCard, CustomRow, CustomCol, SizeBox, CustomDivider };
