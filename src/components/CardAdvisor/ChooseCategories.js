import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import displayIcon from '../../assets/helper/displayIcon';

const allCategory = [
  'gas',
  'restaurant',
  'grocery',
  'travel',
  'online',
  'furnitures',
  'streaming',
  'utilities',
  'phone'
];

export default function ChooseCategories(props) {
  const { selected, handleAddCategory } = props;

  const handleSelect = category => {
    if (selected.has(category)) {
      selected.delete(category);
    } else {
      selected.size < 3 && selected.add(category);
    }
    handleAddCategory(Array.from(selected));
  };

  return (
    <Container style={{ padding: '1rem auto' }}>
      <h3 style={{ marginLeft: '1rem' }}>Select the biggest spending categories (Maxium 3 )</h3>
      <Row xs={12} lg={6} style={{ margin: '20px 1rem 10px', maxWidth: 550 }}>
        {allCategory.map(category => (
          <Col md={2} xs={4} className="categories" key={category}>
            <button
              className={`category_icon ${selected.has(category) && 'category_icon_selected'}`}
              onClick={() => handleSelect(category)}
            >
              {displayIcon(category)}
              <span style={{ textTransform: 'capitalize' }}>{category}</span>
            </button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// export default ChooseCategories;
