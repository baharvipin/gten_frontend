import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Signup.scss';

class Signup extends Component {
  constructor() {
    super();
    this.state = {};
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

    const { name, email, password, mobile } = this.state;
    let data = {
      name: name,
      email: email,
      password: password,
      mobile: mobile
    };
  
    axios
      .post('http://localhost:4000/signup', data)
      .then(data => {
        console.log('Got data', data);
      })
      .catch(error => {
        console.log('Error', error);
      });

    console.log(this.state);
  };
  // handler function  end

  // render component start
  renderHeading() {
    return <h2>Create an account</h2>;
  }
  renderSignUpForm() {
    const formField = [
      {
        controlId: 'formBasicName',
        type: 'name',
        placeholder: 'Enter your name*',
        stateName: 'name'
      },
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
      },
      {
        controlId: 'formBasicMobile',
        type: 'number',
        placeholder: 'Mobile No.*',
        stateName: 'mobile'
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
          Create Account
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
            '/signin',
            'Already have an account? Sign in',
            'leftAlign'
          )}
        </Form.Row>
      </Container>
    );
  }
  // render component end

  // render main component

  render() {
    return (
      <div className="signup">
        {this.renderHeading()}
        {this.renderSignUpForm()}
        {this.renderSelectOption()}
      </div>
    );
  }
}

export default Signup;
