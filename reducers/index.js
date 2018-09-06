import { combineReducers } from 'redux'; // 3.7.2

import routeReducers from './routeReducers';
import reducers from './reducers';

export default combineReducers({
    routeReducers: routeReducers,
    reducers: reducers,
});

