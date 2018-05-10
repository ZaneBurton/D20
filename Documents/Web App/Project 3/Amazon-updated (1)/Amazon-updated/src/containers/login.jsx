import React, { Component } from "react";
import { Link } from 'react-router';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
	  i: 0,
    };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.validateForm = this.validateForm.bind(this);
	this.validateUser = this.validateUser.bind(this);
  }
  
    validateUser() {
		fetch(`/api/login`,  {
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
				
				sessionStorage.setItem("email", JSON.stringify(this.state.email))
				this.setState({i: 1});
					
			}
		}).catch(err => {
		  alert(`Email or password does not match.`);
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
	this.validateUser();
	if(this.state.i === 1){
		this.props.history.push("/issues");	
	}
	//this.props.history.push("http://localhost:3000/issues");
  }

  render() {
    return (
      <div className="Login">
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
            Login
          </Button>
		  <br />
		  <br />
		  <Link to="/signup">Click here to make an account!</Link>
		  <br />
		  <Link to="/issues">Temporary book list link</Link>
        </form>
      </div>
    );
  }
}
