import React, { Component, useState } from 'react';
import { graphql } from 'react-apollo';
import { getCardsQuery } from '../../queries/queries.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import CardDetail from '../Category/CardDetail';

export class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.compare = this.compare.bind(this);
  }

  compare(cards) {
    const { selected } = this.props;
    const categories = Array.from(selected);
    cards.forEach(card => {
      categories.forEach((category, index) => {
        let total_reward = card[category] * 12 * this.props[index][category];
        let overLimit = this.props[index][category] * 12 > card[`${category}Limit`];
        if (overLimit)
          total_reward -=
            ((card[category] - 1) / 100) * 12 * (total_reward - card[`${category}Limit`]);
        total_reward = total_reward / 100 - card.annual;
        if (!this.state[category] || total_reward > this.state[category] || 0) {
          this.setState({ [category]: total_reward, [`${category}Card`]: card });
        }
      });
    });
  }

  displayResult = props => {
    const { data, selected } = props;
    const categories = Array.from(selected);
    if (data.loading) {
      return (
        <span>
          Calculating
          <CircularProgress />
        </span>
      );
    } else {
      this.compare(data.Cards);
      return categories.map((category, index) => {
        return (
          <Card
            key={category}
            info={this.props[index]}
            reward={this.state[category]}
            category={category}
            card={this.state[`${category}Card`]}
          />
        );
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>{this.displayResult(this.props)}</Row>
      </Container>
    );
  }
}

export function Card({ card, category, info, reward }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {card && (
        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{card.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CardDetail name={card.name} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" href={card.website}>
                Learn More
              </Button>
            </Modal.Footer>
          </Modal>

          <Col
            xs={10}
            lg={4}
            key={card.id}
            style={{ margin: '10px auto 30px' }}
            onClick={() =>
              reward >=
              (info[category] * info[`${category}Reward`] * 12) / 100 - info[`${category}Annual`]
                ? setShow(true)
                : null
            }
          >
            <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{category} Card</h3>
            <Image
              src={`/images/${card.image}`}
              style={{
                width: '100%',
                border: 'none'
              }}
              thumbnail
            />
            <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'tomato' }}>{card.name} </p>
            <Container style={{ textAlign: 'center' }}>
              <Row style={{ fontWeight: 700 }}>
                <Col xs={3}>Yours</Col>
                <Col style={{ padding: 0 }} xs={{ span: 3, offset: 6 }}>
                  Suggested
                </Col>
              </Row>
              <Row>
                <Col xs={3}>{info[`${category}Reward`]}</Col>
                <Col xs={6}>% Reward </Col>
                <Col xs={3}>{card[category]}</Col>
              </Row>
              <Row>
                <Col xs={3}>{info[`${category}Annual`] | 0}</Col>
                <Col xs={6}>Annual Fee</Col>
                <Col xs={3}>{card.annual}</Col>
              </Row>
              <Row>
                <Col xs={3}>
                  $
                  {(info[category] * info[`${category}Reward`] * 12) / 100 -
                    info[`${category}Annual`]}
                  {reward <=
                    (info[category] * info[`${category}Reward`] * 12) / 100 -
                      info[`${category}Annual`] && (
                    <Image src="/win.png" style={{ width: 38, marginLeft: 3 }} />
                  )}
                </Col>
                <Col xs={6}>Annual Saving</Col>
                <Col xs={3}>
                  ${Math.round(reward)}{' '}
                  {reward >=
                    (info[category] * info[`${category}Reward`] * 12) / 100 -
                      info[`${category}Annual`] && (
                    <Image src="/win.png" style={{ width: 38, marginLeft: 3 }} />
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </>
      )}
    </>
  );
}

export default graphql(getCardsQuery)(Result);
