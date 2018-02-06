import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './components/todo';

const App = () =>
    <div>
        <h1>TODO list</h1>
        <Todo />
    </div>;

ReactDOM.render(<App />, document.getElementById("app"));
