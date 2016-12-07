import React, { Component } from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import EditableRecordsList from './components/EditableRecordsList';
import ToggleableRecordForm from './components/ToggleableRecordForm';
import firebaseApp from './firebase_connection';

const fireRef = firebaseApp.database().ref('records');

class IntermailDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    componentWillMount() {
        var items = [];
        var that = this;
        fireRef.orderByChild('ordem').on('value', (snap) => {
            snap.forEach((child) => {
                var record = {
                    firebaseKey: child.key,
                    id: child.val().id,
                    ordem: child.val().ordem,
                    title: child.val().title,
                    text: child.val().text
                }
                items.push(record);
                that.setState({records: items});
            });
        });
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

    handleChangeItemPosition(items) {
        this.changeItemPosition(items);
    }

    createRecord(record) {
        delete record.firebaseKey;
        record.id = uuid.v4();
        var records = this.state.records.concat(record);
        fireRef.push(record);

        this.setState({
            records: records
        });
    }

    updateRecord(attrs) {
        this.setState({
            records: this.state.records.map((record) => {
                if (record.id === attrs.id) {
                    fireRef.child(attrs.firebaseKey).update({
                        title: attrs.title,
                        text: attrs.text
                    });
                    return Object.assign({}, record, {
                        title: attrs.title,
                        text: attrs.text
                    });
                } else {
                    return record;
                }
            })
        });
    }

    deleteRecord(recordId) {
        fireRef.child(recordId).remove();
    }

    changeItemPosition(items) {
        this.setState({
            records: this.state.records.map((record, key) => {
                var item = items.find(function (obj) {
                    return obj.id === record.id;
                });
                fireRef.child(item.firebaseKey).update({
                    ordem: key + 1
                });
                return Object.assign({}, record, {
                    ordem: key + 1
                });
            })
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
                        onChangeItemPosition={this.handleChangeItemPosition.bind(this)}
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
