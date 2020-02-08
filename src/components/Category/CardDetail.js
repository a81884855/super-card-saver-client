import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
import { getCardQuery } from '../../queries/queries.js';
import { graphql } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';

export class CardDetail extends Component {
  displayCard() {
    let { data } = this.props;
    let { Card } = data;
    if (data.loading) {
      return <CircularProgress />;
    } else {
      return (
        <div>
          <Image
            src={`/images/${Card.image}`}
            style={{
              border: 'none',
              background: 'none',
              padding: 'none',
              margin: '0 0 10px 0'
            }}
          />
          <h2>All Rewards: </h2>
          <ul>
            <li>
              Gas: {Card.gas}%{Card.gasAdditional ? ' (' + Card.gasAdditional + ')' : null}
            </li>
            <li>
              Restaurant: {Card.restaurant}%
              {Card.restaurantAdditional ? ' (' + Card.restaurantAdditional + ')' : null}
            </li>
            <li>
              Grocery: {Card.grocery}%
              {Card.groceryAdditional ? ' (' + Card.groceryAdditional + ')' : null}
            </li>
            <li>
              Online Shopping: {Card.online}%
              {Card.onlineAdditional ? ' (' + Card.onlineAdditional + ')' : null}
            </li>
            <li>
              Travel: {Card.travel}%
              {Card.travelAdditional ? ' (' + Card.travelAdditional + ')' : null}
            </li>
            <li>
              Furnitures: {Card.furnitures}%
              {Card.furnituresAdditional ? ' (' + Card.furnituresAdditional + ')' : null}
            </li>
            <li>
              Utilities: {Card.utilities}%
              {Card.utilitiesAdditional ? ' (' + Card.utilitiesAdditional + ')' : null}
            </li>
            <li>
              Phone: {Card.phone}%{Card.phoneAdditional ? ' (' + Card.phoneAdditional + ')' : null}
            </li>
          </ul>
          <h3>Card Detail: </h3>
          {Card.desc.split('\n').map(p => (
            <p key={p}>{p}</p>
          ))}
          <h3>Annual Fee: </h3>
          <p>${Card.annual}</p>
          <h3>Aplication Link:</h3>
          <li>
            <a href={Card.website}>{Card.name}</a>
          </li>
        </div>
      );
    }
  }

  render() {
    return <Container>{this.displayCard()}</Container>;
  }
}

export default graphql(getCardQuery, {
  options: props => {
    return {
      variables: {
        // name: props.match.params.name
        name: props.name
      }
    };
  }
})(CardDetail);
