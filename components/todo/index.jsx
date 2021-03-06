import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Task = ({title, complete}) =>
    complete
        ? <s>{title}</s>
        : <span>{title}</span>

class EditableTask extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: props.task.title,
            edit: false,
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleEdit () {
        const {title} = this.props.task;
        this.setState({edit: true, title});
    }

    handleChange ({target: {value}}) {
        this.setState({title: value});
    }

    handleKeyPress ({key}) {
        if (key === 'Enter') {
            this.handleSave();
        }
    }

    handleSave () {
        const {title} = this.state;
        this.props.onEdit({title}, () => this.clear());
    }

    clear () {
        this.setState({edit: false});
    }

    render () {
        const {title, edit} = this.state;

        return edit
            ? <input type='text' value={title}
                onChange={this.handleChange}
                onBlur={this.handleSave}
                onKeyPress={this.handleKeyPress} />
            : <span onClick={this.handleEdit}><Task {...this.props.task} /></span>;
    }
}

EditableTask.propTypes = {
    onEdit: PropTypes.func.isRequired,
};

const TodoList = ({tasks, onRemove, onComplete, onEdit}) => 
    <div>
        {tasks.map((task, i) =>
            <ul key={i}>
                <li>
                    <EditableTask task={task} onEdit={(...args) => onEdit(i, ...args)} />
                </li>
                <button onClick={() => onComplete(i)} disabled={task.complete}>✓</button>
                <button onClick={() => onRemove(i)}>✗</button>
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
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange ({target: {value}}) {
        this.setState({title: value});
    }

    handleKeyPress ({key}) {
        if (key === 'Enter') {
            this.handleCreate();
        }
    }

    handleCreate () {
        const {title} = this.state;
        if (!title) {
            return;
        }
        this.props.onCreate({title}, () => this.clear());
    }

    clear () {
        this.setState({title: ''});
    }

    render () {
        const {title} = this.state;

        return (
            <div>
                <input type='text' value={title}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress} />
                <button onClick={this.handleCreate} disabled={!title}>Create!</button>
            </div>
        );
    }
}

NewTask.propTypes = {
    onCreate: PropTypes.func.isRequired,
};

const Sorter = ({onSort}) =>
    <div>
        sort by title
        {' '}
        <button key='asc' onClick={() => onSort('asc')}>↓</button>
        <button key='desc' onClick={() => onSort('desc')}>↑</button>
    </div>;

class TodoContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tasks: props.tasks,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleAdd (task, callback) {
        this.change(prev => {
            const tasks = prev.tasks.concat(task);
            return {tasks};
        }, callback);
    }

    handleEdit (index, data, callback) {
        const tasks = this.state.tasks.slice();
        tasks[index] = Object.assign({}, tasks[index], data);
        this.change({tasks}, callback);
    }

    handleRemove (index) {
        const origTasks = this.state.tasks;
        const tasks = origTasks.slice(0, index).concat(origTasks.slice(index + 1));
        this.change({tasks});
    }

    handleComplete (index) {
        const tasks = this.state.tasks.slice();
        tasks[index] = Object.assign({}, tasks[index], {complete: true});
        this.change({tasks});
    }

    handleSort (direction) {
        const tasks = this.state.tasks.slice();
        const sortNum = direction === 'asc' ? 1 : -1;
        tasks.sort((t1, t2) => t1.title > t2.title ? sortNum : -sortNum);
        this.change({tasks});
    }

    change (newState, callback) {
        const {onChange} = this.props;
        this.setState(newState, () => onChange && onChange(this.state.tasks) || callback && callback())
    }

    render () {
        const {tasks} = this.state;

        return (
            <div>
                <p>You can click task's title to edit.</p>
                <Sorter onSort={this.handleSort} />
                <TodoList
                    tasks={tasks}
                    onRemove={this.handleRemove}
                    onComplete={this.handleComplete}
                    onEdit={this.handleEdit} />
                <NewTask onCreate={this.handleAdd} />
            </div>
        );
    }
}

TodoContainer.defaultProps = {
    tasks: [],
};

TodoContainer.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
};

export default TodoContainer;
