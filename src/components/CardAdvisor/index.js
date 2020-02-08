import React, { Component } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import { Container } from 'react-bootstrap';
import Spend from './Spend';
import ChooseCategories from './ChooseCategories';
import Summary from './Summary';
import Result from './Result';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export class VerticalLinearStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selected: new Set(),
      steps: ['Select Categories', 'Summary'],
      open: false,
      message: ''
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleCategoryDetail = this.handleCategoryDetail.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleRewardBlur = this.handleRewardBlur.bind(this);
    this.handleAnnualBlur = this.handleAnnualBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNext = () => {
    const { activeStep, selected, steps } = this.state;
    if (activeStep === 0) {
      let categories = [];
      Array.from(selected).forEach(category =>
        categories.push({
          [category]: 0,
          [`${category}Reward`]: 1,
          [`${category}Annual`]: 0
        })
      );
      if (selected.size === 0) {
        this.setState({
          open: true,
          message: 'You need to select at least one category !'
        });
      } else {
        this.setState({
          activeStep: activeStep + 1,
          ...categories
        });
      }
    } else {
      if (activeStep === steps.length - 1) {
        this.setState({
          activeStep: activeStep + 1
        });
      } else if (
        activeStep < steps.length &&
        this.state[activeStep - 1][Array.from(selected)[activeStep - 1]] === 0
      ) {
        this.setState({
          open: true,
          message: 'Category Spending Should Larger than 0 !'
        });
      } else {
        this.setState({
          activeStep: activeStep + 1
        });
      }
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleAddCategory = categories => {
    const { steps } = this.state;
    steps.splice(1, steps.length - 2, ...categories);
    this.setState({
      steps
    });
  };

  handleCategoryDetail = (detail, value) => {
    const { activeStep } = this.state;
    let info = this.state[activeStep - 1];
    info[detail] = value;
    this.setState({ info });
  };

  handleBlur(category, step) {
    let item = this.state[step];
    if (item[category] > 5000) {
      item[category] = 5000;
    } else if (item[category] < 0) {
      item[category] = 0;
    }
    this.setState({ item });
  }

  handleRewardBlur(category, step) {
    let item = this.state[step];
    if (item[`${category}Reward`] > 100) {
      item[`${category}Reward`] = 100;
    } else if (item[`${category}Reward`] < 0 || item[`${category}Reward`] === '') {
      item[`${category}Reward`] = 0;
    }
    this.setState({ item });
  }

  handleAnnualBlur(category, step) {
    let item = this.state[step];
    if (item[`${category}Annual`] < 0 || !item[`${category}Annual`]) {
      item[`${category}Annual`] = 0;
    }
    this.setState({ item });
  }

  getStepContent(step) {
    const { steps, selected } = this.state;
    if (step === steps.length - 1) {
      return <Summary {...this.state} />;
    } else if (step === 0) {
      return <ChooseCategories selected={selected} handleAddCategory={this.handleAddCategory} />;
    } else {
      return (
        <Spend
          category={steps[step]}
          handleCategoryDetail={this.handleCategoryDetail}
          handleBlur={this.handleBlur}
          handleRewardBlur={this.handleRewardBlur}
          handleAnnualBlur={this.handleAnnualBlur}
          {...this.state}
          step={step}
        />
      );
    }
  }

  render() {
    const { activeStep, steps, open, message } = this.state;
    return (
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key={message}
          open={open}
          onClose={this.handleClose}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span>
                <WarningIcon style={{ marginRight: 10 }} />
                {message}
              </span>
            }
            style={{ backgroundColor: '#d32f2f' }}
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={this.handleStep(index)}>
                <span style={{ textTransform: 'capitalize' }}>{label}</span>
              </StepLabel>
              <StepContent>
                {this.getStepContent(index)}
                <Container>
                  <Button disabled={activeStep === 0} onClick={this.handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Container>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Container>
            <Button variant="contained" color="primary" onClick={this.handleReset}>
              Reset
            </Button>
            <Result {...this.state} />
          </Container>
        )}
      </Container>
    );
  }
}

export default VerticalLinearStepper;
