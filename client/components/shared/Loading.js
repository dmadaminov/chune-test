import React from 'react'
import { Row, Col, ProgressBar } from 'react-materialize'

const Loading = (props) => {
  return (
    <Row>
      <Col s={12}>
        <ProgressBar className="chune-progressbar" color="cyan" />
      </Col>
    </Row>
  );
}

export default Loading;
