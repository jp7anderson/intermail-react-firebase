import React, { Component } from 'react';
import { sortable } from 'react-sortable';

class ListItem extends Component {
    render() {
        return (
          <div {...this.props} className="list-item">{this.props.children}</div>
        )
    }
}

var SortableListItem = sortable(ListItem);

export default SortableListItem;
