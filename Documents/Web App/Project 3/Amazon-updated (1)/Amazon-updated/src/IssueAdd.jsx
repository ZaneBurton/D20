import React from 'react';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue({
      status: 'New',
      created: new Date(),
    });
    // clear the form for the next input
    form.owner.value = ''; form.title.value = '';
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: React.PropTypes.func.isRequired,
};
