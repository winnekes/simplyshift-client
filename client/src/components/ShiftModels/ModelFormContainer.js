import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { putData, getData, postData } from "../../actions/dispatchHandler";
import {
  shiftEntriesFetched,
  shiftModelEdited,
  shiftModelsFetched,
} from "../../actions/shifts";
import { SHIFT_ENTRIES_PATH, SHIFT_MODELS_PATH } from "../../constants";
import ModelForm from "./ModelForm";

// todo: think about logical component structure
// todo: refresh current view (month)

class ShiftModelContainer extends Component {
  state = { name: "", color: "#32a852", startsAt: 0, duration: 0 };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.model) {
      console.log("edit");
      this.props
        .putData(
          SHIFT_MODELS_PATH,
          this.props.model.id,
          shiftModelEdited,
          this.state
        )
        .then(() =>
          this.props.getData(
            `${SHIFT_ENTRIES_PATH}?month='2019-12-04'`,
            shiftEntriesFetched
          )
        );
    } else {
      console.log("create", this.state);
      const data = {
        ...this.state,
        startsAt: parseInt(this.state.startsAt),
        duration: parseInt(this.state.duration),
      };
      this.props
        .postData(SHIFT_MODELS_PATH, shiftModelEdited, data)
        .then(() => this.props.getData(SHIFT_MODELS_PATH, shiftModelsFetched));
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = () => {
    if (this.props.model) {
      this.setState(this.props.model);
    }
  };
  render() {
    console.log(this.state);
    return (
      <>
        {this.props.user && (
          <ModelForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state}
            onHide={this.props.onHide}
          />
        )}
        {!this.props.user && <Redirect to="/calendar" />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, { putData, getData, postData })(
  ShiftModelContainer
);
