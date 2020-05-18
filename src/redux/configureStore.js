import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './Auth';
import {List} from './List';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Groups} from './Groups';

export const ConfigureStore = () => {
    console.log(Auth)
    const store = createStore(
        combineReducers({
            list: List,
            groups:Groups,
            ...createForms({
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}