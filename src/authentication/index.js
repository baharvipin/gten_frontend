import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Signup from './signup/Signup';
import Container from 'react-bootstrap/Container';

import Signin from './signin/Signin';

import GetImage from './getImage/GetImage';

// Add every new route here which will be used without authentication.
const routes = [
  {
    path: '/signin',
    exact: true,
    component: Signin
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/image',
    component: GetImage
  },
  {
    path: '*',
    render: () => <Redirect to="/signin" />
  }
];

export default function() {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
  </Container>
</Navbar>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </div>
  );
}
