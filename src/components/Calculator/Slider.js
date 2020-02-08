import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Slider,
  Input,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Image } from 'react-bootstrap';
import displayIcon from '../../assets/helper/displayIcon';
import ClearIcon from '@material-ui/icons/Clear';
import { graphql } from 'react-apollo';
import { getCardsQuery } from '../../queries/queries.js';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginLeft: -10,
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

export function CustomSlider(props) {
  const [card, setCard] = useState('');
  const { category, value, saving, reward, limit } = props;
  const displayCards = categoryName => {
    let data = props.data;
    if (data.loading) {
      return <CircularProgress />;
    } else {
      return data.Cards.sort((a, b) => b[categoryName] - a[categoryName])
        .slice(0, 6)
        .filter(card => card[categoryName] > 2)
        .map(card => {
          return (
            <MenuItem
              key={card.name}
              value={
                card.name +
                '/' +
                card[categoryName] +
                '/' +
                card[`${categoryName}Limit`] +
                '/' +
                card.annual
              }
            >
              <Image
                src={`/images/${card.image}`}
                style={{
                  border: 'none',
                  background: 'none',
                  width: 40,
                  marginRight: 5
                }}
              />
              {' ' + card[categoryName]}%{' ' + card.name}
              {card[`${categoryName}Limit`] <= 2000 &&
                ` (Quarterly Limit: ${card[`${categoryName}Limit`]})`}
              {card[`${categoryName}Limit`] >= 2000 &&
                card[`${categoryName}Limit`] <= 10000 &&
                ` (Quarterly Limit: ${card[`${categoryName}Limit`] / 4})`}
            </MenuItem>
          );
        });
    }
  };

  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    props.handleSliderChange(category, newValue);
  };

  const handleInputChange = event => {
    props.handleInputChange(category, event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    props.handleBlur(category);
  };

  const handleCardChange = e => {
    props.handleCardChange(category, e.target.value);
    setCard(e.target.value);
  };

  return (
    <div className={classes.root}>
      <span style={{ textTransform: 'capitalize', marginBottom: 3 }}>
        {category} reward:
        <span style={{ color: '#388e3c', fontWeight: 'bold' }}>
          {saving && `$${Math.round(props.saving / 12)}/month  `}
        </span>
        {/* {props.annual > 0 && `($${props.annual} Annual Fee)`} */}
        <span style={{ color: 'tomato' }}>
          {limit < 100000 && `(Only first $${limit} purchase get ${reward * 100}%)`}
        </span>
      </span>
      <Grid container spacing={2} alignItems="center" style={{ margin: 0 }}>
        <Grid item style={{ fontSize: '1.6rem', marginTop: -2 }}>
          {displayIcon(category)}
        </Grid>
        <Grid item xs id={category}>
          <PrettoSlider
            id={category}
            value={value}
            onChange={handleSliderChange}
            aria-label="pretto slider"
            max={10000}
            step={100}
          />
        </Grid>
        <Grid item style={{ marginTop: -5 }}>
          <Input
            className={classes.input}
            value={value}
            style={{ width: '100%' }}
            margin="dense"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <ClearIcon />
              </InputAdornment>
            }
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 100,
              min: 0,
              max: 10000,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl style={{ width: '100%' }} variant="outlined" className={classes.formControl}>
            <InputLabel>{reward * 100}% Card</InputLabel>
            <Select value={card} onChange={handleCardChange}>
              {displayCards(category)}
              <MenuItem value="/2//">2% Credit Card</MenuItem>
              <MenuItem value="/1//">1% Credit Card</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default graphql(getCardsQuery)(CustomSlider);
