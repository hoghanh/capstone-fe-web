import { Layout, Row, Col } from 'antd';

function ClientFooter() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter className='client-footer' style={{ background: '#fafafa' }}>
      <Row className='just' style={{ padding: '10px 20px' }}>
        <Col xs={24} md={12} lg={12}>
          © 2023 FPT Student-Enterprise Connection Platform.
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className='footer-menu'>
            <ul>
              <li className='nav-item'>
                <a
                  href='#pablo'
                  className='nav-link text-muted'
                  target='_blank'
                >
                  Về chúng tôi
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='#pablo'
                  className='nav-link text-muted'
                  target='_blank'
                >
                  Trợ giúp
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='#pablo'
                  className='nav-link pe-0 text-muted'
                  target='_blank'
                >
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default ClientFooter;
