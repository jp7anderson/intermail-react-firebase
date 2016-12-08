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
            countItens: 0,
            records: []
        }
    }

    componentWillMount() {
        fireRef.orderByChild('ordem').on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                var record = {
                    firebaseKey: child.key,
                    id: child.val().id,
                    ordem: child.val().ordem,
                    title: child.val().title,
                    text: child.val().text
                }
                items.push(record);
                this.setState({records: items});
            });

            this.setState({countItens: items.length});
        }).bind(this);
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
        record.id = uuid.v4();
        delete record.firebaseKey;
        fireRef.push(record);
    }

    updateRecord(attrs) {
        fireRef.child(attrs.firebaseKey).update({
            title: attrs.title,
            text: attrs.text
        });
    }

    deleteRecord(recordId) {
        this.setState({
            records: this.state.records.map((record, key) => {
                if (record.firebaseKey !== recordId) {
                    fireRef.child(record.firebaseKey).update({
                        ordem: key === 0 ? key +1 : key
                    });
                    return Object.assign({}, record, {
                        ordem: key
                    });
                }
            })
        });
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
                        countItens={this.state.countItens}
                        onFormSubmit={this.handleCreateFormSubmit.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default IntermailDashboard;
