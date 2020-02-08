import Header from './header';
import FooterPage from './footer';
import ScrollUpButton from 'react-scroll-up-button';
import React, { Component } from 'react';

export class layout extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <ScrollUpButton />
        <FooterPage />
      </>
    );
  }
}

export default layout;
