import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateList from './TemplateList';
import { selectShift } from '../actions/shifts';

class TemplateListContainer extends Component {
    render() {
        return (
            <TemplateList
                templates={this.props.templates}
                selectShift={this.props.selectShift}
                selectedShift={this.props.selectedShift}
            ></TemplateList>
        );
    }
}

const mapStatetoProps = state => {
    return {
        templates: state.shifts,
        selectedShift: state.selectedTemplate,
    };
};

export default connect(mapStatetoProps, { selectShift })(TemplateListContainer);
