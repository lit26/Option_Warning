import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const footerStyle={
    paddingTop: "30px",
    paddingBottom: "30px",
    color: "#fff",
    background: "#2e2e2e",
    textAlign: "left"
}

function Footer() {
    return (
        <footer style={footerStyle}>
        <Container>
            <Row>
                <Col sm="6">Copyright © 2020 Tianning Li. All Rights Reserved.</Col>
            </Row>
        </Container>
      </footer>          
    );
  }
  
export default Footer;