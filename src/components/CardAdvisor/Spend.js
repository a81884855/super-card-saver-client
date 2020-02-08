import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Slider,
  Input,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormLabel
} from '@material-ui/core';
import displayIcon from '../../assets/helper/displayIcon';
import { Container } from 'react-bootstrap';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '8px 0px 8px 0'
    // padding: '3px 6px 0px 6px'
  },
  input: {
    marginLeft: 5,
    width: 30
  }
});

const PrettoSlider = withStyles({
  root: {
    // color: '#52af77',
    // height: 10
  },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -5,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export function Spend(props) {
  const { category, step } = props;
  const detail = props[step - 1];
  const classes = useStyles();
  const [custom, setCustom] = React.useState(false);
  const [reward, setreward] = React.useState(1);

  const handleSliderChange = (event, newValue) => {
    props.handleCategoryDetail(category, newValue);
  };

  const handleInputChange = event => {
    props.handleCategoryDetail(
      event.target.id,
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    props.handleBlur(category, step - 1);
  };

  const handleRewardBlur = () => {
    props.handleRewardBlur(category, step - 1);
  };

  const handleAnnualBlur = () => {
    props.handleAnnualBlur(category, step - 1);
  };

  const handleRewardChange = e => {
    if (e.target.value === 'custom') {
      setCustom(true);
    } else {
      props.handleCategoryDetail(e.target.name, e.target.value);
      setCustom(false);
    }
    setreward(e.target.value);
  };

  return (
    <Container style={{ fontSize: 20, padding: '0.5rem 0 0 2rem' }}>
      <Grid item lg={8} md={10}>
        <div className={classes.root}>
          <div style={{ margin: '5px 0 15px 0' }}>
            What is your{'  '}
            <span className="categoryName">{category}</span>
            {'  '}
            spending of each month?
          </div>
          <Grid container spacing={2} alignItems="center" style={{ margin: '10px 0 20px 5px' }}>
            <Grid item xs={1} style={{ fontSize: '2.1rem', marginTop: -5, minWidth: 40 }}>
              {displayIcon(category)}
            </Grid>
            <Grid item xs={8} sm={6} md={6} id={category}>
              <PrettoSlider
                id={category}
                value={detail[category]}
                onChange={handleSliderChange}
                aria-label="pretto slider"
                max={5000}
                step={100}
              />
            </Grid>
            <Grid item xs={2} style={{ margin: '-3px 0 3px 5px', minWidth: 140, padding: 4 }}>
              <Input
                className={classes.input}
                id={category}
                value={detail[category]}
                style={{ width: '100%' }}
                margin="dense"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">/month</InputAdornment>}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 100,
                  min: 0,
                  max: 5000,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </Grid>
          </Grid>

          <Grid container style={{ margin: '10px 0 20px 5px' }}>
            <Grid item md={6} sm={10} style={{ margin: '10px 0 15px' }}>
              <FormLabel component="legend">Your Credit Card Reward</FormLabel>
              <Grid container>
                <Grid item xs={7} style={{ maxWidth: 170 }}>
                  <FormControl
                    style={{ width: '100%', maxWidth: 160 }}
                    variant="outlined"
                    className={classes.formControl}
                    id={`${category}Reward`}
                  >
                    <Select value={reward} name={`${category}Reward`} onChange={handleRewardChange}>
                      <MenuItem value={5}>5% Reward</MenuItem>
                      <MenuItem value={4}>4% Reward</MenuItem>
                      <MenuItem value={3}>3% Reward</MenuItem>
                      <MenuItem value={2}>2% Reward</MenuItem>
                      <MenuItem value={1}>1% Reward</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                      <MenuItem value={0}>0% / Unknown</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  {custom && (
                    <Grid style={{ margin: '10px 0 0 0px' }}>
                      <Input
                        className={classes.input}
                        id={`${category}Reward`}
                        value={detail[`${category}Reward`]}
                        style={{ width: 60 }}
                        margin="dense"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        onChange={handleInputChange}
                        onBlur={handleRewardBlur}
                        inputProps={{
                          step: 100,
                          min: 0,
                          max: 5000,
                          type: 'number',
                          'aria-labelledby': 'input-slider'
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ margin: '10px 0 15px', maxWidth: 180 }} md={5} sm={10}>
              <FormLabel component="legend">Annual Fee</FormLabel>
              <Input
                className={classes.input}
                id={`${category}Annual`}
                value={detail[`${category}Annual`]}
                style={{ width: '100%', marginTop: 15 }}
                margin="dense"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">/year</InputAdornment>}
                onChange={handleInputChange}
                onBlur={handleAnnualBlur}
                inputProps={{
                  step: 100,
                  min: 0,
                  max: 5000,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}

export default Spend;
