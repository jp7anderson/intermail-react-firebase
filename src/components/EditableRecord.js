import React, { Component } from 'react';
import RecordForm from './RecordForm';
import Record from './Record';

class EditableRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editFormOpen: false,
        };
    }

    handleEditClick() {
        this.openForm();
    }

    handleFormClose() {
        this.closeForm();
    }

    handleSubmit(record) {
        this.props.onFormSubmit(record);
        this.closeForm();
    }

    closeForm() {
        this.setState({ editFormOpen: false })
    }

    openForm() {
        this.setState({ editFormOpen: true })
    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <RecordForm
                    firebaseKey={this.props.firebaseKey}
                    id={this.props.id}
                    title={this.props.title}
                    text={this.props.text}
                    onFormSubmit={this.handleSubmit.bind(this)}
                    onFormClose={this.handleFormClose.bind(this)}
                />
            );
        } else {
            return (
                <Record
                    firebaseKey={this.props.firebaseKey}
                    id={this.props.id}
                    title={this.props.title}
                    text={this.props.text}
                    onEditClick={this.handleEditClick.bind(this)}
                    onTrashClick={this.props.onTrashClick.bind(this)}
                />
            );
        }
    }
}

export default EditableRecord;
