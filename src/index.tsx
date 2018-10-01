import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TaskListPage } from './page/TaskListPage';
import { Store } from './state/Store';

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={ Store }>
            <BrowserRouter>
                <Route path="/" component={ TaskListPage }/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')!
    );
});
