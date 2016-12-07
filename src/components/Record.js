import React, { Component } from 'react';

class Record extends Component {
    handleTrashClick() {
        this.props.onTrashClick(this.props.firebaseKey);
    }
    render() {
        return (
            <div className='thumbnail well text-center'>
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>
                <div className='right-itens'>
                    <span onClick={this.props.onEditClick.bind(this)} >
                        <i className='glyphicon glyphicon-pencil'></i>
                    </span>
                    <span onClick={this.handleTrashClick.bind(this)} >
                        <i className='glyphicon glyphicon-trash'></i>
                    </span>
                </div>
            </div>
        );
    }
}

export default Record;
