import * as ActionTypes from './ActionTypes';

export const Auth = (state  = { isLoading: true,
                                        errMess: null,
                                        auth:[]}, action) => {
    console.log(action)
    switch (action.type) {
        case ActionTypes.GET_AUTH:
        return {...state, isLoading: false, errMess: null, auth: action.payload};

        case ActionTypes.AUTH_LOADING:
            return {...state, isLoading: true, errMess: null, auth: []}

        case ActionTypes.AUTH_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};