import { Nav, Accordion } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function TestUI() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home" className={currentPath === '/home' ? 'active' : ''}>
        Home
      </Nav.Link>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Components</Accordion.Header>
          <Accordion.Body>
            <Nav.Link href="/components/buttons" className={currentPath === '/components/buttons' ? 'active' : ''}>
              Buttons
            </Nav.Link>
            <Nav.Link href="/components/modals" className={currentPath === '/components/modals' ? 'active' : ''}>
              Modals
            </Nav.Link>
            {/* ...更多组件链接 */}
          </Accordion.Body>
        </Accordion.Item>
        {/* ...更多Accordion项 */}
      </Accordion>
    </Nav>
  );
}

export default TestUI;