import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Shicar.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
               Design & Develop by <a className="text-white" href="https://www.digitalraiz.com/">Digitalraiz Creative Solutions Pvt Ltd.</a> 
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
