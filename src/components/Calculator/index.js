import React, { Component } from 'react';
import CustomSlider from './Slider';
import { Row, Col, Container } from 'react-bootstrap';
import { MenuItem, Button, Menu, Paper, Divider } from '@material-ui/core';
import DonutChart from './DonutChart';
import displayIcon from '../../assets/helper/displayIcon';

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: 500,
      restaurantReward: 0.01,
      restaurantSaving: 60,
      grocery: 300,
      groceryReward: 0.01,
      grocerySaving: 36,
      gas: 200,
      gasReward: 0.01,
      gasSaving: 24,
      chosen: ['restaurant', 'grocery', 'gas'],
      other: ['online', 'phone', 'travel', 'furnitures', 'streaming', 'utilities'],
      anchorEl: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlerAdd = this.handlerAdd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  handlerAdd = category => {
    let { chosen, other } = this.state;
    chosen.push(category);
    other = other.filter(x => x !== category);
    this.setState({
      chosen,
      other,
      [category]: 0,
      [`${category}Reward`]: 0.01
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSliderChange(category, newValue) {
    let limit = this.state[`${category}Limit`] | 0;
    let saving = this.state[`${category}Reward`] * newValue * 12;
    if (newValue * 12 > limit)
      saving -= (newValue * 12 - limit) * (this.state[`${category}Reward`] - 0.01);
    this.setState({
      [category]: newValue,
      [`${category}Saving`]: saving
    });
  }

  handleInputChange(category, value) {
    let limit = this.state[`${category}Limit`] | 0;
    let saving = this.state[`${category}Reward`] * value * 12;
    if (value * 12 > limit)
      saving -= (value * 12 - limit) * (this.state[`${category}Reward`] - 0.01);
    this.setState({
      [category]: value,
      [`${category}Saving`]: saving
    });
  }

  handleCardChange(category, card) {
    const spend = this.state[category];
    let [name, rate, limit, annual] = card.split('/');
    rate = rate / 100;
    let annualSpend = spend * 12;
    let saving = 0;
    if (annualSpend > limit) {
      saving = limit * rate + (annualSpend - limit) * 0.01;
    } else {
      saving = annualSpend * rate;
    }

    this.setState({
      [`${category}Card`]: name,
      [`${category}Reward`]: rate,
      [`${category}Saving`]: saving,
      [`${category}Annual`]: annual,
      [`${category}Limit`]: limit
    });
  }

  handleBlur(category) {
    if (this.state[category] > 10000) {
      this.setState({
        [category]: 10000,
        [`${category}Saving`]: 10000 * this.state[`${category}Reward`] * 12
      });
    } else if (this.state[category] < 0) {
      this.setState({
        [category]: 0
      });
    }
  }

  render() {
    const { chosen, other, anchorEl } = this.state;
    return (
      <Container style={{ margin: '1rem auto', minHeight: '100vh' }}>
        <Row style={{ marginTop: 50 }}>
          <Col sm={12} lg={5} style={{ marginBottom: 40 }}>
            <DonutChart {...this.state} />
          </Col>
          <Col sm={12} lg={7} style={{ margin: '5px auto' }}>
            <Paper style={{ padding: '1.5rem 2.5rem 2.5rem 1.5rem' }}>
              <Row style={{ marginBottom: 10 }}>
                <Col sm={7} md={7}>
                  <h2>Monthly Spending</h2>
                </Col>
                <Col sm={5} md={5} style={{ textAlign: 'right' }}>
                  <Button
                    style={{ margin: 5 }}
                    variant="contained"
                    color="primary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    Add Category
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    {other.map(category => (
                      <MenuItem
                        key={category}
                        value={category}
                        onClick={() => this.handlerAdd(category)}
                      >
                        {displayIcon(category)}
                        <span className="ml-2" style={{ textTransform: 'capitalize' }}>
                          {category}
                        </span>
                      </MenuItem>
                    ))}
                  </Menu>
                </Col>
              </Row>
              {chosen.map(category => (
                <div key={category}>
                  <CustomSlider
                    category={category}
                    reward={this.state[`${category}Reward`]}
                    saving={this.state[`${category}Saving`]}
                    limit={this.state[`${category}Limit`]}
                    value={this.state[category]}
                    handleCardChange={this.handleCardChange}
                    handleSliderChange={this.handleSliderChange}
                    handleInputChange={this.handleInputChange}
                    handleBlur={this.handleBlur}
                  />
                  <Divider />
                </div>
              ))}
            </Paper>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calculator;
