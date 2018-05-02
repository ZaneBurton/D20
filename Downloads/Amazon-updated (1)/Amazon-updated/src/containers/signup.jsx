//borrowed code from https://serverless-stack.com/chapters/create-a-login-page.html for the sign-up and login pages

import React, { Component } from "react";
import 'whatwg-fetch';
import { Link } from 'react-router';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
	  isLogin: false,
    };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.validateForm = this.validateForm.bind(this);
	this.createUser = this.createUser.bind(this);
  }
  
   createUser() {
		fetch(`/api/signup`,  {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			})
		}).then(response => {
			if (response.ok) {
				this.setState({ isLogin: true });
				this.props.history.push("/login");
			}
			else {
				response.json().then(error => {
					alert(`Failed to fetch issues ${error.message}`);
				})
			}
		}).catch(err => {
		  alert(`Error in fetching data from server: ${err}`);
		});
	}
  
  
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
	this.createUser();
	
  }

  render() {
    return (
      <div className="Submit">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up
          </Button>
		  <br />
		  <br />
		  <Link to="/login">Have an account? Click here!</Link>
        </form>
		
      </div>
    );
  }
}
