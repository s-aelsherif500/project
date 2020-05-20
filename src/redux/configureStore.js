import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Auth } from './Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {List} from './List';
import {Groups} from './Groups';
import {Quizes} from './Quizes';
import {Users} from './Users';
import {Profile} from './Profile';

export const ConfigureStore = () => {
    console.log(Auth)
    const store = createStore(
        combineReducers({
            profile:Profile,
            list: List,
            groups:Groups,
            quizes:Quizes,
            users:Users,
            ...createForms({
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}