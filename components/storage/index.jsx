import React, {PureComponent} from 'react';

class Storage extends PureComponent {
    constructor(props) {
        super(props);

        const str = localStorage.getItem(props.keyName);
        this.state = {
            value: typeof str === 'string' ? JSON.parse(str) : undefined,
        }

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave (data) {
        localStorage.setItem(this.props.keyName, JSON.stringify(data));
    }

    render () {
        const {value} = this.state;

        return this.props.children(value, this.handleSave);
    }
}

export default Storage;
