import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Route, Link , Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Signin.scss';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      data: null
    };
  }
 
  // handler function  start

  handleForm = (name, value) => {
    this.setState({
      [name]: value
    });
    console.log('this.state', this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
  
    const { email, password } = this.state;
    let data = { 
      email: email,
      password: password
    };

    axios
      .post('http://localhost:4000/signin', data)
      .then(data => {
        console.log('Got data', data);
        this.setState({
            ...this.state,
            isLogin: true,
            data: data
        })
      })
      .catch(error => {
        console.log('Error', error);
      });
  };
  // handler function  end

  // render component start
  renderHeading() {
    return <h2>Sign in</h2>;
  }

  renderSignInForm() {
    const formField = [
      {
        controlId: 'formBasicEmail',
        type: 'email',
        placeholder: 'Enter email*',
        stateName: 'email'
      },
      {
        controlId: 'formBasicPassword',
        type: 'password',
        placeholder: 'Password*',
        stateName: 'password'
      }
    ];
    return (
      <Form noValidate onSubmit={e => this.handleSubmit(e)}>
        {formField.map((item, index) => {
          return (
            <Form.Group controlId={item.controlId} key={'str_' + index}>
              <Form.Control
                type={item.type}
                placeholder={item.placeholder}
                onChange={e => this.handleForm(item.stateName, e.target.value)}
              />
            </Form.Group>
          );
        })}
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    );
  }

  renderRoutingOption(width, to, text, align) {
    return (
      <Col xs={width} className="unBullet">
        <Route
          path={to}
          children={({ match }) => (
            <li className={align}>
              <Link to={to}>{text}</Link>
            </li>
          )}
        />
      </Col>
    );
  }

  renderSelectOption() {
    return (
      <Container className="selectOption">
        <Form.Row className="routeAlign">
          {this.renderRoutingOption(
            7,
            '/signup',
            "Don't have an account? Sign Up ",
            'leftAlign'
          )}
        </Form.Row>
      </Container>
    );
  }

  redirectToImagePage() {
    return this.state.isLogin ? <Redirect to="/image" /> : null;
  }

  // render component end

  // render main component

  render() {
    return (
      <div className="signin">
        {this.renderHeading()}
        {this.renderSignInForm()}
        {this.renderSelectOption()}
        {this.redirectToImagePage()}
      </div>
    );
  }
}

export default Signin;
