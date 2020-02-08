import React from 'react';
import { Row, Col, Container, Jumbotron } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import { graphql } from 'react-apollo';
import { getCategoryQuery } from '../../queries/queries.js';
import displayIcon from '../../assets/helper/displayIcon';
import Card from './Card';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Category = props => {
  const displayCards = props => {
    let { data, category } = props;
    if (data.loading) {
      return <></>;
    } else {
      return data.Cards.sort((a, b) => {
        if (b[`${category}`] === a[`${category}`]) {
          return b[`${category}Additional`].length - a[`${category}Additional`].length;
        } else {
          return b[`${category}`] - a[`${category}`];
        }
      })
        .slice(0, 8)
        .map(card => {
          return (
            <ScrollAnimation key={card.name} animateIn="fadeIn" animateOnce={true}>
              <Card card={card} category={category} />
            </ScrollAnimation>
          );
        });
    }
  };

  const displayCategoryHead = props => {
    let { data, category } = props;
    if (data.loading) {
      return <CircularProgress />;
    } else {
      const { Category } = props.data;
      return (
        <Jumbotron style={{ padding: '1rem 1rem', marginTop: '1rem' }} fluid>
          <Container>
            <h3>
              <span style={{ fontSize: 'larger', margin: '-3px 3px' }}>
                {displayIcon(category)}
              </span>
              <span style={{ textTransform: 'capitalize' }}>{category}</span>
            </h3>
            <p>{Category.detail}</p>
            <p style={{ fontSize: '12px' }}>
              * Below is a list of popular merchants in this category. While the list can be a
              helpful guide, we does not control how the bank identify merchants or purchases are
              categorized.
            </p>
            <Row>
              {Category.merchant.map(merchant => (
                <Col xs={4} key={merchant} style={{ color: 'indianred', fontSize: '14px' }}>
                  <p style={{ textAlign: 'center' }}>{merchant}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </Jumbotron>
      );
    }
  };
  return (
    <Container>
      {displayCategoryHead(props)}
      <ol>{displayCards(props)}</ol>
    </Container>
  );
};

export default graphql(getCategoryQuery, {
  options: props => {
    return {
      variables: {
        name: `${props.category}`
      }
    };
  }
})(Category);
