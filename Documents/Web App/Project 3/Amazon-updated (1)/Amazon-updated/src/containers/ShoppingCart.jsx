import React, { Component } from "react";
import 'whatwg-fetch';
import { Link } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props);
		this.state={
		email: "",
	}
  }
 /* 
    getUser() {
		fetch(`/api/login`,  {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			})
		}).catch(err => {
		  alert(`Email or password does not match.`);
		});
  }
  
  
  componentWillMount() {
		if(this.state.email === JSON.parse(sessionStorage.getItem("email"))){
			alert("Welcome");
		}
		else {
			alert("You are not signed in.");
			this.props.history.push("/login");
		}
    }
  
  */
  render() {
	return(<p> Help </p>);
		
  };
}