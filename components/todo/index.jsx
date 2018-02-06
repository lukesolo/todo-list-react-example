import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Task = ({title, complete}) =>
    complete
        ? <s>{title}</s>
        : <span>{title}</span>

const TodoList = ({tasks, onRemove, onComplete}) => 
    <div>
        {tasks.map((task, i) =>
            <ul key={i}>
                <li>
                    <Task {...task} />
                </li>
                <button onClick={() => onRemove(i)}>−</button>
                <button onClick={() => onComplete(i)} disabled={task.complete}>✓</button>
            </ul>
        )}
    </div>

TodoList.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
};
    
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
        this.handleRemove = this.handleRemove.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleAdd (task, callback) {
        this.setState(prev => {
            const tasks = prev.tasks.slice();
            tasks.push(task);
            return {tasks};
        }, callback);
    }

    handleRemove (index) {
        const tasks = this.state.tasks.slice();
        tasks.splice(index, 1);
        this.setState({tasks});
    }

    handleComplete (index) {
        const tasks = this.state.tasks.slice();
        tasks[index] = Object.assign({}, tasks[index], {complete: true});
        this.setState({tasks});
    }

    render () {
        const {tasks} = this.state;

        return (
            <div>
                <TodoList tasks={tasks} onRemove={this.handleRemove} onComplete={this.handleComplete} />
                <NewTask onCreate={this.handleAdd} />
            </div>
        );
    }
}

export default TodoContainer;
