import React from 'react';
import AllCards from './components/AllCards';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layouts/layout';
import Categories from './components/Category';
import NotFound from './components/NotFound';
import Calculator from './components/Calculator/';
import Home from './components/Home';
import CardAdvisor from './components/CardAdvisor/';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/category" exact render={() => <Categories />} />
          <Route path="/cards" exact render={props => <AllCards {...props} />} />
          <Route path="/calculator" exact render={props => <Calculator {...props} />} />
          <Route path="/card-advisor" exact render={props => <CardAdvisor {...props} />} />
          <Route render={props => <NotFound {...props} />} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
