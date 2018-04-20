import React from 'react';
import { Link } from 'react-router';

import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: '', title: '', status: '', owner: '', effort: null,
        completionDate: null, created: null,
      },
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.loadData();
    }
  }

  onChange(event, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
    issue[event.target.name] = value;
    this.setState({ issue });
  }

  onValidityChange(event, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields });
  }

  onSubmit(event) {
    event.preventDefault();

    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }

    fetch(`/api/issues/${this.props.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          this.setState({ issue: updatedIssue });
          alert('Updated issue successfully.');
        });
      } else {
        response.json().then(error => {
          alert(`Failed to update issue: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  loadData() {
    fetch(`/api/issues/${this.props.params.ISBN}`).then(response => {
      if (response.ok) {
        response.json().then(issue => {
          issue.created = new Date(issue.created);
          issue.completionDate = issue.completionDate != null ?
            new Date(issue.completionDate) : null;
          this.setState({ issue });
        });
      } else {
        response.json().then(error => {
			alert("HELPPPPPPP");
          alert(`Failed to fetch issue: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {
    const issue = this.state.issue;
    const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null
      : (<div className="error">Please correct invalid fields before submitting.</div>);
    return (
      <div>
		<p> ISBN: {issue.ISBN} </p>
		<p> Title: {issue.title} </p>
		<p> Author: {issue.author} </p>
		<p> Genre: {issue.genre} </p>
		<p> Description: {issue.description} </p>
		<Link to="/issues">Back to book list</Link>
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
};
