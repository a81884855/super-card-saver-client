import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import displayIcon from '../../assets/helper/displayIcon';

export default function Summary(props) {
  const categories = Array.from(props.selected);

  return (
    <Container>
      {categories.map((category, i) => (
        <div key={category} style={{ textTransform: 'capitalize' }}>
          <span style={{ textTransform: 'capitalize', fontSize: 'x-large' }}>
            {displayIcon(category)} {category}
          </span>
          <Row>
            <Col>Spend: {props[i][category]}</Col>
            <Col>Reward Rate: {props[i][`${category}Reward`]}</Col>
            <Col>Annual Fee: {props[i][`${category}Annual`]}</Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}
