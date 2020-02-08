import { gql } from 'apollo-boost';

const getCardsQuery = gql`
  {
    Cards {
      id
      name
      image
      gas
      gasAdditional
      gasLimit
      restaurant
      restaurantAdditional
      restaurantLimit
      grocery
      groceryAdditional
      groceryLimit
      streaming
      streamingAdditional
      streamingLimit
      online
      onlineAdditional
      onlineLimit
      travel
      travelAdditional
      travelLimit
      furnitures
      furnituresAdditional
      furnituresLimit
      utilities
      utilitiesAdditional
      utilitiesLimit
      phone
      phoneAdditional
      phoneLimit
      desc
      website
      annual
    }
  }
`;

const getCardQuery = gql`
  query($name: String!) {
    Card(name: $name) {
      id
      name
      image
      gas
      gasAdditional
      gasLimit
      restaurant
      restaurantAdditional
      restaurantLimit
      grocery
      groceryAdditional
      groceryLimit
      streaming
      streamingAdditional
      streamingLimit
      online
      onlineAdditional
      onlineLimit
      travel
      travelAdditional
      travelLimit
      furnitures
      furnituresAdditional
      furnituresLimit
      utilities
      utilitiesAdditional
      utilitiesLimit
      phone
      phoneAdditional
      phoneLimit
      desc
      website
      annual
    }
  }
`;

const getCategoriesQuery = gql`
  {
    Categories {
      name
      id
    }
  }
`;

const getCategoryQuery = gql`
  query($name: String!) {
    Category(name: $name) {
      id
      name
      detail
      merchant
    }

    Cards {
      id
      name
      image
      gas
      gasAdditional
      gasLimit
      restaurant
      restaurantAdditional
      restaurantLimit
      grocery
      groceryAdditional
      groceryLimit
      streaming
      streamingAdditional
      streamingLimit
      online
      onlineAdditional
      onlineLimit
      travel
      travelAdditional
      travelLimit
      furnitures
      furnituresAdditional
      furnituresLimit
      utilities
      utilitiesAdditional
      utilitiesLimit
      phone
      phoneAdditional
      phoneLimit
      desc
      website
      annual
    }
  }
`;

const addCommentMutation = gql`
  mutation addComment($title: String!, $content: String!) {
    addComment(title: $title, content: $content) {
      title
      content
    }
  }
`;

export { getCardsQuery, getCardQuery, getCategoriesQuery, getCategoryQuery, addCommentMutation };
