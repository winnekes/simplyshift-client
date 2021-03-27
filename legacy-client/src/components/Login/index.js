import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Login from "./Login";

import { LOGIN_PATH } from "../../constants";
import { postData } from "../../actions/dispatchHandler";
import { login, loginResponseTransformer } from "../../actions/user";

class LoginContainer extends Component {
  state = { email: "", password: "" };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.postData(
      LOGIN_PATH,
      login,
      this.state,
      loginResponseTransformer
    );

    this.props.history.push("/");
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        {!this.props.user && (
          <Login
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state}
          />
        )}
        {this.props.user && <Redirect to="/calendar" />}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { postData })(LoginContainer);
