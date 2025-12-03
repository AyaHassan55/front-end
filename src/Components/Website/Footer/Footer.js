import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5">
      <Container>
        <Row className="gy-4">

          {/* Logo + About */}
          <Col md={4}>
            <h4 className="text-light mb-3">Shop Cart</h4>
            <p className="text-secondary">
              Your one-stop shop for high quality electronic products,
              headphones, mobiles and accessories.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link " style={{color:'#3f94e9'}}>Home</Link></li>
              <li><Link to="/shop" className="footer-link"style={{color:'#3f94e9'}}>Shop</Link></li>
              <li><Link to="/cart" className="footer-link"style={{color:'#3f94e9'}}>Cart</Link></li>
              <li><Link to="/contact" className="footer-link"style={{color:'#3f94e9'}}>Contact</Link></li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={3}>
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="footer-link"style={{color:'#3f94e9'}}>FAQ</Link></li>
              <li><Link to="#" className="footer-link"style={{color:'#3f94e9'}}>Privacy Policy</Link></li>
              <li><Link to="#" className="footer-link"style={{color:'#3f94e9'}}>Terms & Conditions</Link></li>
            </ul>
          </Col>

          {/* Social */}
          <Col md={3}>
            <h5 className="mb-3">Follow Us</h5>

            <div className="d-flex gap-3">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook}/></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram}/></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter}/></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn}/></a>
            </div>
          </Col>

        </Row>

        {/* Copyright */}
        <Row className="mt-5 border-top pt-3">
          <Col className="text-center text-secondary">
            © {new Date().getFullYear()} ElectroShop. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
