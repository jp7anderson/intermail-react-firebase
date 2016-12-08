import React, { Component } from 'react';

class RecordForm extends Component {
    handleSubmit() {
        var countItens = parseInt(this.refs.ordem.value, 10) +1;
        this.props.onFormSubmit({
            firebaseKey: this.props.firebaseKey,
            id: this.props.id,
            ordem: countItens,
            title: this.refs.title.value,
            text: this.refs.text.value,
        });
    }

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='thumbnail well'>
                <input type="hidden" ref='ordem' defaultValue={this.props.countItens} />
                <div className="form-group">
                    <input type="text"
                        ref='title'
                        className="form-control"
                        placeholder="Titulo"
                        defaultValue={this.props.title}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                        ref='text'
                        className="form-control"
                        placeholder="Texto"
                        defaultValue={this.props.text}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>{submitText}</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-danger" onClick={this.props.onFormClose}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default RecordForm;
