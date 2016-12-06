import React, { Component } from 'react';
import uuid from 'uuid';
import EditableRecordsList from './components/EditableRecordsList';
import ToggleableRecordForm from './components/ToggleableRecordForm';

class IntermailDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [
                {
                    "id": 1,
                    "title": "Mow the lawn",
                    "text": "House Chores",
                },
                {
                    "id": 2,
                    "title": "Clear paper jam",
                    "text": "Office Chores"
                },
                {
                    "id": 3,
                    "title": "Ponder origins of universe 2",
                    "text": "Life Chores"
                }
            ],
        };
    }

    handleCreateFormSubmit(record) {
        this.createRecord(record);
    }

    handleEditFormSubmit(attrs) {
        this.updateRecord(attrs);
    }

    handleTrashClick(recordId) {
        this.deleteRecord(recordId);
    }

    createRecord(record) {
        record.id = uuid.v4();
        this.setState({
           records: this.state.records.concat(record)
        });
    }

    updateRecord(attrs) {
        this.setState({
            records: this.state.records.map((record) => {
                if (record.id === attrs.id) {
                    return Object.assign({}, record, {
                        title: attrs.title,
                        project: attrs.project
                    });
                } else {
                    return record;
                }
            })
        });
    }

    deleteRecord(recordId) {
        this.setState({
            records: this.state.records.filter(t => t.id !== recordId),
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='col-md-12'>
                    <EditableRecordsList
                        records={this.state.records}
                        onFormSubmit={this.handleEditFormSubmit.bind(this)}
                        onTrashClick={this.handleTrashClick.bind(this)}
                    />
                    <ToggleableRecordForm
                        onFormSubmit={this.handleCreateFormSubmit.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default IntermailDashboard;
