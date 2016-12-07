import React, { Component } from 'react';
import EditableRecord from './EditableRecord';
import SortableListItem from './SortableListItem';
import lod from 'lodash';

class EditableRecordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingIndex: null,
            lastInsertId: this.props.records.length ? lod.last(this.props.records)._id : 0,
            addProduct: true
        };
    }
    handleUpdateState(obj) {
        this.setState(obj);
        if (obj.items) {
            this.props.onChangeItemPosition(obj.items);
        }
    }
    render() {
        const records = this.props.records.map((record, i) => (
            <SortableListItem
                key={i}
                updateState={this.handleUpdateState.bind(this)}
                items={this.props.records}
                draggingIndex={this.state.draggingIndex}
                sortId={i}
                outline="list"
            >
                <EditableRecord
                    firebaseKey={record.firebaseKey}
                    id={record.id}
                    title={record.title}
                    text={record.text}
                    onFormSubmit={this.props.onFormSubmit.bind(this)}
                    onTrashClick={this.props.onTrashClick.bind(this)}
                />
            </SortableListItem>
        ));
        return (
            <div className='records'>
                {records}
            </div>
        );
    }
}

export default EditableRecordsList;
