import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/todo';
import Storage from './components/storage';

const App = () =>
    <div>
        <h1>TODO list</h1>
        <Storage keyName='todo-list-test'>
            {(value, save) => {
                return <Todo tasks={value} onChange={save} />;
            }}
        </Storage>
    </div>;

ReactDOM.render(<App />, document.getElementById("app"));
