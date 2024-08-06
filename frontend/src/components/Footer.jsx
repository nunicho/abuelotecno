import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../assets/styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerClass">
      {" "}
      {/* Añadir clase 'footer' aquí */}
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Sobre Nosotros</h5>
            <p>
              Somos una tienda especializada en tecnología, dedicada a ofrecer
              los mejores productos y servicios a nuestros clientes.
            </p>
          </Col>
          <Col md={2} className="mb-3 mb-md-0">
            <h5>Enlaces Útiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Contáctanos</h5>
            <ul className="list-unstyled">
              <li>Email: contacto@abuelotecno.com</li>
              <li>Teléfono: +54 9 1234 5678</li>
              <li>Dirección: Calle Falsa 123, Buenos Aires, Argentina</li>
            </ul>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Síguenos</h5>
            <div>
              <a
                href="https://facebook.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">
              &copy; {currentYear} Abuelo Tecno. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

/*
import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";

const Footer = () => {

    const currentYear = new Date().getFullYear()

  return (
    <footer>
        <Container>
             <Row>
                <Col className='text-center py-3'>
                    <p>Abuelo Tecno &copy; {currentYear}</p>
                </Col>
             </Row>
        </Container>
    </footer>
  )
}

export default Footer
*/
