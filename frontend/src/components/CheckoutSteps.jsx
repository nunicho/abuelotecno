import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

import React from 'react'


const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Loguearse</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Registrase</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Envío</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Envío</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Pago</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pago</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Generar Orden</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Generar Orden</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps