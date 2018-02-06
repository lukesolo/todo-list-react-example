import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const TodoList = ({tasks}) => 
    <div>
        {tasks.map((task, i) =>
            <ul key={i}>
                <li>{task.title}</li>
            </ul>
        )}
    </div>

class NewTask extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange ({target: {value}}) {
        this.setState({title: value});
    }

    handleCreate () {
        const {title} = this.state;
        this.props.onCreate({title}, () => this.clear());
    }

    clear () {
        this.setState({title: ''});
    }

    render () {
        const {title} = this.state;

        return (
            <div>
                <input type='text' onChange={this.handleChange} value={title} />
                <button onClick={this.handleCreate}>Добавить</button>
            </div>
        );
    }
}

NewTask.propTypes = {
    onCreate: PropTypes.func.isRequired,
};

class TodoContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd (task, callback) {
        this.setState(prev => {
            const tasks = prev.tasks.slice();
            tasks.push(task);
            return {tasks};
        }, callback);
    }

    render () {
        const {tasks} = this.state;

        return (
            <div>
                <TodoList tasks={tasks} />
                <NewTask onCreate={this.handleAdd} />
            </div>
        );
    }
}

export default TodoContainer;
