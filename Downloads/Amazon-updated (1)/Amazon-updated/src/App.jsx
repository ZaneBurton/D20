import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';

import Login from "./containers/Login.jsx";
import Signup from "./containers/Signup.jsx";

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = (props) => (
  <div>
    <div className="header">
      <h1>Book List</h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={browserHistory} >
    <Redirect from="/" to="/signup" />
    <Route path="/" component={App} >
	<Route path="/signup" exact component={withRouter(Signup)} />
	<Route path="/login" exact component={withRouter(Login)} />
      <Route path="issues" component={withRouter(IssueList)} />
      <Route path="issues/:ISBN" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
