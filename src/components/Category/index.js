import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getCategoriesQuery } from '../../queries/queries.js';
import { Container, Row, Col } from 'react-bootstrap';
import Category from './Category';
import displayIcon from '../../assets/helper/displayIcon';

export const Categories = props => {
  const { data } = props;
  const [select, setSelect] = useState('Gas');

  if (data.loading) {
    return <></>;
  } else {
    if (!data.Categories) return <div>Sorry! Can't fetch data from server</div>;
    const { Categories } = data;
    return (
      <Container style={{ margin: '1rem auto' }}>
        <Row style={{ minHeight: '100vh' }}>
          <Col sm={12} lg={5}>
            <h3 style={{ margin: '0px 0px 20px 20px' }}>Category</h3>
            <Row style={{ margin: '0 auto 10px', width: '95%' }}>
              {Categories.map(category => (
                <Col xs={4} className="categories" key={category.name}>
                  <button className="category_container" onClick={() => setSelect(category.name)}>
                    {displayIcon(category.name)}
                    <span style={{ textTransform: 'capitalize' }}>{category.name}</span>
                  </button>
                </Col>
              ))}
            </Row>
          </Col>
          <Col style={{ background: 'aliceblue' }}>
            <Category data={data} category={select.toLowerCase()} />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default graphql(getCategoriesQuery)(Categories);
