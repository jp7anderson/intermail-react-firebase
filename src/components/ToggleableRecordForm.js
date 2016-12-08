import React, { Component } from 'react';
import RecordForm from './RecordForm';

class ToggleableRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleFormOpen() {
        this.setState({
            isOpen: true
        });
    }

    handleFormClose() {
        this.setState({
            isOpen: false
        });
    }

    handleFormSubmit(record) {
        this.props.onFormSubmit(record);
        this.setState({ isOpen: false });
    }

    render() {
        if (this.state.isOpen) {
            return (
                <RecordForm
                    countItens={this.props.countItens}
                    onFormSubmit={this.handleFormSubmit.bind(this)}
                    onFormClose={this.handleFormClose.bind(this)}
                />
            );
        } else {
            return (
                <div onClick={this.handleFormOpen.bind(this)}>
                    <i className='glyphicon glyphicon-plus'></i>
                </div>
            );
        }
    }
}

export default ToggleableRecordForm;
